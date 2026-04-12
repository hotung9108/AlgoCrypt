// Verify the relationship between h and g

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

const p = 23;
const q = 11;
const h = 6;

console.log("=== Relationship between h and g ===\n");

console.log(`p = ${p}, q = ${q}, h = ${h}\n`);

const exponent = (p - 1) / q;
console.log(`Exponent: (p-1)/q = (${p}-1)/${q} = ${exponent}\n`);

const g = modPow(h, exponent, p);
console.log(`g = h^((p-1)/q) mod p`);
console.log(`g = ${h}^${exponent} mod ${p} = ${g}\n`);

console.log(`So: h = 6 (input) → g = 13 (calculated) ✓`);

// Verify g is a valid generator
const gq_mod_p = modPow(g, q, p);
console.log(`\nVerify g is generator: g^q mod p = ${g}^${q} mod ${p} = ${gq_mod_p}`);
console.log(`Generator valid: ${gq_mod_p === 1 ? '✓' : '✗'}`);
