// DES Encryption/Decryption Implementation
// Based on the correct DES algorithm logic

// Helper functions to work with bits
function getbit(K1: number, i: number): number {
  const b = K1 >>> (32 - i);
  return b & 0x01;
}

function getbit28(K1: number, i: number): number {
  const b = K1 >>> (28 - i);
  return b & 0x01;
}

// PC1 Permutation for Key scheduling
function PC1CD(K1: number, K2: number, chiso1: number, chiso2: number): number {
  const pc1 = [
    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37,
    29, 21, 13, 5, 28, 20, 12, 4
  ];

  let pc1k1 = 0;
  for (let i = chiso1; i < chiso2; i++) {
    let vitri: number;
    let bit: number;

    if (pc1[i] > 32) {
      vitri = pc1[i] - 32;
      bit = getbit(K2, vitri);
    } else {
      vitri = pc1[i];
      bit = getbit(K1, vitri);
    }

    const b = bit & 0x01;
    pc1k1 = (pc1k1 << 1) | b;
  }

  return pc1k1 >>> 0;
}

// Circular left shift for 28-bit values
function ShiftLeft(C0: number, s: number): number {
  const sbit = (C0 >>> (28 - s)) & ((1 << s) - 1);
  const bit28s = (C0 << s) & 0x0FFFFFFF;
  const C1 = bit28s | sbit;
  return C1 >>> 0;
}

// PC2 Permutation for key compression
function KPC2(C1: number, D1: number, chiso1: number, chiso2: number): number {
  const pc2 = [
    14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4,
    26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40,
    51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32
  ];

  let pc2k = 0;
  for (let i = chiso1; i < chiso2; i++) {
    let vitri: number;
    let bit: number;

    if (pc2[i] > 28) {
      vitri = pc2[i] - 28;
      bit = getbit28(D1, vitri);
    } else {
      vitri = pc2[i];
      bit = getbit28(C1, vitri);
    }

    const b = bit & 0x01;
    pc2k = (pc2k << 1) | b;
  }

  return pc2k >>> 0;
}

// Generate round keys
function GenKey(K1: number, K2: number): [number[], number[]] {
  const C0 = PC1CD(K1, K2, 0, 28);
  const D0 = PC1CD(K1, K2, 28, 56);
  const s = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

  const key1: number[] = new Array(16);
  const key2: number[] = new Array(16);

  let C = C0;
  let D = D0;

  for (let i = 0; i < 16; i++) {
    C = ShiftLeft(C, s[i]);
    D = ShiftLeft(D, s[i]);
    key1[i] = KPC2(C, D, 0, 24);
    key2[i] = KPC2(C, D, 24, 48);
  }

  return [key1, key2];
}

// Initial Permutation
function IPM(M1: number, M2: number, chiso1: number, chiso2: number): number {
  const IP = [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7
  ];

  let ipm1 = 0;
  for (let i = chiso1; i < chiso2; i++) {
    let vitri: number;
    let bit: number;

    if (IP[i] > 32) {
      vitri = IP[i] - 32;
      bit = getbit(M2, vitri);
    } else {
      vitri = IP[i];
      bit = getbit(M1, vitri);
    }

    const b = bit & 0x01;
    ipm1 = (ipm1 << 1) | b;
  }

  return ipm1 >>> 0;
}

// Expansion function E
function ER0(R0: number, chiso1: number, chiso2: number): number {
  const E = [
    32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1
  ];

  let er1 = 0;
  for (let i = chiso1; i < chiso2; i++) {
    const vitri = E[i];
    const bit = getbit(R0, vitri);
    const b = bit & 0x01;
    er1 = (er1 << 1) | b;
  }

  return er1 >>> 0;
}

// S-Box substitution
function SubByte(A1: number, A2: number): number {
  const S1 = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13];
  const S2 = [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9];
  const S3 = [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12];
  const S4 = [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14];
  const S5 = [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3];
  const S6 = [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13];
  const S7 = [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12];
  const S8 = [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11];

  const S = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const chiso = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Process first 4 groups (6 bits each from A1)
  for (let i = 1; i <= 4; i++) {
    const b6i = (A1 >>> (24 - 6 * i)) & 0x3f;
    const bit1 = (b6i >>> 5) & 0x01;
    const bit6 = b6i & 0x01;
    const row = (bit1 << 1) | bit6;
    const col = (b6i >>> 1) & 0x0f;
    chiso[i] = row * 16 + col;
  }

  // Process last 4 groups (6 bits each from A2)
  for (let i = 5; i <= 8; i++) {
    const b6i = (A2 >>> (24 - 6 * (i - 4))) & 0x3f;
    const bit1 = (b6i >>> 5) & 0x01;
    const bit6 = b6i & 0x01;
    const row = (bit1 << 1) | bit6;
    const col = (b6i >>> 1) & 0x0f;
    chiso[i] = row * 16 + col;
  }

  // Look up S-boxes
  S[1] = S1[chiso[1]];
  S[2] = S2[chiso[2]];
  S[3] = S3[chiso[3]];
  S[4] = S4[chiso[4]];
  S[5] = S5[chiso[5]];
  S[6] = S6[chiso[6]];
  S[7] = S7[chiso[7]];
  S[8] = S8[chiso[8]];

  // Concatenate 8 4-bit values into 32-bit B
  let B = 0;
  for (let i = 1; i <= 8; i++) {
    B = (B << 4) | S[i];
  }

  return B >>> 0;
}

