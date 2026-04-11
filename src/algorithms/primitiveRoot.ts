/**
 * Tìm các ước nguyên tố của n
 */
function getPrimeFactors(n: number): number[] {
    const factors: number[] = [];
    let temp = n;

    if (temp % 2 === 0) {
        factors.push(2);
        while (temp % 2 === 0) {
            temp /= 2;
        }
    }

    for (let i = 3; i * i <= temp; i += 2) {
        if (temp % i === 0) {
            factors.push(i);
            while (temp % i === 0) {
                temp /= i;
            }
        }
    }

    if (temp > 1) {
        factors.push(temp);
    }

    return factors;
}

/**
 * Tính modular exponentiation: base^exp mod mod
 */
function modularExponentiation(base: number, exp: number, mod: number): number {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}

/**
 * Tính hàm Euler φ(n)
 */
function eulerTotient(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;

    const primeFactors = getPrimeFactors(n);
    let result = n;

    for (const p of primeFactors) {
        result = result * (p - 1) / p;
    }

    return result;
}

/**
 * GCD - Greatest Common Divisor
 */
function gcd(a: number, b: number): number {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

export interface PrimitiveRootCheckStep {
    prime: number;
    quotient: number;
    result: number;
    isPassed: boolean;
}

/**
 * Kiểm tra xem a có phải là căn nguyên thủy của n hay không
 * Căn nguyên thủy: a^φ(n)/p ≢ 1 (mod n) cho tất cả ước nguyên tố p của φ(n)
 */
export function isPrimitiveRoot(a: number, n: number): {
    isPrimitive: boolean;
    phi: number;
    primeFactors: number[];
    steps: string[];
    checkSteps: PrimitiveRootCheckStep[];
} {
    const steps: string[] = [];
    const checkSteps: PrimitiveRootCheckStep[] = [];

    steps.push(`Kiểm tra xem ${a} có là căn nguyên thủy của ${n} không`);

    // Kiểm tra gcd(a, n) = 1
    const g = gcd(a, n);
    steps.push(`\nBước 1: Kiểm tra gcd(${a}, ${n}) = ${g}`);

    if (g !== 1) {
        steps.push(`gcd(${a}, ${n}) ≠ 1, nên ${a} không phải là căn nguyên thủy của ${n}`);
        return { isPrimitive: false, phi: 0, primeFactors: [], steps, checkSteps };
    }

    // Tính φ(n)
    const phi = eulerTotient(n);
    steps.push(`Bước 2: Tính φ(${n}) = ${phi}`);

    // Tìm ước nguyên tố của φ(n)
    const primeFactors = getPrimeFactors(phi);
    steps.push(`\nBước 3: Phân tích φ(${n}) = ${phi}`);
    steps.push(`Các ước nguyên tố của φ(${n}): ${primeFactors.join(", ")}`);

    // Kiểm tra a^(φ(n)/p) ≢ 1 (mod n) cho mỗi ước nguyên tố
    steps.push(`\nBước 4: Kiểm tra điều kiện căn nguyên thủy`);
    steps.push(`${a} là căn nguyên thủy nếu ${a}^(${phi}/p) ≢ 1 (mod ${n}) cho tất cả ước nguyên tố p`);

    let isPrimitive = true;
    for (const prime of primeFactors) {
        const quotient = phi / prime;
        const result = modularExponentiation(a, quotient, n);
        const isPassed = result !== 1;

        checkSteps.push({ prime, quotient, result, isPassed });
        steps.push(`${a}^(${phi}/${prime}) = ${a}^${quotient} mod ${n} = ${result} ${isPassed ? "✓" : "✗"}`);

        if (!isPassed) {
            isPrimitive = false;
        }
    }

    steps.push(`\nKết quả: ${a} ${isPrimitive ? "LÀ" : "KHÔNG LÀ"} căn nguyên thủy của ${n}`);

    return { isPrimitive, phi, primeFactors, steps, checkSteps };
}
