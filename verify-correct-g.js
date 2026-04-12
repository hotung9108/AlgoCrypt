// Verify with correct generator g = 13

const modPow = (base, exp, modulus) => {
  if (modulus === 1) return 0;
  let result = 1;
  base = base % modulus;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % modulus;
    exp = Math.floor(exp / 2);
    base = (base * base) % modulus;
  }
  return result;
};

const modInverse = (a, m) => {
  let t = 0, newT = 1, r = m, newR = a;
  while (newR !== 0) {
    const q = Math.floor(r / newR);
    [t, newT] = [newT, t - q * newT];
    [r, newR] = [newR, r - q * newR];
  }
  if (r > 1) return null;
  return t < 0 ? t + m : t;
};

console.log("=== Verify with correct Generator g = 13 ===\n");

const p = 23;
const q = 11;
const g = 13;  // CORRECT GENERATOR
const xA = 8;
const k = 9;
const H_M = 10;

console.log("Parameters: p=23, q=11, g=13, xA=8, k=9, H(M)=10\n");

// Test generator validity
const gq_mod_p = modPow(g, q, p);
console.log(`Verify generator: g^q mod p = ${g}^${q} mod ${p} = ${gq_mod_p}`);
console.log(`Expected: 1, Got: ${gq_mod_p} ${gq_mod_p === 1 ? '✓' : '✗'}\n`);

// Public Key
const yA = modPow(g, xA, p);
console.log(`Public Key: yA = g^xA mod p = ${g}^${xA} mod ${p} = ${yA}`);
console.log(`Expected: 2, Got: ${yA} ${yA === 2 ? '✓' : '✗'}\n`);

// Signature Generation
const gk = modPow(g, k, p);
console.log(`g^k mod p = ${g}^${k} mod ${p} = ${gk}`);
console.log(`Expected: 3, Got: ${gk} ${gk === 3 ? '✓' : '✗'}\n`);

const r = gk % q;
console.log(`r = ${gk} mod ${q} = ${r}`);
console.log(`Expected: 3, Got: ${r} ${r === 3 ? '✓' : '✗'}\n`);

const k_inv = modInverse(k, q);
console.log(`k^(-1) mod q = ${k}^(-1) mod ${q} = ${k_inv}`);
console.log(`Expected: 5, Got: ${k_inv} ${k_inv === 5 ? '✓' : '✗'}\n`);

const xA_r = (xA * r) % q;
const numerator = (H_M + xA_r) % q;
const s = (k_inv * numerator) % q;

console.log(`(xA * r) mod q = (${xA} * ${r}) mod ${q} = ${xA_r}`);
console.log(`(H(M) + xA*r) mod q = (${H_M} + ${xA_r}) mod ${q} = ${numerator}`);
console.log(`s = ${k_inv} * ${numerator} mod ${q} = ${s}`);
console.log(`Expected: 5, Got: ${s} ${s === 5 ? '✓' : '✗'}\n`);

// Signature Verification
console.log("=== Signature Verification ===\n");

const w = modInverse(s, q);
console.log(`w = s^(-1) mod q = ${s}^(-1) mod ${q} = ${w}`);
console.log(`Expected: 9, Got: ${w} ${w === 9 ? '✓' : '✗'}\n`);

const u1 = (H_M * w) % q;
const u2 = (r * w) % q;

console.log(`u1 = (H(M) * w) mod q = (${H_M} * ${w}) mod ${q} = ${u1}`);
console.log(`Expected: 2, Got: ${u1} ${u1 === 2 ? '✓' : '✗'}\n`);

console.log(`u2 = (r * w) mod q = (${r} * ${w}) mod ${q} = ${u2}`);
console.log(`Expected: 5, Got: ${u2} ${u2 === 5 ? '✓' : '✗'}\n`);

const gu1 = modPow(g, u1, p);
const yAu2 = modPow(yA, u2, p);

console.log(`g^u1 mod p = ${g}^${u1} mod ${p} = ${gu1}`);
console.log(`Expected: 8, Got: ${gu1} ${gu1 === 8 ? '✓' : '✗'}\n`);

console.log(`y^u2 mod p = ${yA}^${u2} mod ${p} = ${yAu2}`);
console.log(`Expected: 9, Got: ${yAu2} ${yAu2 === 9 ? '✓' : '✗'}\n`);

const product = (gu1 * yAu2) % p;
console.log(`(g^u1 * y^u2) mod p = (${gu1} * ${yAu2}) mod ${p} = ${product}`);

const v = product % q;
console.log(`v = ${product} mod ${q} = ${v}`);
console.log(`Expected: 3, Got: ${v} ${v === 3 ? '✓' : '✗'}\n`);

console.log(`Verification: v == r: ${v} == ${r} = ${v === r ? '✓ VALID' : '✗ INVALID'}`);
