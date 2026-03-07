export interface ExtractedField {
  value: any;
  confidence: number;
}

export interface ExtractedFields {
  merchant: ExtractedField;
  date: ExtractedField;
  amount: ExtractedField;
  vatAmount?: ExtractedField;
}

/**
 * Extract merchant, date, amount from OCR result
 */
export function extractFieldsFromOCR(ocrResult: any): ExtractedFields {
  const text = ocrResult.text;
  const blocks = ocrResult.blocks || [];
  
  // Extract merchant (usually largest text at top)
  const merchant = extractMerchant(blocks);
  
  // Extract date (Italian format: DD/MM/YYYY)
  const date = extractDate(text);
  
  // Extract amount (look for TOTALE, IMPORTO)
  const amount = extractAmount(text);
  
  // Extract VAT if present (look for IVA)
  const vatAmount = extractVAT(text);
  
  return {
    merchant,
    date,
    amount,
    ...(vatAmount && { vatAmount }),
  };
}

/**
 * Extract merchant name - usually largest text at top of receipt
 */
function extractMerchant(blocks: any[]): ExtractedField {
  if (blocks.length === 0) {
    return { value: '', confidence: 0 };
  }
  
  // Sort blocks by y-position (top first), then by font size
  const topBlocks = blocks
    .filter((block: any) => {
      const text = block.text || '';
      // Filter out numbers, dates, common Italian words
      return !/^\d+$/.test(text) && 
             !/^[€£$]/.test(text) &&
             !/(TOTALE|IMPORTO|IVA|DATA|P\.?I\.?VA|COD\.?)/i.test(text) &&
             text.length > 3;
    })
    .sort((a: any, b: any) => {
      // Prefer top blocks
      const yDiff = (a.bounds?.top || 0) - (b.bounds?.top || 0);
      if (Math.abs(yDiff) > 50) return yDiff;
      // Then prefer longer text
      return (b.text?.length || 0) - (a.text?.length || 0);
    });
  
  // Take the top 1-2 blocks as merchant name
  const merchantParts = topBlocks.slice(0, 2).map((b: any) => b.text || '').filter(Boolean);
  const merchant = merchantParts.join(' ').trim();
  
  // Confidence based on position and length
  let confidence = 0.5;
  if (topBlocks[0]?.bounds?.top && topBlocks[0].bounds.top < 200) confidence += 0.3; // Top of receipt
  if (merchant.length > 5) confidence += 0.2;
  
  return {
    value: merchant,
    confidence: Math.min(confidence, 1.0),
  };
}

/**
 * Extract date from text
 */
function extractDate(text: string): ExtractedField {
  // Italian date formats: DD/MM/YYYY, DD/MM/YY, DD-MM-YYYY
  const datePatterns = [
    /(\d{2})[\/\-](\d{2})[\/\-](\d{4})/,  // DD/MM/YYYY
    /(\d{2})[\/\-](\d{2})[\/\-](\d{2})/,    // DD/MM/YY
    /(\d{4})[\/\-](\d{2})[\/\-](\d{2})/,    // YYYY/MM/DD (rare)
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      let day = parseInt(match[1], 10);
      let month = parseInt(match[2], 10);
      let year = parseInt(match[3], 10);
      
      // Handle YY format
      if (match[3].length === 2) {
        year = year < 50 ? 2000 + year : 1900 + year;
      }
      
      // Validate date
      const date = new Date(year, month - 1, day);
      if (!isNaN(date.getTime())) {
        // Confidence based on format
        const hasLabel = /data/i.test(text);
        const confidence = hasLabel ? 0.95 : 0.8;
        
        return {
          value: date,
          confidence,
        };
      }
    }
  }
  
  return { value: null, confidence: 0 };
}

/**
 * Extract amount from text
 */
function extractAmount(text: string): ExtractedField {
  // Look for total amount patterns
  const amountPatterns = [
    /(?:TOTALE|IMPORTO|TOT)[\s:]*€?\s*([\d.,]+)/i,
    /€\s*([\d.,]+)/,
    /([\d]{1,3}(?:[\.,]\d{3})*(?:[,\.]\d{2}))/,
  ];
  
  for (const pattern of amountPatterns) {
    const match = text.match(pattern);
    if (match) {
      const amountStr = match[1];
      const amount = parseFloat(parseItalianAmount(amountStr));
      
      if (!isNaN(amount) && amount > 0) {
        const hasLabel = /(?:totale|importo|tot)/i.test(text);
        const confidence = hasLabel ? 0.95 : 0.8;
        
        return {
          value: amount,
          confidence,
        };
      }
    }
  }
  
  return { value: 0, confidence: 0 };
}

/**
 * Extract VAT amount if present
 */
function extractVAT(text: string): ExtractedField | null {
  const vatPatterns = [
    /(?:IVA|VAT)[\s:]*€?\s*([\d.,]+)/i,
    /IVA\s*([\d]{1,3}(?:[\.,]\d{3})*(?:[,\.]\d{2}))/i,
  ];
  
  for (const pattern of vatPatterns) {
    const match = text.match(pattern);
    if (match) {
      const vatStr = match[1];
      const vat = parseFloat(parseItalianAmount(vatStr));
      
      if (!isNaN(vat) && vat > 0) {
        return {
          value: vat,
          confidence: 0.85,
        };
      }
    }
  }
  
  return null;
}

/**
 * Parse Italian amount format (1.234,56)
 */
function parseItalianAmount(amountStr: string): string {
  let clean = amountStr.replace(/[€$£]/g, '').trim();
  
  // Italian format: dots are thousand separators, comma is decimal
  if (clean.includes(',')) {
    const parts = clean.split(',');
    const decimal = parts.pop();
    const integer = parts.join('').replace(/\./g, '');
    clean = integer + '.' + decimal;
  }
  
  return clean;
}
