// Test file to verify DES implementation
import { desEncryptHex } from './src/algorithms/desEncrypt';

const key = 'B35F59255E3BCB54';
const plaintext = '32D604E6C4504149';
const expectedCiphertext = '056546D954490960';

console.log('DES Encryption Test');
console.log('==================');
console.log(`Key:              ${key}`);
console.log(`Plaintext:        ${plaintext}`);
console.log(`Expected Result:  ${expectedCiphertext}`);

try {
  const result = desEncryptHex(plaintext, key);
  console.log(`Actual Result:    ${result}`);
  console.log(`Test Status:      ${result === expectedCiphertext ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.error('Error:', error);
}
