import { eulerTotient } from "./eulerTotient";

/**
 * Tính lũy thừa modulo: b = a^m mod n
 * @param base Cơ số (a)
 * @param exponent Số mũ (m)
 * @param modulus Modulo (n)
 * @returns Giá trị b = a^m mod n
 */
export function modularExponentiation(base: number, exponent: number, modulus: number): number {
    if (modulus === 1) return 0; 

    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}

/**
 * Tính lũy thừa modulo: b = a^m mod n bằng cách hạ bậc lũy thừa
 * @param base Cơ số (a)
 * @param exponent Số mũ (m)
 * @param modulus Modulo (n)
 * @returns Các bước tính toán và kết quả cuối cùng
 */
export function modularExponentiationWithSteps(base: number, exponent: number, modulus: number): { steps: string[], result: number } {
    if (modulus === 1) return { steps: ["Modulus is 1, result is always 0."], result: 0 };

    let result = 1;
    base = base % modulus;
    const steps: string[] = [];

    steps.push(`a^1 ≡ ${base} mod ${modulus} ≡ ${base}`);

    let currentPower = base;
    for (let i = 1; (1 << i) <= exponent; i++) {
        const nextPower = (currentPower * currentPower) % modulus;
        steps.push(`a^${1 << i} = (${currentPower} * ${currentPower}) mod ${modulus} = ${nextPower}`);
        currentPower = nextPower;
    }

    result = modularExponentiation(base, exponent, modulus);
    steps.push(`Final result: a^${exponent} mod ${modulus} = ${result}`);

    return { steps, result };
}

/**
 * Kiểm tra xem số n có phải là số nguyên tố hay không
 * @param n Số cần kiểm tra
 * @returns true nếu n là số nguyên tố, false nếu không
 */
export function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

/**
 * Tính ước số chung lớn nhất (GCD)
 * @param a Số thứ nhất
 * @param b Số thứ hai
 * @returns Ước số chung lớn nhất
 */
export function gcd(a: number, b: number): number {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return Math.abs(a);
}

/**
 * Sử dụng Định lý Fermat để tính lũy thừa modulo
 * Định lý Fermat: Nếu p là số nguyên tố và gcd(a, p) = 1, thì a^(p-1) ≡ 1 (mod p)
 * @param base Cơ số (a)
 * @param exponent Số mũ (m)
 * @param modulus Modulo (n)
 * @returns Đối tượng chứa các bước tính toán, kết quả và thông báo
 */
export function fermatTheoremExponentiation(
    base: number,
    exponent: number,
    modulus: number
): { steps: string[]; result: number | null; canUseFermat: boolean; message: string } {
    const steps: string[] = [];

    // Kiểm tra điều kiện 1: modulus phải là số nguyên tố
    if (!isPrime(modulus)) {
        steps.push(`Điều kiện 1: Kiểm tra n = ${modulus} có phải số nguyên tố?`);
        steps.push(`Kết quả: ${modulus} KHÔNG phải số nguyên tố`);
        return {
            steps,
            result: null,
            canUseFermat: false,
            message: `Không thể sử dụng Fermat: ${modulus} không phải số nguyên tố`
        };
    }
    steps.push(`Điều kiện 1: n = ${modulus} là số nguyên tố ✓`);

    // Kiểm tra điều kiện 2: gcd(a, n) = 1
    const gcdValue = gcd(base, modulus);
    if (gcdValue !== 1) {
        steps.push(`Điều kiện 2: gcd(${base}, ${modulus}) = ${gcdValue}`);
        steps.push(`Kết quả: gcd(a, n) ≠ 1`);
        return {
            steps,
            result: null,
            canUseFermat: false,
            message: `Không thể sử dụng Fermat: gcd(${base}, ${modulus}) = ${gcdValue} ≠ 1`
        };
    }
    steps.push(`Điều kiện 2: gcd(${base}, ${modulus}) = 1 ✓`);

    // Áp dụng Định lý Fermat
    steps.push("");
    steps.push(`Áp dụng Định lý Fermat:`);
    steps.push(`Vì ${base}^(${modulus}-1) ≡ 1 (mod ${modulus})`);
    steps.push(`Nên ${base}^${modulus - 1} ≡ 1 (mod ${modulus})`);

    // Tính m mod (n-1)
    const reducedExponent = exponent % (modulus - 1);
    steps.push("");
    steps.push(`Giảm số mũ: m' = ${exponent} mod ${modulus - 1} = ${reducedExponent}`);

    // Tính a^m' mod n
    let result = 1;
    // let base_copy = base % modulus;

    if (reducedExponent === 0) {
        result = 1;
        steps.push(`Vì ${exponent} ≡ 0 (mod ${modulus - 1})`);
        steps.push(`Nên ${base}^${exponent} ≡ ${base}^0 ≡ 1 (mod ${modulus})`);
    } else {
        result = modularExponentiation(base, reducedExponent, modulus);
        steps.push(`Tính ${base}^${reducedExponent} mod ${modulus}:`);
        steps.push(`${base}^${exponent} ≡ ${base}^${reducedExponent} (mod ${modulus}) = ${result}`);
    }

    steps.push("");
    steps.push(`Kết quả cuối cùng: ${base}^${exponent} mod ${modulus} = ${result}`);

    return {
        steps,
        result,
        canUseFermat: true,
        message: "Có thể sử dụng Định lý Fermat"
    };
}

