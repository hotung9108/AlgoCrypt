// Final verification of all test cases

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
console.log("║     DSA Algorithm - Complete Verification Test        ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

const testCases = [
  { 
    num: 1,
    p: 23, q: 11, h: 6, xA: 8, k: 9, H_M: 10,
    description: "Small prime test case"
  },
  { 
    num: 2,
    p: 47, q: 23, h: 7, xA: 13, k: 5, H_M: 11,
    description: "Medium prime test case"
  },
  { 
    num: 3,
    p: 139, q: 23, h: 12, xA: 14, k: 8, H_M: 18,
    description: "Larger prime test case"
  },
  { 
    num: 4,
    p: 607, q: 101, h: 11, xA: 19, k: 8, H_M: 14,
    description: "Big prime test case"
  }
];

let allPassed = true;

testCases.forEach((tc) => {
  console.log(`\n${"─".repeat(56)}`);
  console.log(`Test Case ${tc.num}: ${tc.description}`);
  console.log(`${"─".repeat(56)}`);
  
  const { p, q, h, xA, k, H_M } = tc;
  
  // Validate parameters
  console.log(`Parameters: p=${p}, q=${q}, h=${h}, xA=${xA}, k=${k}, H(M)=${H_M}`);
  
  const check1 = (p - 1) % q === 0;
  const check2 = modPow(h, q, p) === 1;
  
  console.log(`  ✓ (p-1) mod q = ${(p-1) % q} ${check1 ? '✓' : '✗'}`);
  console.log(`  ✓ h^q mod p = ${modPow(h, q, p)} ${check2 ? '✓' : '✗'}`);
  
  if (!check1 || !check2) {
    console.log(`  ✗ INVALID PARAMETERS`);
    allPassed = false;
    return;
  }
  
  // Key generation
  const yA = modPow(h, xA, p);
  console.log(`\nPublic Key: yA = ${yA}`);
  
  // Signature generation
  const hk = modPow(h, k, p);
  const r = hk % q;
  const k_inv = modInverse(k, q);
  const s = (k_inv * ((H_M + (xA * r) % q) % q)) % q;
  
  console.log(`Signature: r = ${r}, s = ${s}`);
  
  // Verification
  const w = modInverse(s, q);
  const u1 = (H_M * w) % q;
  const u2 = (r * w) % q;
  const hu1 = modPow(h, u1, p);
  const yAu2 = modPow(yA, u2, p);
  const v = ((hu1 * yAu2) % p) % q;
  
  const isValid = v === r;
  console.log(`Verification: v = ${v}, expected r = ${r}`);
  console.log(`Result: ${isValid ? '✓ SIGNATURE VALID' : '✗ SIGNATURE INVALID'}`);
  
  if (!isValid) allPassed = false;
});

console.log(`\n${"─".repeat(56)}`);
console.log(`\n╔════════════════════════════════════════════════════════╗`);
if (allPassed) {
  console.log(`║         ✓ All test cases PASSED!                     ║`);
  console.log(`║     DSA Algorithm is working CORRECTLY ✓              ║`);
} else {
  console.log(`║         ✗ Some test cases FAILED!                    ║`);
}
console.log(`╚════════════════════════════════════════════════════════╝`);
