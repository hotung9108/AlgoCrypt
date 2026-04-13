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

// ==================== DEBUG FUNCTIONS FOR STEP VISUALIZATION ====================

export interface ModPowStep {
  step: number;
  description: string;
  base: number;
  exp: number;
  modulus: number;
  result: number;
}

export interface PublicKeyCalculation {
  formula: string;
  base: number;
  exponent: number;
  modulus: number;
  steps: ModPowStep[];
  publicKey: number;
}

export interface SharedSecretCalculation {
  formula: string;
  base: number;
  exponent: number;
  modulus: number;
  steps: ModPowStep[];
  sharedSecret: number;
}

export interface DiffieHellmanDebugSteps {
  q: number;
  a: number;
  xA: number;
  xB: number;
  partyAPublicKey: PublicKeyCalculation;
  partyBPublicKey: PublicKeyCalculation;
  partyASharedSecret: SharedSecretCalculation;
  partyBSharedSecret: SharedSecretCalculation;
  sharedSecret: number;
}

// Track intermediate steps during modular exponentiation
function modPowWithSteps(
  base: number,
  exp: number,
  modulus: number
): { result: number; steps: ModPowStep[] } {
  if (modulus === 1) return { result: 0, steps: [] };

  let result = 1;
  base = base % modulus;
  const steps: ModPowStep[] = [];
  let stepNum = 1;

  const initialBase = base;
  const initialExp = exp;

  steps.push({
    step: stepNum++,
    description: `Initialize: result = 1, base = ${initialBase}`,
    base: initialBase,
    exp: initialExp,
    modulus,
    result: 1
  });

  let currentExp = exp;
  let currentBase = base;

  while (currentExp > 0) {
    if (currentExp % 2 === 1) {
      result = (result * currentBase) % modulus;
      steps.push({
        step: stepNum++,
        description: `Odd exponent: result = (${Math.floor((result * currentBase) / modulus) > 0 ? '...' : result} * ${currentBase}) mod ${modulus}`,
        base: currentBase,
        exp: currentExp,
        modulus,
        result
      });
    }

    currentExp = Math.floor(currentExp / 2);
    if (currentExp > 0) {
      currentBase = (currentBase * currentBase) % modulus;
      steps.push({
        step: stepNum++,
        description: `Square: base = (${currentBase}) mod ${modulus}`,
        base: currentBase,
        exp: currentExp,
        modulus,
        result
      });
    }
  }

  return { result, steps };
}

export function diffieHellmanDebug(
  q: number,
  a: number,
  xA: number,
  xB: number
): DiffieHellmanDebugSteps {
  // Calculate Party A's public key
  const { result: yA, steps: stepsA } = modPowWithSteps(a, xA, q);
  const partyAPublicKey: PublicKeyCalculation = {
    formula: `yA = a^xA mod q = ${a}^${xA} mod ${q}`,
    base: a,
    exponent: xA,
    modulus: q,
    steps: stepsA,
    publicKey: yA
  };

  // Calculate Party B's public key
  const { result: yB, steps: stepsB } = modPowWithSteps(a, xB, q);
  const partyBPublicKey: PublicKeyCalculation = {
    formula: `yB = a^xB mod q = ${a}^${xB} mod ${q}`,
    base: a,
    exponent: xB,
    modulus: q,
    steps: stepsB,
    publicKey: yB
  };

  // Calculate Party A's shared secret: K = yB^xA mod q
  const { result: secretA, steps: stepsSecretA } = modPowWithSteps(yB, xA, q);
  const partyASharedSecret: SharedSecretCalculation = {
    formula: `K = yB^xA mod q = ${yB}^${xA} mod ${q}`,
    base: yB,
    exponent: xA,
    modulus: q,
    steps: stepsSecretA,
    sharedSecret: secretA
  };

  // Calculate Party B's shared secret: K = yA^xB mod q
  const { result: secretB, steps: stepsSecretB } = modPowWithSteps(yA, xB, q);
  const partyBSharedSecret: SharedSecretCalculation = {
    formula: `K = yA^xB mod q = ${yA}^${xB} mod ${q}`,
    base: yA,
    exponent: xB,
    modulus: q,
    steps: stepsSecretB,
    sharedSecret: secretB
  };

  return {
    q,
    a,
    xA,
    xB,
    partyAPublicKey,
    partyBPublicKey,
    partyASharedSecret,
    partyBSharedSecret,
    sharedSecret: secretA // Both should be equal
  };
}
