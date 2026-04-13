// AES-128 Encryption/Decryption Implementation

// ==================== S-BOX AND INVERSE S-BOX ====================
const SBOX = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
  0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
  0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
  0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
  0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
  0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
  0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
  0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
  0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
  0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
  0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
  0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
  0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
  0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
  0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
];

const INV_SBOX = [
  0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
  0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
  0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
  0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
  0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
  0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
  0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
  0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
  0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
  0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
  0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
  0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
  0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
  0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
  0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
  0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d
];

const RCON = [
  0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a,
  0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39
];

// ==================== HELPER FUNCTIONS ====================

function RotWord(w: number): number {
  const byte1 = (w >>> 24) & 0xff;
  const byte234 = w & 0xffffff;
  return ((byte234 << 8) | byte1) >>> 0;
}

function SubWord(w: number): number {
  let result = 0;
  for (let i = 0; i < 4; i++) {
    const byte = (w >>> (24 - i * 8)) & 0xff;
    const subByte = SBOX[byte];
    result = (result << 8) | subByte;
  }
  return result >>> 0;
}

function XorRcon(w: number, j: number): number {
  const byte1 = (w >>> 24) & 0xff;
  const xorResult = (byte1 ^ RCON[j]) & 0xff;
  const byte234 = w & 0xffffff;
  return ((xorResult << 24) | byte234) >>> 0;
}

function KeyExpansion(key: number[]): number[] {
  const w: number[] = new Array(44);
  
  // First 4 words from key
  w[0] = key[0];
  w[1] = key[1];
  w[2] = key[2];
  w[3] = key[3];

  // Generate remaining 40 words
  for (let i = 4; i < 44; i++) {
    let temp = w[i - 1];
    
    if (i % 4 === 0) {
      temp = XorRcon(SubWord(RotWord(temp)), i / 4);
    }
    
    w[i] = (w[i - 4] ^ temp) >>> 0;
  }

  return w;
}

// ==================== STATE OPERATIONS ====================

function AddRoundKey(state: number[], w: number[], offset: number): number[] {
  const result = new Array(4);
  for (let i = 0; i < 4; i++) {
    result[i] = (state[i] ^ w[offset + i]) >>> 0;
  }
  return result;
}

function SubBytes(state: number[]): number[] {
  const result = new Array(4);
  for (let i = 0; i < 4; i++) {
    result[i] = SubWord(state[i]);
  }
  return result;
}

function ShiftRows(state: number[]): number[] {
  // Convert state array to 4x4 matrix (column-major)
  const s: number[][] = [];
  for (let c = 0; c < 4; c++) {
    s[c] = [
      (state[c] >>> 24) & 0xff,
      (state[c] >>> 16) & 0xff,
      (state[c] >>> 8) & 0xff,
      state[c] & 0xff
    ];
  }

  // Apply ShiftRows with circular shifts
  const t: number[][] = [[], [], [], []];
  
  for (let c = 0; c < 4; c++) {
    t[c][0] = s[c][0]; // row 0: no shift
  }
  for (let c = 0; c < 4; c++) {
    t[c][1] = s[(c + 1) % 4][1]; // row 1: shift left 1
  }
  for (let c = 0; c < 4; c++) {
    t[c][2] = s[(c + 2) % 4][2]; // row 2: shift left 2
  }
  for (let c = 0; c < 4; c++) {
    t[c][3] = s[(c + 3) % 4][3]; // row 3: shift left 3
  }

  // Convert back to state array
  const result = new Array(4);
  for (let c = 0; c < 4; c++) {
    result[c] = (t[c][0] << 24) | (t[c][1] << 16) | (t[c][2] << 8) | t[c][3];
    result[c] = result[c] >>> 0;
  }

  return result;
}

function Nhan2(w: number): number {
  let result = w << 1;
  if (w & 0x80) {
    result ^= 0x1b;
  }
  return result & 0xff;
}

function Nhan3(w: number): number {
  return (w ^ Nhan2(w)) & 0xff;
}

