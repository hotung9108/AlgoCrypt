/**
 * Extended Euclidean Algorithm để tìm modular inverse
 */
function extendedGCD(a: number, b: number): { gcd: number; x: number; y: number } {
    if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
    }
    
    const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    
    return { gcd, x, y };
}

/**
 * Tìm modular inverse: a^(-1) mod m
 */
function modularInverse(a: number, m: number): number {
    const { gcd, x } = extendedGCD(a, m);
    
    if (gcd !== 1) {
        return -1; // Không tồn tại inverse
    }
    
    return (x % m + m) % m;
}

/**
 * Sử dụng Định lý Số dư Trung Hoa để giải hệ phương trình modulo
 * x ≡ a1 (mod m1)
 * x ≡ a2 (mod m2)
 * x ≡ a3 (mod m3)
 * ...
 */
export function chineseRemainderTheoremSolve(
    remainders: number[],
    moduli: number[]
): {
    solution: number;
    totalModulus: number;
    steps: string[];
} {
    const steps: string[] = [];

    // Kiểm tra số lượng
    if (remainders.length !== moduli.length) {
        steps.push("Error: số lượng remainder phải bằng số lượng moduli");
        return { solution: -1, totalModulus: 0, steps };
    }

    steps.push(`Giải hệ phương trình modulo sử dụng Định lý Số dư Trung Hoa:`);
    for (let i = 0; i < remainders.length; i++) {
        steps.push(`x ≡ ${remainders[i]} (mod ${moduli[i]})`);
    }

    // Tính M = m1 * m2 * m3 * ...
    let M = 1;
    for (const m of moduli) {
        M *= m;
    }
    steps.push(`\nM = ${moduli.join(" × ")} = ${M}`);

    // Tính M_i = M / m_i và M_i^(-1) mod m_i
    let x = 0;
    
    steps.push(`\nTính các hệ số:`);
    for (let i = 0; i < remainders.length; i++) {
        const Mi = Math.floor(M / moduli[i]);
        const yI = modularInverse(Mi, moduli[i]);

        if (yI === -1) {
            steps.push(`Error: Không tìm được inverse của M_${i + 1} = ${Mi} mod ${moduli[i]}`);
            return { solution: -1, totalModulus: M, steps };
        }

        const term = remainders[i] * Mi * yI;
        x += term;

        steps.push(`M_${i + 1} = ${M}/${moduli[i]} = ${Mi}`);
        steps.push(`y_${i + 1} = ${Mi}^(-1) mod ${moduli[i]} = ${yI}`);
        steps.push(`a_${i + 1} × M_${i + 1} × y_${i + 1} = ${remainders[i]} × ${Mi} × ${yI} = ${term}`);
    }

    x = ((x % M) + M) % M;

    steps.push(`\nKết hợp:`);
    steps.push(`x = (${remainders.map((a, i) => `${a}×M_${i + 1}×y_${i + 1}`).join(" + ")}) mod ${M}`);
    steps.push(`x = ${x}`);

    // Xác minh kết quả
    steps.push(`\nXác minh:`);
    for (let i = 0; i < remainders.length; i++) {
        const check = x % moduli[i];
        const isCorrect = check === remainders[i];
        steps.push(`${x} mod ${moduli[i]} = ${check} ${isCorrect ? "✓" : "✗"} (expected ${remainders[i]})`);
    }

    return { solution: x, totalModulus: M, steps };
}

export interface CRTSolveStep {
    index: number;
    remainder: number;
    modulus: number;
    Mi: number;
    yI: number;
    verification: number;
}
