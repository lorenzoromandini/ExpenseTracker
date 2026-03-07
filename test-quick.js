console.log('Testing QR Parser...');

const testQR = 'https://www.agenziaentrate.gov.it/test?piva=12345678901&data=15/03/2024&importo=25.50';

// Test amount parsing
function parseItalianAmount(amountStr) {
  let clean = amountStr.replace(/[€$£]/g, '').trim();
  
  if (clean.includes(',')) {
    const parts = clean.split(',');
    const decimal = parts.pop();
    const integer = parts.join('').replace(/\./g, '');
    clean = integer + '.' + decimal;
  }
  
  const amount = parseFloat(clean);
  return isNaN(amount) ? 0 : amount;
}

console.log('Test 1: "25.50" ->', parseItalianAmount('25.50'), '(expected: 25.5)');
console.log('Test 2: "1.234,56" ->', parseItalianAmount('1.234,56'), '(expected: 1234.56)');
console.log('Test 3: "0,50" ->', parseItalianAmount('0,50'), '(expected: 0.5)');
console.log('Test 4: "1.234.567,89" ->', parseItalianAmount('1.234.567,89'), '(expected: 1234567.89)');

console.log('\n✅ Tests complete');
console.log('\nNext step: Test on real device with Italian receipt');
console.log('1. Start app: npm start');
console.log('2. Open Expo Go on phone');
console.log('3. Tap + button on Home');
console.log('4. Scan Italian Scontrino Elettronico QR code');
