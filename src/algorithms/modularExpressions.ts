export function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function extendedGCD(a: number, b: number): { gcd: number; x: number; y: number } {
  if (b === 0) return { gcd: a, x: 1, y: 0 };
  const { gcd: g, x: x1, y: y1 } = extendedGCD(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;
  return { gcd: g, x, y };
}

export function modularInverse(a: number, m: number): number | null {
  const { gcd: g, x } = extendedGCD(a % m, m);
  if (g !== 1) return null;
  return ((x % m) + m) % m;
}

export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

export interface ModularExpressionStep {
  label: string;
  calculation: string;
  result: number;
}

export interface ModularExpressionResult {
  A1: number;
  A2: number;
  A3: number;
  A4: number | null;
  A5: number | null;
  steps: string[];
  detailSteps: ModularExpressionStep[];
}

export function calculateModularExpressions(a: number, b: number, x: number, y: number, n: number): ModularExpressionResult {
  const steps: string[] = [];
  const detailSteps: ModularExpressionStep[] = [];

  steps.push(`Tính các biểu thức modular cơ bản với a=${a}, b=${b}, x=${x}, y=${y}, n=${n}`);
  steps.push("");

  // Calculate ax
  const ax = a * x;
  steps.push(`Bước 1: Tính a*x = ${a}*${x} = ${ax}`);

  // Calculate by
  const by = b * y;
  steps.push(`Bước 2: Tính b*y = ${b}*${y} = ${by}`);

  steps.push("");

  // A1 = (ax + by) mod n
  const A1_calc = ax + by;
  const A1 = mod(A1_calc, n);
  steps.push(`A1 = (a*x + b*y) mod n = (${ax} + ${by}) mod ${n} = ${A1_calc} mod ${n} = ${A1}`);
  detailSteps.push({
    label: "A1",
    calculation: `(${ax} + ${by}) mod ${n}`,
    result: A1,
  });

  steps.push("");

  // A2 = (ax - by) mod n
  const A2_calc = ax - by;
  const A2 = mod(A2_calc, n);
  steps.push(`A2 = (a*x - b*y) mod n = (${ax} - ${by}) mod ${n} = ${A2_calc} mod ${n} = ${A2}`);
  detailSteps.push({
    label: "A2",
    calculation: `(${ax} - ${by}) mod ${n}`,
    result: A2,
  });

  steps.push("");

  // A3 = (ax * by) mod n
  const A3_calc = ax * by;
  const A3 = mod(A3_calc, n);
  steps.push(`A3 = (a*x * b*y) mod n = (${ax} * ${by}) mod ${n} = ${A3_calc} mod ${n} = ${A3}`);
  detailSteps.push({
    label: "A3",
    calculation: `(${ax} * ${by}) mod ${n}`,
    result: A3,
  });

  steps.push("");

  // A4 = (by)^(-1) mod n
  let A4: number | null = null;
  const by_mod = mod(by, n);
  const A4_inverse = modularInverse(by_mod, n);

  if (A4_inverse !== null) {
    A4 = A4_inverse;
    steps.push(`A4 = (b*y)^(-1) mod n`);
    steps.push(`  Trước tiên: b*y mod n = ${by} mod ${n} = ${by_mod}`);
    steps.push(`  Tìm (${by_mod})^(-1) mod ${n}`);
    steps.push(`  Sử dụng Extended GCD để tìm modular inverse`);
    steps.push(`  (${by_mod})^(-1) ≡ ${A4} (mod ${n})`);
    steps.push(`  Kiểm chứng: (${by_mod} * ${A4}) mod ${n} = ${mod(by_mod * A4, n)}`);
    detailSteps.push({
      label: "A4",
      calculation: `(${by_mod})^(-1) mod ${n}`,
      result: A4,
    });
  } else {
    steps.push(`A4 = (b*y)^(-1) mod n`);
    steps.push(`  ✗ Không tồn tại modular inverse của ${by_mod} modulo ${n}`);
    steps.push(`  Lý do: gcd(${by_mod}, ${n}) ≠ 1`);
    detailSteps.push({
      label: "A4",
      calculation: `(${by_mod})^(-1) mod ${n} - không tồn tại`,
      result: 0,
    });
  }

  steps.push("");

  // A5 = (ax / by) mod n = (ax * by^(-1)) mod n
  let A5: number | null = null;
  if (A4 !== null) {
    // A5 = A3 * A4 mod n would give us (ax*by)*(by^-1) mod n but that's just ax mod n
    // Actually A5 should be ax / by = ax * (by^-1) mod n
    const ax_mod = mod(ax, n);
    const A5_calc = ax_mod * A4;
    A5 = mod(A5_calc, n);
    steps.push(`A5 = (a*x / b*y) mod n = (a*x * (b*y)^(-1)) mod n`);
    steps.push(`  = (${ax_mod} * ${A4}) mod ${n}`);
    steps.push(`  = ${A5_calc} mod ${n}`);
    steps.push(`  = ${A5}`);
    detailSteps.push({
      label: "A5",
      calculation: `(${ax_mod} * ${A4}) mod ${n}`,
      result: A5,
    });
  } else {
    steps.push(`A5 = (a*x / b*y) mod n`);
    steps.push(`  ✗ Cannot calculate because (b*y)^(-1) mod n does not exist`);
    detailSteps.push({
      label: "A5",
      calculation: `(a*x / b*y) mod ${n} - không tính được`,
      result: 0,
    });
  }

  return {
    A1,
    A2,
    A3,
    A4,
    A5,
    steps,
    detailSteps,
  };
}
