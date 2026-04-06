/**
 * ElGamal Encryption Algorithm
 * 
 * ElGamal is an asymmetric encryption algorithm based on discrete logarithm problem
 * 
 * Input Parameters:
 * - q: prime number
 * - a: primitive root of q (generator)
 * - xA: private key (secret exponent)
 * - k: random number for encryption (1 < k < q)
 * - M: message to encrypt (0 < M < q)
 * 
 * Key Generation:
 * - Public Key: PU = {q, a, YA} where YA = a^xA mod q
 * - Private Key: PR = {xA}
 * 
 * Encryption:
 * - Generate random k (1 < k < q)
 * - C1 = a^k mod q
 * - C2 = YA^k * M mod q
 * - Ciphertext = (C1, C2)
 * 
 * Decryption:
 * - M = C2 / C1^xA mod q
 * - Or: M = C2 * (C1^xA)^(-1) mod q
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
 * Check if a is a primitive root of p
 * a is a primitive root of p if a^k mod p != 1 for all 1 <= k < (p-1)
 * and a^(p-1) mod p = 1
 */
export const isPrimitiveRoot = (a: number, p: number): boolean => {
  if (a >= p || a < 1) return false;

  // a^(p-1) should be 1 mod p
  if (modPow(a, p - 1, p) !== 1) {
    return false;
  }

  // Find prime factors of p-1
  const factors = getPrimeFactors(p - 1);

  // For each prime factor q of (p-1), a^((p-1)/q) should not be 1 mod p
  for (const factor of factors) {
    if (modPow(a, (p - 1) / factor, p) === 1) {
      return false;
    }
  }

  return true;
};

/**
 * Find all prime factors of a number
 */
const getPrimeFactors = (n: number): number[] => {
  const factors: number[] = [];
  let d = 2;

  while (d * d <= n) {
    while (n % d === 0) {
      if (factors.length === 0 || factors[factors.length - 1] !== d) {
        factors.push(d);
      }
      n = Math.floor(n / d);
    }
    d++;
  }

  if (n > 1) {
    factors.push(n);
  }

  return factors;
};

/**
 * Calculate public key
 * YA = a^xA mod q (Alice's public key)
 */
export const calculatePublicKey = (
  a: number,
  xA: number,
  q: number
): number => {
  if (xA < 1 || xA >= q) {
    throw new Error(`Private key must be between 1 and ${q - 1}`);
  }
  return modPow(a, xA, q);
};

/**
 * Encrypt message using ElGamal
 * @param message - Message to encrypt (0 < M < q)
 * @param a - Primitive root
 * @param yA - Public key of recipient
 * @param q - Prime number
 * @param k - Random number for this encryption (1 < k < q)
 * @returns [C1, C2] ciphertext components
 * 
 * Encryption formulas:
 * - C1 = a^k mod q
 * - K_enc = YA^k mod q
 * - C2 = (M * K_enc) mod q
 */
export const encryptElGamal = (
  message: number,
  a: number,
  yA: number,
  q: number,
  k: number
): [number, number] => {
  if (message >= q || message < 1) {
    throw new Error(`Message must be between 1 and ${q - 1}`);
  }

  if (k >= q || k < 2) {
    throw new Error(`Random number k must be between 2 and ${q - 1}`);
  }

  // C1 = a^k mod q
  const C1 = modPow(a, k, q);

  // K_enc = YA^k mod q (shared secret component)
  const K_enc = modPow(yA, k, q);

  // C2 = (M * K_enc) mod q
  const C2 = (message * K_enc) % q;

  return [C1, C2];
};

/**
 * Decrypt ElGamal ciphertext
 * @param C1 - First component of ciphertext
 * @param C2 - Second component of ciphertext
 * @param xA - Private key
 * @param q - Prime number
 * @returns Decrypted message
 * 
 * Decryption formulas:
 * - K_dec = C1^xA mod q (recovers shared secret)
 * - K_inv = (K_dec)^(-1) mod q (modular inverse)
 * - M = (C2 * K_inv) mod q (recover message)
 */
export const decryptElGamal = (
  C1: number,
  C2: number,
  xA: number,
  q: number
): number => {
  // K_dec = C1^xA mod q (this equals YA^k mod q mathematically)
  const K_dec = modPow(C1, xA, q);

  // K_inv = (K_dec)^(-1) mod q (modular inverse)
  const K_inv = modInverse(K_dec, q);

  // M = (C2 * K_inv) mod q
  const M_recovered = (C2 * K_inv) % q;

  return M_recovered;
};
