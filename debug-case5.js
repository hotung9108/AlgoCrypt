// Debug test case 5

const modPow = (base, exp, modulus) => {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % modulus;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % modulus;
  }
  return result;
};

console.log("=== Debug Test Case 5 ===\n");

const p = 809;
const q = 101;
const h = 20;

console.log(`p = ${p}, q = ${q}, h = ${h}`);
console.log(`(p-1) = ${p-1}`);
console.log(`(p-1) / q = ${(p-1) / q}`);
console.log(`(p-1) mod q = ${(p-1) % q}`);

const hq = modPow(h, q, p);
console.log(`h^q mod p = ${h}^${q} mod ${p} = ${hq}`);

if (hq !== 1) {
  console.log(`⚠️  h^q mod p should be 1, but got ${hq}`);
  console.log(`This will cause verification to fail!`);
}
