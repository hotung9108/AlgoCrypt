// Verify DSA with test case from table
// Test case 1: p = 23, q = 11, h = 6, xA = 8, k = 9, H(M) = 10

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

const modInverse = (a, m) => {
  let t = 0;
  let newT = 1;
  let r = m;
  let newR = a;
  while (newR !== 0) {
    const quotient = Math.floor(r / newR);
    [t, newT] = [newT, t - quotient * newT];
    [r, newR] = [newR, r - quotient * newR];
  }
  if (r > 1) return null;
  if (t < 0) t = t + m;
  return t;
};

console.log("=== DSA Test Case Verification ===\n");

// Test case 1: p = 23, q = 11, h = 6, xA = 8, k = 9, H(M) = 10
const p = 23;
const q = 11;
const h = 6;
const xA = 8;
const k = 9;
const H_M = 10;

console.log("Test Case 1:");
console.log(`p = ${p}, q = ${q}, h = ${h}`);
console.log(`xA = ${xA}, k = ${k}, H(M) = ${H_M}`);
console.log(`(p-1)/q = ${(p-1)/q} (should be 2)`);
console.log();

// Step 1: Verify parameters
console.log("Step 1: Parameter Validation");
console.log(`(p-1) mod q = ${(p-1) % q} (should be 0)`);
const hq_mod_p = modPow(h, q, p);
console.log(`h^q mod p = ${h}^${q} mod ${p} = ${hq_mod_p} (should be 1)`);
console.log();

// Step 2: Public Key
console.log("Step 2: Public Key Generation");
const yA = modPow(h, xA, p);
console.log(`yA = h^xA mod p = ${h}^${xA} mod ${p} = ${yA}`);
console.log(`Expected from table: 2`);
console.log();

// Step 3: Signature Generation
console.log("Step 3: Signature Generation");

const hk = modPow(h, k, p);
console.log(`h^k mod p = ${h}^${k} mod ${p} = ${hk}`);
console.log(`Expected from table: 3`);

const r = hk % q;
console.log(`r = ${hk} mod ${q} = ${r}`);
console.log(`Expected from table: 3`);
console.log();

const k_inv = modInverse(k, q);
console.log(`k^(-1) mod q = ${k}^(-1) mod ${q} = ${k_inv}`);
console.log(`Expected from table: 5`);

// s = k^(-1) * (H(M) + xA*r) mod q
const xA_r = (xA * r) % q;
const sum = (H_M + xA_r) % q;
const s = (k_inv * sum) % q;

console.log(`xA * r mod q = ${xA} * ${r} mod ${q} = ${xA_r}`);
console.log(`(H(M) + xA*r) mod q = (${H_M} + ${xA_r}) mod ${q} = ${sum}`);
console.log(`s = ${k_inv} * ${sum} mod ${q} = ${s}`);
console.log(`Expected from table: 5`);
console.log();

// Step 4: Signature Verification
console.log("Step 4: Signature Verification");

const w = modInverse(s, q);
console.log(`w = s^(-1) mod q = ${s}^(-1) mod ${q} = ${w}`);
console.log(`Expected from table: 9`);

const u1 = (H_M * w) % q;
const u2 = (r * w) % q;
console.log(`u1 = (H(M) * w) mod q = (${H_M} * ${w}) mod ${q} = ${u1}`);
console.log(`u2 = (r * w) mod q = (${r} * ${w}) mod ${q} = ${u2}`);
console.log(`Expected u1, u2 from table: 2, 5`);
console.log();

const hu1 = modPow(h, u1, p);
const yAu2 = modPow(yA, u2, p);
console.log(`h^u1 mod p = ${h}^${u1} mod ${p} = ${hu1}`);
console.log(`yA^u2 mod p = ${yA}^${u2} mod ${p} = ${yAu2}`);
console.log(`Expected h^u1, yA^u2 from table: 8, 9`);
console.log();

const product = (hu1 * yAu2) % p;
console.log(`(h^u1 * yA^u2) mod p = (${hu1} * ${yAu2}) mod ${p} = ${product}`);

const v = product % q;
console.log(`v = ${product} mod ${q} = ${v}`);
console.log(`Expected from table: 3`);
console.log();

console.log(`Verification: v == r: ${v} == ${r} = ${v === r ? '✓ VALID' : '✗ INVALID'}`);
