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
 * Tính lũy thừa modulo: base^exp mod mod
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
 * Tìm modular inverse sử dụng Extended Euclidean Algorithm
 */
function modularInverse(a: number, m: number): number {
    let [old_r, r] = [a, m];
    let [old_s, s] = [1, 0];

    while (r !== 0) {
        let quotient = Math.floor(old_r / r);
        [old_r, r] = [r, old_r - quotient * r];
        [old_s, s] = [s, old_s - quotient * s];
    }

    return old_s < 0 ? old_s + m : old_s;
}

/**
 * Sử dụng Định lý Số dư Trung Hoa để kết hợp các modulo
 */
function chineseRemainderTheorem(remainders: number[], moduli: number[]): number {
    let N = 1;
    for (let mod of moduli) {
        N *= mod;
    }

    let result = 0;
    for (let i = 0; i < remainders.length; i++) {
        const Ni = Math.floor(N / moduli[i]);
        const Mi = modularInverse(Ni, moduli[i]);
        result += remainders[i] * Ni * Mi;
    }

    return result % N;
}

export interface CRTStep {
    prime: number;
    modularExp: number;
}

/**
 * Tính b = a^k mod n sử dụng Định lý Số dư Trung Hoa
 */
export function crtModularExponentiation(a: number, k: number, n: number): {
    result: number;
    steps: string[];
    primeFactors: number[];
    crtSteps: CRTStep[];
} {
    const steps: string[] = [];
    const primeFactors = getPrimeFactors(n);
    const crtSteps: CRTStep[] = [];

    steps.push(`Tính b = ${a}^${k} mod ${n} sử dụng Định lý Số dư Trung Hoa`);
    steps.push(`Phân tích n = ${n}:`);

    // Phân tích thừa số nguyên tố
    let factorization = `${n} = `;
    const factors: number[] = [];
    let tempN = n;
    for (const p of primeFactors) {
        let count = 0;
        while (tempN % p === 0) {
            count++;
            tempN /= p;
        }
        if (count === 1) {
            factors.push(p);
            factorization += `${p} × `;
        } else {
            for (let i = 0; i < count; i++) {
                factors.push(p);
            }
            factorization += `${p}^${count} × `;
        }
    }
    factorization = factorization.slice(0, -3);
    steps.push(factorization);
    steps.push(`Các ước nguyên tố: ${factors.join(", ")}`);

    // Tính modular exponentiation cho mỗi ước nguyên tố
    const remainders: number[] = [];
    const moduli: number[] = [];

    steps.push(`\nBước 1: Tính a^k mod p_i cho mỗi ước nguyên tố:`);

    for (const factor of factors) {
        const remainder = modularExponentiation(a, k, factor);
        remainders.push(remainder);
        moduli.push(factor);
        crtSteps.push({ prime: factor, modularExp: remainder });
        steps.push(`${a}^${k} mod ${factor} = ${remainder}`);
    }

    // Sử dụng CRT để kết hợp kết quả
    steps.push(`\nBước 2: Sử dụng Định lý Số dư Trung Hoa để kết hợp kết quả`);
    
    const result = chineseRemainderTheorem(remainders, moduli);

    steps.push(`Kết hợp các remainder theo CRT:`);
    steps.push(`${remainders.join(", ")} với moduli ${moduli.join(", ")}`);
    steps.push(`\nKết quả: b = ${a}^${k} mod ${n} = ${result}`);

    return { result, steps, primeFactors: factors, crtSteps };
}

/**
 * Tính bình thường (không dùng CRT) để so sánh
 */
export function directModularExponentiation(a: number, k: number, n: number): number {
    return modularExponentiation(a, k, n);
}
