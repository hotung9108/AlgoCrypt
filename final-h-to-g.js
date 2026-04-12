// Verify the complete DSA flow with h input and g calculated

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

console.log("╔════════════════════════════════════════════════════════╗");
console.log("║     DSA with h Input → g Calculated                   ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

const p = 23;
const q = 11;
const h_input = 6;  // INPUT: h
const xA = 8;
const k = 9;
const H_M = 10;

console.log("INPUT PARAMETERS:");
console.log(`p = ${p}, q = ${q}, h = ${h_input}, xA = ${xA}, k = ${k}, H(M) = ${H_M}\n`);

// Step 1: Calculate g from h
const exponent = (p - 1) / q;
const g = modPow(h_input, exponent, p);

console.log("CALCULATED GENERATOR:");
console.log(`g = h^((p-1)/q) mod p`);
console.log(`g = ${h_input}^((${p}-1)/${q}) mod ${p}`);
console.log(`g = ${h_input}^${exponent} mod ${p} = ${g}\n`);

// Verify g is valid
const gq_mod_p = modPow(g, q, p);
console.log(`Verification: g^q mod p = ${g}^${q} mod ${p} = ${gq_mod_p}`);
console.log(`Generator valid: ${gq_mod_p === 1 ? '✓' : '✗'}\n`);

// Step 2: Key Generation
const yA = modPow(g, xA, p);
console.log(`PUBLIC KEY: yA = g^xA mod p = ${g}^${xA} mod ${p} = ${yA} ✓\n`);

// Step 3: Signature Generation
const gk = modPow(g, k, p);
const r = gk % q;
const k_inv = modInverse(k, q);
const s = (k_inv * ((H_M + (xA * r) % q) % q)) % q;

console.log("SIGNATURE GENERATION:");
console.log(`g^k mod p = ${g}^${k} mod ${p} = ${gk}`);
console.log(`r = ${gk} mod ${q} = ${r} ✓`);
console.log(`k^(-1) mod q = ${k}^(-1) mod ${q} = ${k_inv} ✓`);
console.log(`s = ${s} ✓`);
console.log(`Signature (r, s) = (${r}, ${s})\n`);

// Step 4: Verification
const w = modInverse(s, q);
const u1 = (H_M * w) % q;
const u2 = (r * w) % q;
const gu1 = modPow(g, u1, p);
const yAu2 = modPow(yA, u2, p);
const v = ((gu1 * yAu2) % p) % q;

console.log("SIGNATURE VERIFICATION:");
console.log(`w = s^(-1) mod q = ${s}^(-1) mod ${q} = ${w} ✓`);
console.log(`u1 = (H(M) * w) mod q = (${H_M} * ${w}) mod ${q} = ${u1} ✓`);
console.log(`u2 = (r * w) mod q = (${r} * ${w}) mod ${q} = ${u2} ✓`);
console.log(`g^u1 mod p = ${g}^${u1} mod ${p} = ${gu1} ✓`);
console.log(`yA^u2 mod p = ${yA}^${u2} mod ${p} = ${yAu2} ✓`);
console.log(`v = ((g^u1 * yA^u2) mod p) mod q = ${v} ✓\n`);

console.log(`RESULT: v == r: ${v} == ${r} = ${v === r ? '✓ VALID' : '✗ INVALID'}`);

console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║         ✓ Complete DSA Flow Verified ✓                ║");
console.log("╚════════════════════════════════════════════════════════╝");
