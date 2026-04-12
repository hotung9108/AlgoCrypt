/**
 * DSA (Digital Signature Algorithm)
 * 
 * DSA is a public-key cryptographic digital signature algorithm
 * 
 * Generator Computation:
 * - h: generator candidate (input, can be any value 1 < h < p)
 * - g: actual generator = h^((p-1)/q) mod p
 * - The actual DSA algorithm uses g (not h)
 * 
 * CRITICAL PARAMETER REQUIREMENTS (must ALL be satisfied):
 * 1. p and q must be PRIME numbers
 * 2. q must divide (p-1): (p-1) mod q = 0
 * 3. g must be a valid generator: g^q mod p = 1
 * 4. xA: private key where 1 <= xA < q
 * 5. k: random nonce where 1 <= k < q, gcd(k, q) = 1
 * 6. H(M) >= 0 (message hash)
 * 
 * If parameters don't satisfy these conditions, DSA will FAIL!
 * 
 * Key Generation:
 * - Public Key: yA = g^xA mod p
 * 
 * Signature Generation:
 * - r = (g^k mod p) mod q
 * - s = k^(-1) * (H(M) + xA * r) mod q
 * - Signature: (r, s)
 * 
 * Signature Verification:
 * - w = s^(-1) mod q
 * - u1 = (H(M) * w) mod q
 * - u2 = (r * w) mod q
 * - v = ((g^u1 * yA^u2) mod p) mod q
 * - Valid if and only if v == r
 */

/**
 * Calculate modular exponentiation: (base^exp) mod modulus
 * Uses binary exponentiation for efficiency
 */
export const modPow = (base: number, exp: number, modulus: number): number => {
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

/**
 * Calculate GCD using Euclidean algorithm
 */
export const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

/**
 * Calculate modular multiplicative inverse using Extended Euclidean Algorithm
 * Find result such that: (a * result) ≡ 1 (mod m)
 */
export const modInverse = (a: number, m: number): number => {
  let t = 0;
  let newT = 1;
  let r = m;
  let newR = a;

  while (newR !== 0) {
    const quotient = Math.floor(r / newR);
    [t, newT] = [newT, t - quotient * newT];
    [r, newR] = [newR, r - quotient * newR];
  }

  if (r > 1) {
    throw new Error("a is not invertible modulo m");
  }

  if (t < 0) {
    t = t + m;
  }

  return t;
};

/**
 * Check if a number is likely a prime (using basic test)
 */
export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }

  return true;
};

/**
 * Verify that q divides (p-1)
 */
export const verifyQDividesPMinus1 = (p: number, q: number): boolean => {
  return (p - 1) % q === 0;
};

/**
 * Calculate public key
 * yA = h^xA mod p
 */
export const calculatePublicKey = (
  h: number,
  xA: number,
  p: number
): number => {
  if (xA < 1 || xA >= p) {
    throw new Error(`Private key must be between 1 and ${p - 1}`);
  }
  return modPow(h, xA, p);
};

/**
 * Generate DSA signature
 * @param H_M - Hash of message H(M)
 * @param p - Prime modulus
 * @param q - Prime order
 * @param h - Generator
 * @param xA - Private key
 * @param k - Random nonce (0 < k < q)
 * @returns [r, s] signature components
 */
export const generateSignature = (
  H_M: number,
  p: number,
  q: number,
  h: number,
  xA: number,
  k: number
): [number, number] => {
  if (k >= q || k < 1) {
    throw new Error(`k must be between 1 and ${q - 1}`);
  }

  if (H_M < 0) {
    throw new Error("H(M) must be non-negative");
  }

  // r = (h^k mod p) mod q
  const hk = modPow(h, k, p);
  const r = hk % q;

  if (r === 0) {
    throw new Error("r is 0, please choose a different k");
  }

  // k^(-1) mod q
  const k_inv = modInverse(k, q);

  // s = (H(M) + xA * r) * k^(-1) mod q
  const numerator = (H_M + (xA * r) % q) % q;
  const s = (numerator * k_inv) % q;

  if (s === 0) {
    throw new Error("s is 0, please choose a different k");
  }

  return [r, s];
};

/**
 * Verify DSA signature
 * @param H_M - Hash of message H(M)
 * @param r - First component of signature
 * @param s - Second component of signature
 * @param p - Prime modulus
 * @param q - Prime order
 * @param h - Generator
 * @param yA - Public key
 * @returns true if signature is valid, false otherwise
 */
export const verifySignature = (
  H_M: number,
  r: number,
  s: number,
  p: number,
  q: number,
  h: number,
  yA: number
): boolean => {
  // Check if 0 < r < q and 0 < s < q
  if (r < 1 || r >= q || s < 1 || s >= q) {
    return false;
  }

  try {
    // w = s^(-1) mod q
    const w = modInverse(s, q);

    // u1 = H(M) * w mod q
    const u1 = (H_M * w) % q;

    // u2 = r * w mod q
    const u2 = (r * w) % q;

    // h^u1 mod p
    const hu1 = modPow(h, u1, p);

    // yA^u2 mod p
    const yAu2 = modPow(yA, u2, p);

    // v = (h^u1 * yA^u2 mod p) mod q
    const v = ((hu1 * yAu2) % p) % q;

    // Signature is valid if v == r
    return v === r;
  } catch (err) {
    return false;
  }
};