function Nhan9(w: number): number {
  let result = (w << 3) ^ w;
  if (result > (256 << 2)) result ^= 0x11b << 2;
  if (result > (256 << 1)) result ^= 0x11b << 1;
  if (result > 256) result ^= 0x11b;
  return result & 0xff;
}

function NhanB(w: number): number {
  let result = (w << 3) ^ (w << 1) ^ w;
  if (result > (256 << 2)) result ^= 0x11b << 2;
  if (result > (256 << 1)) result ^= 0x11b << 1;
  if (result > 256) result ^= 0x11b;
  return result & 0xff;
}

function NhanD(w: number): number {
  let result = (w << 3) ^ (w << 2) ^ w;
  if (result > (256 << 2)) result ^= 0x11b << 2;
  if (result > (256 << 1)) result ^= 0x11b << 1;
  if (result > 256) result ^= 0x11b;
  return result & 0xff;
}

function NhanE(w: number): number {
  let result = (w << 3) ^ (w << 2) ^ (w << 1);
  if (result > (256 << 2)) result ^= 0x11b << 2;
  if (result > (256 << 1)) result ^= 0x11b << 1;
  if (result > 256) result ^= 0x11b;
  return result & 0xff;
}

function NhanCot(w: number): number {
  const byte1 = (w >>> 24) & 0xff;
  const byte2 = (w >>> 16) & 0xff;
  const byte3 = (w >>> 8) & 0xff;
  const byte4 = w & 0xff;

  const kq1 = Nhan2(byte1) ^ Nhan3(byte2) ^ byte3 ^ byte4;
  const kq2 = byte1 ^ Nhan2(byte2) ^ Nhan3(byte3) ^ byte4;
  const kq3 = byte1 ^ byte2 ^ Nhan2(byte3) ^ Nhan3(byte4);
  const kq4 = Nhan3(byte1) ^ byte2 ^ byte3 ^ Nhan2(byte4);

  return ((kq1 << 24) | (kq2 << 16) | (kq3 << 8) | kq4) >>> 0;
}

function InvNhanCot(w: number): number {
  const byte1 = (w >>> 24) & 0xff;
  const byte2 = (w >>> 16) & 0xff;
  const byte3 = (w >>> 8) & 0xff;
  const byte4 = w & 0xff;

  const kq1 = NhanE(byte1) ^ NhanB(byte2) ^ NhanD(byte3) ^ Nhan9(byte4);
  const kq2 = Nhan9(byte1) ^ NhanE(byte2) ^ NhanB(byte3) ^ NhanD(byte4);
  const kq3 = NhanD(byte1) ^ Nhan9(byte2) ^ NhanE(byte3) ^ NhanB(byte4);
  const kq4 = NhanB(byte1) ^ NhanD(byte2) ^ Nhan9(byte3) ^ NhanE(byte4);

  return ((kq1 << 24) | (kq2 << 16) | (kq3 << 8) | kq4) >>> 0;
}

function MixColumns(state: number[]): number[] {
  const result = new Array(4);
  for (let i = 0; i < 4; i++) {
    result[i] = NhanCot(state[i]);
  }
  return result;
}

function InvSubBytes(state: number[]): number[] {
  const result = new Array(4);
  for (let i = 0; i < 4; i++) {
    let word = 0;
    for (let j = 0; j < 4; j++) {
      const byte = (state[i] >>> (24 - j * 8)) & 0xff;
      const invSubByte = INV_SBOX[byte];
      word = (word << 8) | invSubByte;
    }
    result[i] = word >>> 0;
  }
  return result;
}

