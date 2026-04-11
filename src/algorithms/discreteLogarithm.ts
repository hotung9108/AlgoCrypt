export function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function modularExponentiation(base: number, exp: number, mod: number): number {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod;
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

export interface DiscreteLogarithmStep {
  k: number;
  calculation: string;
  result: number;
  found: boolean;
}

export interface DiscreteLogarithmResult {
  k: number | null;
  found: boolean;
  steps: string[];
  checkSteps: DiscreteLogarithmStep[];
}

export function discreteLogarithm(a: number, b: number, n: number): DiscreteLogarithmResult {
  const steps: string[] = [];
  const checkSteps: DiscreteLogarithmStep[] = [];

  steps.push(`Tìm k sao cho: ${a}^k ≡ ${b} (mod ${n})`);
  steps.push("");

  // Check if gcd(a, n) = 1
  const g = gcd(a, n);
  steps.push(`Bước 1: Kiểm tra gcd(${a}, ${n}) = ${g}`);
  
  if (g !== 1) {
    steps.push(`⚠️ Chú ý: gcd(${a}, ${n}) = ${g} ≠ 1. Giải pháp có thể không tồn tại hoặc được giới hạn.`);
  }
  steps.push("");

  steps.push(`Bước 2: Tìm k bằng cách thử từ k = 0 đến k = ${n - 1}`);
  steps.push(`Tính ${a}^k mod ${n} cho mỗi k:`);
  steps.push("");

  // Try all values of k from 0 to n-1
  for (let k = 0; k < n; k++) {
    const result = modularExponentiation(a, k, n);
    const found = result === b;

    checkSteps.push({
      k,
      calculation: `${a}^${k} mod ${n}`,
      result,
      found,
    });

    steps.push(`  k = ${k}: ${a}^${k} ≡ ${result} (mod ${n})${found ? ' ✓ FOUND' : ''}`);

    if (found) {
      steps.push("");
      steps.push(`✓ Tìm thấy: ${a}^${k} ≡ ${b} (mod ${n})`);
      steps.push(`Vậy log_${a}(${b}) ≡ ${k} (mod ${n})`);
      return {
        k,
        found: true,
        steps,
        checkSteps,
      };
    }
  }

  steps.push("");
  steps.push(`✗ Không tìm thấy k trong khoảng [0, ${n - 1}]`);
  steps.push(`${b} không phải là một lũy thừa của ${a} modulo ${n}`);

  return {
    k: null,
    found: false,
    steps,
    checkSteps,
  };
}
