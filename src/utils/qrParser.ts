/**
 * QR Parser for Italian Scontrino Elettronico (Digital Receipt)
 * 
 * Italy mandates electronic receipts with QR codes containing:
 * - Merchant VAT number (Partita IVA)
 * - Transaction date
 * - Total amount
 * - Receipt number
 * - Z-number (daily counter)
 * 
 * QR codes can be URLs or custom schemes
 */

export interface QRReceiptData {
  merchantVatNumber: string;
  merchantName: string | null;
  date: Date;
  totalAmount: number;
  receiptNumber: string;
  zNumber: string;
  currency: string;
  rawUrl: string;
}

/**
 * Check if QR data matches Italian Scontrino Elettronico format
 */
export function isItalianReceiptQR(qrData: string): boolean {
  if (!qrData || typeof qrData !== 'string') return false;
  
  // Check for Italian revenue agency domain
  if (qrData.includes('agenziaentrate.gov.it')) return true;
  
  // Check for Scontrino Elettronico patterns
  if (qrData.includes('scontrino')) return true;
  
  // Check for Italian VAT number pattern (IT followed by 11 digits)
  if (/IT\d{11}/i.test(qrData)) return true;
  
  return false;
}

/**
 * Parse Italian Scontrino Elettronico QR code data
 * 
 * Handles multiple formats:
 * - URLs: https://www.agenziaentrate.gov.it/...?...params
 * - Custom schemes: scontrino://data
 * - Plain text with structured data
 */
export function parseItalianReceiptQR(qrData: string): QRReceiptData | null {
  if (!isItalianReceiptQR(qrData)) {
    return null;
  }

  try {
    // Try to parse as URL first
    if (qrData.startsWith('http')) {
      return parseUrlFormat(qrData);
    }
    
    // Try custom scheme
    if (qrData.includes('://')) {
      return parseCustomScheme(qrData);
    }
    
    // Try structured text format
    return parseStructuredText(qrData);
    
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
}

/**
 * Parse URL format QR codes
 */
function parseUrlFormat(url: string): QRReceiptData | null {
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    
    // Extract data from query parameters
    const vatNumber = params.get('piva') || params.get('vat') || params.get('cf') || '';
    const dateStr = params.get('data') || params.get('date') || '';
    const amountStr = params.get('importo') || params.get('amount') || params.get('totale') || '';
    const receiptNum = params.get('numero') || params.get('receipt') || '';
    const zNum = params.get('n') || params.get('z') || params.get('num') || '';
    
    // Validate required fields
    if (!vatNumber || !dateStr || !amountStr) {
      return null;
    }
    
    const date = parseItalianDate(dateStr);
    const amount = parseItalianAmount(amountStr);
    
    if (!date || isNaN(amount)) {
      return null;
    }
    
    return {
      merchantVatNumber: vatNumber,
      merchantName: params.get('ragione') || params.get('merchant') || null,
      date,
      totalAmount: amount,
      receiptNumber: receiptNum,
      zNumber: zNum,
      currency: 'EUR',
      rawUrl: url,
    };
  } catch {
    return null;
  }
}

/**
 * Parse custom scheme format
 */
function parseCustomScheme(qrData: string): QRReceiptData | null {
  // Handle scontrino://data format
  if (qrData.startsWith('scontrino://')) {
    const data = qrData.replace('scontrino://', '');
    return parseStructuredText(data);
  }
  
  return null;
}

/**
 * Parse structured text format
 */
function parseStructuredText(text: string): QRReceiptData | null {
  // Look for patterns in text
  const vatMatch = text.match(/(?:P\.?I\.?VA|VAT|CF)[\s:]*([A-Z0-9]+)/i);
  const dateMatch = text.match(/(\d{2}[\/\-]\d{2}[\/\-](?:\d{4}|\d{2}))/);
  const amountMatch = text.match(/(?:TOTALE|TOTAL|IMPORTO)[\s:]*([\d.,]+)/i);
  
  if (!vatMatch || !dateMatch) {
    return null;
  }
  
  const date = parseItalianDate(dateMatch[1]);
  const amount = amountMatch ? parseItalianAmount(amountMatch[1]) : 0;
  
  if (!date) {
    return null;
  }
  
  return {
    merchantVatNumber: vatMatch[1],
    merchantName: null, // Would need lookup service
    date,
    totalAmount: amount,
    receiptNumber: '',
    zNumber: '',
    currency: 'EUR',
    rawUrl: text,
  };
}

/**
 * Parse Italian date format (DD/MM/YYYY or DD-MM-YYYY)
 */
function parseItalianDate(dateStr: string): Date | null {
  // Handle DD/MM/YYYY
  const match1 = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match1) {
    const day = parseInt(match1[1], 10);
    const month = parseInt(match1[2], 10) - 1; // JS months are 0-indexed
    const year = parseInt(match1[3], 10);
    return new Date(year, month, day);
  }
  
  // Handle DD-MM-YYYY
  const match2 = dateStr.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (match2) {
    const day = parseInt(match2[1], 10);
    const month = parseInt(match2[2], 10) - 1;
    const year = parseInt(match2[3], 10);
    return new Date(year, month, day);
  }
  
  // Handle ISO format
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    return isoDate;
  }
  
  return null;
}

/**
 * Parse Italian amount format (e.g., "1.234,56" or "1234.56")
 * 
 * Italian format: dots are thousand separators, comma is decimal
 * Example: "1.234,56" -> 1234.56
 * 
 * International format: no thousand separators
 * Example: "1234.56" -> 1234.56
 * 
 * Edge case: "25.50" could be Italian 25,50 or international 25.50
 * We assume: if there's a comma, it's Italian. Otherwise, it's international.
 */
function parseItalianAmount(amountStr: string): number {
  // Remove currency symbols and whitespace
  let clean = amountStr.replace(/[€$£]/g, '').trim();
  
  // Italian format: 1.234,56 -> 1234.56
  if (clean.includes(',')) {
    const parts = clean.split(',');
    const decimal = parts.pop(); // Last part is decimals
    const integer = parts.join('').replace(/\./g, ''); // Remove thousand separators (dots)
    clean = integer + '.' + decimal;
  }
  // If no comma, assume it's already in international format (e.g., "25.50" or "1234")
  // Don't touch dots - they might be decimal separators
  
  const amount = parseFloat(clean);
  return isNaN(amount) ? 0 : amount;
}
