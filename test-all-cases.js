// Test with h = 13 (from the table's g column)

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

console.log("=== Testing all 5 cases from table ===\n");

const testCases = [
  { p: 23, q: 11, h: 6, xA: 8, k: 9, H_M: 10 },
  { p: 47, q: 23, h: 7, xA: 13, k: 5, H_M: 11 },
  { p: 139, q: 23, h: 12, xA: 14, k: 8, H_M: 18 },
  { p: 607, q: 101, h: 11, xA: 19, k: 8, H_M: 14 },
  { p: 809, q: 101, h: 20, xA: 16, k: 24, H_M: 31 }
];

testCases.forEach((tc, idx) => {
  console.log(`\n=== Test Case ${idx + 1} ===`);
  console.log(`p = ${tc.p}, q = ${tc.q}, h = ${tc.h}, xA = ${tc.xA}, k = ${tc.k}, H(M) = ${tc.H_M}`);
  
  // Public Key
  const yA = modPow(tc.h, tc.xA, tc.p);
  
  // Signature
  const hk = modPow(tc.h, tc.k, tc.p);
  const r = hk % tc.q;
  const k_inv = modInverse(tc.k, tc.q);
  const s = (k_inv * ((tc.H_M + (tc.xA * r) % tc.q) % tc.q)) % tc.q;
  
  // Verification
  const w = modInverse(s, tc.q);
  const u1 = (tc.H_M * w) % tc.q;
  const u2 = (r * w) % tc.q;
  const hu1 = modPow(tc.h, u1, tc.p);
  const yAu2 = modPow(yA, u2, tc.p);
  const v = ((hu1 * yAu2) % tc.p) % tc.q;
  
  console.log(`yA = ${yA}, r = ${r}, s = ${s}`);
  console.log(`Verification: v = ${v}, r = ${r}, v==r: ${v === r ? '✓' : '✗'}`);
});