// P-Box permutation
function HoanviP(B: number): number {
  const P = [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10,
    2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25
  ];

  let fp = 0;
  for (let i = 0; i < 32; i++) {
    const vitri = P[i];
    const bit = getbit(B, vitri);
    const b = bit & 0x01;
    fp = (fp << 1) | b;
  }

  return fp >>> 0;
}

// F function (core DES round function)
function F(_L0: number, R0: number, key1: number, key2: number): number {
  const ER01 = ER0(R0, 0, 24);
  const ER02 = ER0(R0, 24, 48);
  const A1 = key1 ^ ER01;
  const A2 = key2 ^ ER02;
  const B = SubByte(A1, A2);
  const FP = HoanviP(B);
  return FP;
}

// Inverse of initial permutation
function HoanviIP_1(M1: number, M2: number, chiso1: number, chiso2: number): number {
  const IP1 = [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25
  ];

  let ipm1 = 0;
  for (let i = chiso1; i < chiso2; i++) {
    let vitri: number;
    let bit: number;

    if (IP1[i] > 32) {
      vitri = IP1[i] - 32;
      bit = getbit(M2, vitri);
    } else {
      vitri = IP1[i];
      bit = getbit(M1, vitri);
    }

    const b = bit & 0x01;
    ipm1 = (ipm1 << 1) | b;
  }

  return ipm1 >>> 0;
}

// DES Encryption
export function desEncrypt(M1: number, M2: number, K1: number, K2: number): [number, number] {
  const [key1, key2] = GenKey(K1, K2);

  // Initial Permutation
  let L0 = IPM(M1, M2, 0, 32);
  let R0 = IPM(M1, M2, 32, 64);

  // 16 rounds
  for (let i = 0; i < 16; i++) {
    const L1 = R0;
    const FP = F(L0, R0, key1[i], key2[i]);
    const R1 = L0 ^ FP;
    L0 = L1;
    R0 = R1;
  }

  // Final permutation (note: R1 and L1 are swapped)
  const C1 = HoanviIP_1(R0, L0, 0, 32);
  const C2 = HoanviIP_1(R0, L0, 32, 64);

  return [C1, C2];
}

// DES Decryption
export function desDecrypt(M1: number, M2: number, K1: number, K2: number): [number, number] {
  const [key1, key2] = GenKey(K1, K2);

  // Initial Permutation
  let L0 = IPM(M1, M2, 0, 32);
  let R0 = IPM(M1, M2, 32, 64);

  // 16 rounds in reverse
  for (let i = 15; i >= 0; i--) {
    const L1 = R0;
    const FP = F(L0, R0, key1[i], key2[i]);
    const R1 = L0 ^ FP;
    L0 = L1;
    R0 = R1;
  }

  // Final permutation (note: R1 and L1 are swapped)
  const C1 = HoanviIP_1(R0, L0, 0, 32);
  const C2 = HoanviIP_1(R0, L0, 32, 64);

  return [C1, C2];
}

// Helper function to convert hex string to number pair
export function hexStringToNumbers(hex: string): [number, number] {
  const upper = hex.toUpperCase().padStart(16, '0');
  const num1 = parseInt(upper.substring(0, 8), 16);
  const num2 = parseInt(upper.substring(8, 16), 16);
  return [num1, num2];
}

// Helper function to convert number pair to hex string
export function numbersToHexString(num1: number, num2: number): string {
  const hex1 = (num1 >>> 0).toString(16).toUpperCase().padStart(8, '0');
  const hex2 = (num2 >>> 0).toString(16).toUpperCase().padStart(8, '0');
  return hex1 + hex2;
}

// Encrypt hex string to hex string
export function desEncryptHex(plaintext: string, key: string): string {
  const [m1, m2] = hexStringToNumbers(plaintext);
  const [k1, k2] = hexStringToNumbers(key);
  const [c1, c2] = desEncrypt(m1, m2, k1, k2);
  return numbersToHexString(c1, c2);
}

// Decrypt hex string to hex string
export function desDecryptHex(ciphertext: string, key: string): string {
  const [m1, m2] = hexStringToNumbers(ciphertext);
  const [k1, k2] = hexStringToNumbers(key);
  const [c1, c2] = desDecrypt(m1, m2, k1, k2);
  return numbersToHexString(c1, c2);
}
