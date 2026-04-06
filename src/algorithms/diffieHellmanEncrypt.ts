/**
 * Diffie-Hellman Key Exchange Algorithm
 * 
 * Formula:
 * yA = a^xA mod q
 * yB = a^xB mod q
 * K = yB^xA mod q = yA^xB mod q (shared secret key)
 */

/**
 * Calculate public key using modular exponentiation
 * y = a^x mod q
 */
export const calculatePublicKey = (
  a: number,
  privateKey: number,
  q: number
): number => {
  if (q <= 0 || a < 0 || privateKey < 0) {
    throw new Error("Invalid parameters: q > 0, a >= 0, privateKey >= 0");
  }
  
  if (a >= q) {
    throw new Error(`a must be less than q (${a} >= ${q})`);
  }

  // Use modular exponentiation for large numbers
  return modPow(a, privateKey, q);
};

/**
 * Calculate shared secret key
 * K = yOther^privateKey mod q
 */
export const calculateSharedSecret = (
  publicKeyOther: number,
  privateKey: number,
  q: number
): number => {
  if (q <= 0 || publicKeyOther < 0 || privateKey < 0) {
    throw new Error("Invalid parameters");
  }

  return modPow(publicKeyOther, privateKey, q);
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
 * For production, use Miller-Rabin test
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
 * Check if a is a primitive root modulo q
 * A primitive root modulo q is a number whose powers generate all numbers from 1 to q-1
 */
export const isPrimitiveRoot = (a: number, q: number): boolean => {
  if (a >= q || a < 2) return false;

  // For a to be a primitive root of prime q, a^((q-1)/p) != 1 (mod q)
  // for all prime divisors p of (q-1)
  
  // Find prime factors of (q - 1)
  const factors = getPrimeFactors(q - 1);
  
  for (const factor of factors) {
    const exp = (q - 1) / factor;
    if (modPow(a, exp, q) === 1) {
      return false;
    }
  }

  return true;
};

/**
 * Get prime factors of a number
 */
const getPrimeFactors = (n: number): number[] => {
  const factors: number[] = [];
  let d = 2;

  while (d * d <= n) {
    while (n % d === 0) {
      if (!factors.includes(d)) {
        factors.push(d);
      }
      n /= d;
    }
    d++;
  }

  if (n > 1) {
    factors.push(n);
  }

  return factors;
};
