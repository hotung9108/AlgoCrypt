/**
 * Tìm các ước nguyên tố của n
 * @param n Số cần tìm ước nguyên tố
 * @returns Mảng các ước nguyên tố
 */
export function getPrimeFactors(n: number): number[] {
    const factors: number[] = [];
    let temp = n;

    // Kiểm tra ước 2
    if (temp % 2 === 0) {
        factors.push(2);
        while (temp % 2 === 0) {
            temp /= 2;
        }
    }

    // Kiểm tra các ước lẻ từ 3
    for (let i = 3; i * i <= temp; i += 2) {
        if (temp % i === 0) {
            factors.push(i);
            while (temp % i === 0) {
                temp /= i;
            }
        }
    }

    // Nếu temp > 1 thì temp là ước nguyên tố
    if (temp > 1) {
        factors.push(temp);
    }

    return factors;
}

/**
 * Tính giá trị hàm Euler φ(n)
 * φ(n) = n * ∏(1 - 1/p) cho tất cả các ước nguyên tố p của n
 * @param n Số cần tính hàm Euler
 * @returns Giá trị φ(n)
 */
export function eulerTotient(n: number): number {
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
 * Tính giá trị hàm Euler với các bước chi tiết
 * @param n Số cần tính hàm Euler
 * @returns Các bước tính toán và kết quả
 */
export function eulerTotientWithSteps(n: number): {
    steps: string[];
    primeFactors: number[];
    result: number;
} {
    const steps: string[] = [];

    if (n <= 0) {
        steps.push("Error: n phải > 0");
        return { steps, primeFactors: [], result: 0 };
    }

    steps.push(`Tính giá trị hàm Euler φ(${n})`);

    if (n === 1) {
        steps.push("φ(1) = 1 (định nghĩa đặc biệt)");
        return { steps, primeFactors: [], result: 1 };
    }

    const primeFactors = getPrimeFactors(n);
    steps.push(`Phân tích thừa số nguyên tố: ${n} = ${formatFactorization(n, primeFactors)}`);
    steps.push(`Các ước nguyên tố: ${primeFactors.join(", ")}`);

    steps.push("Công thức: φ(n) = n × ∏(1 - 1/p) cho tất cả ước nguyên tố p");

    let result = n;
    let formulaSteps: string[] = [`φ(${n}) = ${n}`];

    for (const p of primeFactors) {
        const before = result;
        result = result * (p - 1) / p;
        formulaSteps.push(`× (1 - 1/${p}) = ${before} × ${p - 1}/${p} = ${result}`);
    }

    steps.push("Tính toán:");
    steps.push(formulaSteps.join(" "));

    steps.push(`Kết quả: φ(${n}) = ${result}`);

    return { steps, primeFactors, result };
}

/**
 * Định dạng phân tích thừa số nguyên tố
 */
function formatFactorization(n: number, primeFactors: number[]): string {
    const factorization: string[] = [];

    for (const p of primeFactors) {
        let count = 0;
        let temp = n;
        while (temp % p === 0) {
            count++;
            temp /= p;
        }
        if (count === 1) {
            factorization.push(p.toString());
        } else {
            factorization.push(`${p}^${count}`);
        }
    }

    return factorization.join(" × ");
}
