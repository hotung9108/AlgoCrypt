/**
 * RSA Algorithm
 * 
 * RSA (Rivest-Shamir-Adleman) is an asymmetric cryptosystem based on:
 * Public Key: PU = {e, n}
 * Private Key: PR = {d, n}
 * 
 * Encryption: C ≡ M^e (mod n)
 * Decryption: M ≡ C^d (mod n)
 */

/**
 * Calculate n = p * q
 */
export const calculateN = (p: number, q: number): number => {
  if (p <= 0 || q <= 0) {
    throw new Error("p and q must be positive");
  }
  return p * q;
};

/**
 * Calculate φ(n) = (p-1) * (q-1)
 */
export const calculatePhi = (p: number, q: number): number => {
  if (p <= 1 || q <= 1) {
    throw new Error("p and q must be greater than 1");
  }
  return (p - 1) * (q - 1);
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
 * Check if e is valid for RSA
 * e must be coprime with φ(n) and 1 < e < φ(n)
 */
export const isValidE = (e: number, phi: number): boolean => {
  return e > 1 && e < phi && gcd(e, phi) === 1;
};

/**
 * Calculate modular multiplicative inverse using Extended Euclidean Algorithm
 * Find d such that: e*d ≡ 1 (mod φ(n))
 */
export const calculateD = (e: number, phi: number): number => {
  let t = 0;
  let newT = 1;
  let r = phi;
  let newR = e;

  while (newR !== 0) {
    const quotient = Math.floor(r / newR);
    [t, newT] = [newT, t - quotient * newT];
    [r, newR] = [newR, r - quotient * newR];
  }

  if (r > 1) {
    throw new Error("e is not invertible modulo φ(n)");
  }

  if (t < 0) {
    t = t + phi;
  }

  return t;
};

/**
 * Encrypt message: C ≡ M^e (mod n)
 */
export const encryptRSA = (
  message: number,
  e: number,
  n: number
): number => {
  if (message >= n) {
    throw new Error(`Message must be less than n (${message} >= ${n})`);
  }
  return modPow(message, e, n);
};

/**
 * Decrypt ciphertext: M ≡ C^d (mod n)
 */
export const decryptRSA = (
  ciphertext: number,
  d: number,
  n: number
): number => {
  return modPow(ciphertext, d, n);
};

/**
 * Modular exponentiation: (base^exp) mod modulus
 * Uses binary exponentiation for efficiency
 */
const modPow = (base: number, exp: number, modulus: number): number => {
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
 * Check if a number is likely a prime (using basic test)
 * For production use, implement Miller-Rabin test
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
 * Verify RSA key generation
 */
export const verifyKey = (
  p: number,
  q: number,
  e: number,
  d: number
): boolean => {
  const n = calculateN(p, q);
  const phi = calculatePhi(p, q);

  // Check if p and q are prime
  if (!isPrime(p) || !isPrime(q)) {
    return false;
  }

  // Check if e is valid
  if (!isValidE(e, phi)) {
    return false;
  }

  // Check if e*d ≡ 1 (mod φ(n))
  return (e * d) % phi === 1;
};
