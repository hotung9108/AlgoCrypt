export interface EuclideanTableRow {
    q: number;
    a1: number;
    a2: number;
    a3: number;
    b1: number;
    b2: number;
    b3: number;
}

/**
 * Tìm nghịch đảo modulo: x = a^(-1) mod n
 * Sử dụng Extended Euclidean Algorithm
 * @param a Số cần tìm nghịch đảo
 * @param n Modulo
 * @returns Giá trị nghịch đảo hoặc -1 nếu không tồn tại
 */
export function modularInverse(a: number, n: number): number {
    const result = extendedGCD(a, n);
    
    if (result.gcd !== 1) {
        return -1; // Nghịch đảo không tồn tại nếu gcd(a, n) ≠ 1
    }
    
    return (result.x % n + n) % n; // Đảm bảo kết quả dương
}

/**
 * Extended Euclidean Algorithm with table data
 * Tìm x, y sao cho: a*x + n*y = gcd(a, n)
 */
export function extendedGCDWithTable(a: number, n: number): { 
    gcd: number; 
    x: number; 
    y: number;
    tableRows: EuclideanTableRow[];
} {
    const tableRows: EuclideanTableRow[] = [];
    
    let a1 = 1, a2 = 0, a3 = a;
    let b1 = 0, b2 = 1, b3 = n;
    
    // Initial row
    tableRows.push({
        q: 0,
        a1: a1,
        a2: a2,
        a3: a3,
        b1: b1,
        b2: b2,
        b3: b3
    });
    
    while (b3 !== 0) {
        const q = Math.floor(a3 / b3);
        
        // Calculate new values: Bi_new = Ai_old - Q * Bi_old
        const newA1 = b1;
        const newA2 = b2;
        const newA3 = b3;
        const newB1 = a1 - q * b1;
        const newB2 = a2 - q * b2;
        const newB3 = a3 - q * b3;
        
        tableRows.push({
            q: q,
            a1: newA1,
            a2: newA2,
            a3: newA3,
            b1: newB1,
            b2: newB2,
            b3: newB3
        });
        
        a1 = newA1;
        a2 = newA2;
        a3 = newA3;
        b1 = newB1;
        b2 = newB2;
        b3 = newB3;
    }
    
    return { gcd: a3, x: a1, y: a2, tableRows };
}

/**
 * Extended Euclidean Algorithm
 * Tìm x, y sao cho: a*x + n*y = gcd(a, n)
 */
function extendedGCD(a: number, n: number): { gcd: number; x: number; y: number } {
    if (a === 0) {
        return { gcd: n, x: 0, y: 1 };
    }
    
    const { gcd, x: x1, y: y1 } = extendedGCD(n % a, a);
    const x = y1 - Math.floor(n / a) * x1;
    const y = x1;
    
    return { gcd, x, y };
}

/**
 * Tìm nghịch đảo modulo với các bước tính toán chi tiết
 * @param a Số cần tìm nghịch đảo
 * @param n Modulo
 * @returns Các bước tính toán, bảng dữ liệu và kết quả
 */
export function modularInverseWithSteps(a: number, n: number): { steps: string[]; result: number; tableRows: EuclideanTableRow[] } {
    const steps: string[] = [];
    
    steps.push(`Finding modular inverse: x = ${a}^(-1) mod ${n}`);
    steps.push(`Using Extended Euclidean Algorithm to find gcd(${a}, ${n})`);
    
    const { gcd, x, tableRows } = extendedGCDWithTable(a, n);
    
    if (gcd !== 1) {
        steps.push(`gcd(${a}, ${n}) = ${gcd} ≠ 1`);
        steps.push(`Modular inverse does not exist (a and n must be coprime)`);
        return { steps, result: -1, tableRows };
    }
    
    const result = (x % n + n) % n;
    
    steps.push(`Solution: ${a} * x + ${n} * y = ${gcd}`);
    steps.push(`x = ${x}`);
    steps.push(`Adjusting to positive result: x ≡ ${result} (mod ${n})`);
    steps.push(`Verification: ${a} * ${result} mod ${n} = ${(a * result) % n}`);
    steps.push(`Modular inverse found: x = ${result}`);
    
    return { steps, result, tableRows };
}
