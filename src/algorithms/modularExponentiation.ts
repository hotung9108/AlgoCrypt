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