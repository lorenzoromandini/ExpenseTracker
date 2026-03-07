// Manual QR Parser Test
// Run: node test-qr.js

// Inline the parser functions for testing
function isItalianReceiptQR(qrData) {
  if (!qrData || typeof qrData !== 'string') return false;
  
  if (qrData.includes('agenziaentrate.gov.it')) return true;
  if (qrData.includes('scontrino')) return true;
  if (/IT\d{11}/i.test(qrData)) return true;
  
  return false;
}

function parseItalianReceiptQR(qrData) {
  if (!isItalianReceiptQR(qrData)) {
    return null;
  }

  try {
    if (qrData.startsWith('http')) {
      return parseUrlFormat(qrData);
    }
    
    if (qrData.includes('://')) {
      return parseCustomScheme(qrData);
    }
    
    return parseStructuredText(qrData);
    
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
}

function parseUrlFormat(url) {
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    
    const vatNumber = params.get('piva') || params.get('vat') || params.get('cf') || '';
    const dateStr = params.get('data') || params.get('date') || '';
    const amountStr = params.get('importo') || params.get('amount') || params.get('totale') || '';
    const receiptNum = params.get('numero') || params.get('receipt') || '';
    const zNum = params.get('n') || params.get('z') || params.get('num') || '';
    
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

function parseCustomScheme(qrData) {
  if (qrData.startsWith('scontrino://')) {
    const data = qrData.replace('scontrino://', '');
    return parseStructuredText(data);
  }
  
  return null;
}

function parseStructuredText(text) {
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
    merchantName: null,
    date,
    totalAmount: amount,
    receiptNumber: '',
    zNumber: '',
    currency: 'EUR',
    rawUrl: text,
  };
}

function parseItalianDate(dateStr) {
  const match1 = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match1) {
    const day = parseInt(match1[1], 10);
    const month = parseInt(match1[2], 10) - 1;
    const year = parseInt(match1[3], 10);
    return new Date(year, month, day);
  }
  
  const match2 = dateStr.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (match2) {
    const day = parseInt(match2[1], 10);
    const month = parseInt(match2[2], 10) - 1;
    const year = parseInt(match2[3], 10);
    return new Date(year, month, day);
  }
  
  const isoDate = new Date(dateStr);
  if (!isNaN(isoDate.getTime())) {
    return isoDate;
  }
  
  return null;
}

function parseItalianAmount(amountStr) {
  let clean = amountStr.replace(/[€$£]/g, '').trim();
  
  if (clean.includes(',')) {
    const parts = clean.split(',');
    const decimal = parts.pop();
    const integer = parts.join('').replace(/\./g, '');
    clean = integer + '.' + decimal;
  } else if (clean.includes('.')) {
    clean = clean.replace(/\./g, '');
  }
  
  const amount = parseFloat(clean);
  return isNaN(amount) ? 0 : amount;
}

// Run tests
console.log('=== QR Parser Tests ===\n');

const testCases = [
  {
    name: 'Test 1: Italian Revenue Agency URL',
    input: 'https://www.agenziaentrate.gov.it/portale/documents/12345',
    expected: { isItalian: true },
  },
  {
    name: 'Test 2: Complete Scontrino QR with VAT, date, amount',
    input: 'https://www.agenziaentrate.gov.it/test?piva=12345678901&data=15/03/2024&importo=25.50&numero=00123',
    expected: { 
      isItalian: true,
      vat: '12345678901',
      amount: 25.50,
      day: 15,
      month: 3,
      year: 2024,
    },
  },
  {
    name: 'Test 3: Italian amount with comma (1.234,56)',
    input: 'scontrino://data?piva=123&data=15/03/2024&importo=1.234,56',
    expected: {
      isItalian: true,
      amount: 1234.56,
    },
  },
  {
    name: 'Test 4: Small amount (0,50)',
    input: 'scontrino://data?piva=123&data=15/03/2024&importo=0,50',
    expected: {
      isItalian: true,
      amount: 0.50,
    },
  },
  {
    name: 'Test 5: Large amount (1.234.567,89)',
    input: 'scontrino://data?piva=123&data=15/03/2024&importo=1.234.567,89',
    expected: {
      isItalian: true,
      amount: 1234567.89,
    },
  },
  {
    name: 'Test 6: Non-Italian URL (should fail)',
    input: 'https://example.com/receipt',
    expected: {
      isItalian: false,
    },
  },
];

let passed = 0;
let failed = 0;

testCases.forEach(({ name, input, expected }) => {
  console.log(`${name}`);
  
  const isItalian = isItalianReceiptQR(input);
  const isItalianPass = isItalian === expected.isItalian;
  
  console.log(`  isItalianReceiptQR: ${isItalian} ${isItalianPass ? '✓' : '✗'}`);
  
  if (isItalian) {
    const result = parseItalianReceiptQR(input);
    
    if (expected.vat) {
      const vatPass = result?.merchantVatNumber === expected.vat;
      console.log(`  VAT: ${result?.merchantVatNumber} (expected: ${expected.vat}) ${vatPass ? '✓' : '✗'}`);
      if (!vatPass) failed++;
    }
    
    if (expected.amount !== undefined) {
      const amountPass = result?.totalAmount === expected.amount;
      console.log(`  Amount: ${result?.totalAmount} (expected: ${expected.amount}) ${amountPass ? '✓' : '✗'}`);
      if (!amountPass) failed++;
      else passed++;
    }
    
    if (expected.day) {
      const dayPass = result?.date.getDate() === expected.day &&
                      result?.date.getMonth() + 1 === expected.month &&
                      result?.date.getFullYear() === expected.year;
      console.log(`  Date: ${result?.date.toLocaleDateString()} (expected: ${expected.day}/${expected.month}/${expected.year}) ${dayPass ? '✓' : '✗'}`);
      if (!dayPass) failed++;
      else passed++;
    }
  } else {
    if (!expected.isItalian) passed++;
  }
  
  console.log('');
});

console.log('=== Results ===');
console.log(`Passed: ${passed}/${passed + failed}`);
console.log(`Failed: ${failed}/${passed + failed}`);