/**
 * Sử dụng Định lý Euler để tính lũy thừa modulo
 * Định lý Euler: Nếu gcd(a, n) = 1, thì a^φ(n) ≡ 1 (mod n)
 * @param base Cơ số (a)
 * @param exponent Số mũ (m)
 * @param modulus Modulo (n)
 * @returns Đối tượng chứa các bước tính toán, kết quả và thông báo
 */
export function eulerTheoremExponentiation(
    base: number,
    exponent: number,
    modulus: number
): { steps: string[]; result: number | null; canUseEuler: boolean; message: string } {
    const steps: string[] = [];

    // Kiểm tra điều kiện: gcd(a, n) = 1
    const gcdValue = gcd(base, modulus);
    steps.push(`Kiểm tra điều kiện: gcd(${base}, ${modulus}) = ${gcdValue}`);
    
    if (gcdValue !== 1) {
        steps.push(`Kết quả: gcd(a, n) ≠ 1`);
        return {
            steps,
            result: null,
            canUseEuler: false,
            message: `Không thể sử dụng Euler: gcd(${base}, ${modulus}) = ${gcdValue} ≠ 1`
        };
    }
    steps.push(`Kết quả: gcd(a, n) = 1 ✓`);

    // Tính φ(n)
    const phi = eulerTotient(modulus);
    steps.push("");
    steps.push(`Tính φ(n) = φ(${modulus}) = ${phi}`);

    // Áp dụng Định lý Euler
    steps.push("");
    steps.push(`Áp dụng Định lý Euler:`);
    steps.push(`Vì gcd(${base}, ${modulus}) = 1`);
    steps.push(`Nên ${base}^${phi} ≡ 1 (mod ${modulus})`);

    // Tính m mod φ(n)
    const reducedExponent = exponent % phi;
    steps.push("");
    steps.push(`Giảm số mũ: m' = ${exponent} mod ${phi} = ${reducedExponent}`);

    // Tính a^m' mod n
    let result = 1;

    if (reducedExponent === 0) {
        result = 1;
        steps.push(`Vì ${exponent} ≡ 0 (mod ${phi})`);
        steps.push(`Nên ${base}^${exponent} ≡ ${base}^0 ≡ 1 (mod ${modulus})`);
    } else {
        result = modularExponentiation(base, reducedExponent, modulus);
        steps.push(`Tính ${base}^${reducedExponent} mod ${modulus}:`);
        steps.push(`${base}^${exponent} ≡ ${base}^${reducedExponent} (mod ${modulus}) = ${result}`);
    }

    steps.push("");
    steps.push(`Kết quả cuối cùng: ${base}^${exponent} mod ${modulus} = ${result}`);

    return {
        steps,
        result,
        canUseEuler: true,
        message: "Có thể sử dụng Định lý Euler"
    };
}