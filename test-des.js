// Quick test for DES algorithm
// This is a simple CommonJS test to verify the DES implementation

// Test parameters
const testKey = 'B35F59255E3BCB54';
const testPlaintext = '32D604E6C4504149';
const expectedCiphertext = '056546D954490960';

console.log('DES Algorithm Test');
console.log('==================');
console.log(`Key:              ${testKey}`);
console.log(`Plaintext:        ${testPlaintext}`);
console.log(`Expected Result:  ${expectedCiphertext}`);
console.log('');
console.log('Loading TypeScript module...');

// We'll need to run this with ts-node or compile first
// For now, just create the test file structure
console.log('Test file created. Run with: npx ts-node test-des.ts');