function InvShiftRows(state: number[]): number[] {
  // Convert state array to 4x4 matrix (column-major)
  const s: number[][] = [];
  for (let c = 0; c < 4; c++) {
    s[c] = [
      (state[c] >>> 24) & 0xff,
      (state[c] >>> 16) & 0xff,
      (state[c] >>> 8) & 0xff,
      state[c] & 0xff
    ];
  }

  // Apply InvShiftRows (reverse circular shifts)
  const t: number[][] = [[], [], [], []];
  
  for (let c = 0; c < 4; c++) {
    t[c][0] = s[c][0]; // row 0: no shift
  }
  for (let c = 0; c < 4; c++) {
    t[c][1] = s[(c + 3) % 4][1]; // row 1: shift right 1
  }
  for (let c = 0; c < 4; c++) {
    t[c][2] = s[(c + 2) % 4][2]; // row 2: shift right 2
  }
  for (let c = 0; c < 4; c++) {
    t[c][3] = s[(c + 1) % 4][3]; // row 3: shift right 3
  }

  // Convert back to state array
  const result = new Array(4);
  for (let c = 0; c < 4; c++) {
    result[c] = (t[c][0] << 24) | (t[c][1] << 16) | (t[c][2] << 8) | t[c][3];
    result[c] = result[c] >>> 0;
  }

  return result;
}

function InvMixColumns(state: number[]): number[] {
  const result = new Array(4);
  for (let i = 0; i < 4; i++) {
    result[i] = InvNhanCot(state[i]);
  }
  return result;
}

// ==================== AES ENCRYPTION/DECRYPTION ====================

export function aesEncrypt(plaintext: number[], key: number[]): number[] {
  const w = KeyExpansion(key);
  let state = AddRoundKey(plaintext, w, 0);

  // 9 main rounds
  for (let round = 1; round <= 9; round++) {
    state = SubBytes(state);
    state = ShiftRows(state);
    state = MixColumns(state);
    state = AddRoundKey(state, w, round * 4);
  }

  // Final round (no MixColumns)
  state = SubBytes(state);
  state = ShiftRows(state);
  state = AddRoundKey(state, w, 40);

  return state;
}

export function aesDecrypt(ciphertext: number[], key: number[]): number[] {
  const w = KeyExpansion(key);
  let state = AddRoundKey(ciphertext, w, 40);

  // 9 main rounds (in reverse)
  for (let round = 9; round >= 1; round--) {
    state = InvShiftRows(state);
    state = InvSubBytes(state);
    state = AddRoundKey(state, w, round * 4);
    state = InvMixColumns(state);
  }

  // Final round (no InvMixColumns)
  state = InvShiftRows(state);
  state = InvSubBytes(state);
  state = AddRoundKey(state, w, 0);

  return state;
}

// ==================== HEX CONVERSION ====================

export function hexStringToNumbers(hex: string): number[] {
  const upper = hex.toUpperCase().padStart(32, '0');
  const nums: number[] = [];
  for (let i = 0; i < 4; i++) {
    nums[i] = parseInt(upper.substring(i * 8, (i + 1) * 8), 16);
  }
  return nums;
}

export function numbersToHexString(nums: number[]): string {
  let result = '';
  for (let i = 0; i < 4; i++) {
    const hex = (nums[i] >>> 0).toString(16).toUpperCase().padStart(8, '0');
    result += hex;
  }
  return result;
}

export function aesEncryptHex(plaintext: string, key: string): string {
  const m = hexStringToNumbers(plaintext);
  const k = hexStringToNumbers(key);
  const c = aesEncrypt(m, k);
  return numbersToHexString(c);
}

export function aesDecryptHex(ciphertext: string, key: string): string {
  const c = hexStringToNumbers(ciphertext);
  const k = hexStringToNumbers(key);
  const m = aesDecrypt(c, k);
  return numbersToHexString(m);
}

// ==================== DEBUG FUNCTIONS FOR STEP VISUALIZATION ====================

export interface KeyExpansionStep {
  stepNum: number;
  w3: string;
  rotw: string;
  subw: string;
  rcon: number;
  xcsw: string;
  w0: string;
  w1: string;
  w2: string;
  w3Final: string;
  w4: string;
  w5: string;
  w6: string;
  w7: string;
}

export interface EncryptionRound {
  roundNum: number;
  inputState: string;
  afterSubByte: string;
  afterShiftRows: string;
  afterMixColumns: string;
  roundKey: string;
  outputState: string;
}

export interface AESDebugSteps {
  key: string;
  plaintext: string;
  keyExpansion: KeyExpansionStep[];
  encryptionRounds: EncryptionRound[];
  ciphertext: string;
}

function numToHex(n: number): string {
  return n.toString(16).toUpperCase().padStart(8, '0');
}

function stateToHex(state: number[]): string {
  return state.map(w => numToHex(w)).join('');
}

export function aesEncryptDebug(plaintextHex: string, keyHex: string): AESDebugSteps {
  const plaintext = hexStringToNumbers(plaintextHex);
  const key = hexStringToNumbers(keyHex);
  const w = KeyExpansion(key);
  
  // Key Expansion Debug
  const keyExpSteps: KeyExpansionStep[] = [];
  for (let i = 0; i < 10; i++) {
    const baseIdx = i * 4;
    const w3Val = w[baseIdx + 3];
    const rotw = RotWord(w3Val);
    const subw = SubWord(rotw);
    const xcsw = XorRcon(subw, i + 1);
    
    keyExpSteps.push({
      stepNum: i + 1,
      w3: numToHex(w3Val),
      rotw: numToHex(rotw),
      subw: numToHex(subw),
      rcon: RCON[i + 1],
      xcsw: numToHex(xcsw),
      w0: numToHex(w[baseIdx]),
      w1: numToHex(w[baseIdx + 1]),
      w2: numToHex(w[baseIdx + 2]),
      w3Final: numToHex(w[baseIdx + 3]),
      w4: numToHex(w[baseIdx + 4]),
      w5: numToHex(w[baseIdx + 5]),
      w6: numToHex(w[baseIdx + 6]),
      w7: numToHex(w[baseIdx + 7])
    });
  }

  // Encryption Debug
  const encRounds: EncryptionRound[] = [];
  let state = AddRoundKey(plaintext, w, 0);
  
  // Round 0 (initial state after AddRoundKey)
  encRounds.push({
    roundNum: 0,
    inputState: stateToHex(plaintext),
    afterSubByte: stateToHex(plaintext),
    afterShiftRows: stateToHex(plaintext),
    afterMixColumns: stateToHex(plaintext),
    roundKey: stateToHex([w[0], w[1], w[2], w[3]]),
    outputState: stateToHex(state)
  });

  // Rounds 1-9
  for (let round = 1; round <= 9; round++) {
    const inputState = state.slice();
    state = SubBytes(state);
    const afterSubByte = state.slice();
    state = ShiftRows(state);
    const afterShiftRows = state.slice();
    state = MixColumns(state);
    const afterMixColumns = state.slice();
    state = AddRoundKey(state, w, round * 4);
    
    encRounds.push({
      roundNum: round,
      inputState: stateToHex(inputState),
      afterSubByte: stateToHex(afterSubByte),
      afterShiftRows: stateToHex(afterShiftRows),
      afterMixColumns: stateToHex(afterMixColumns),
      roundKey: stateToHex([w[round * 4], w[round * 4 + 1], w[round * 4 + 2], w[round * 4 + 3]]),
      outputState: stateToHex(state)
    });
  }

  // Round 10 (final)
  const inputState10 = state.slice();
  state = SubBytes(state);
  const afterSubByte10 = state.slice();
  state = ShiftRows(state);
  const afterShiftRows10 = state.slice();
  state = AddRoundKey(state, w, 40);
  
  encRounds.push({
    roundNum: 10,
    inputState: stateToHex(inputState10),
    afterSubByte: stateToHex(afterSubByte10),
    afterShiftRows: stateToHex(afterShiftRows10),
    afterMixColumns: stateToHex(afterShiftRows10),
    roundKey: stateToHex([w[40], w[41], w[42], w[43]]),
    outputState: stateToHex(state)
  });

  return {
    key: keyHex,
    plaintext: plaintextHex,
    keyExpansion: keyExpSteps,
    encryptionRounds: encRounds,
    ciphertext: stateToHex(state)
  };
}
