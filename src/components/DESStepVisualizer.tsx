import React, { useState } from 'react';
import type { DESDebugSteps } from '@/algorithms/desEncrypt';
import { PermutationTableDisplay } from './PermutationTableDisplay';

interface DESStepVisualizerProps {
  steps: DESDebugSteps;
}

// PC1 Permutation Table (56 elements)
const PC1 = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2,
  59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39,
  31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37,
  29, 21, 13, 5, 28, 20, 12, 4
];

// PC2 Permutation Table (48 elements)
const PC2 = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4,
  26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40,
  51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32
];

// IP Permutation Table (64 elements)
const IP = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
  62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
  57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
  61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7
];

// E Expansion Table (48 elements)
const E = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13,
  12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
  24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1
];

// P Permutation Table (32 elements)
const P = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10,
  2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25
];

// Helper: Convert hex to binary
const hexToBinary = (hex: string): string => {
  return hex
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');
};

// Helper: Convert hex string (any length) to binary
const hexStringToBinary = (hex: string): string => {
  return hex.split('').map(c => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
};

export const DESStepVisualizer: React.FC<DESStepVisualizerProps> = ({ steps }) => {
  const [expandedRound, setExpandedRound] = useState<number | null>(null);
  const [expandedKeyRound, setExpandedKeyRound] = useState<number | null>(null);

  const keyBinary = hexToBinary(steps.key);
  const inputBinary = hexToBinary(steps.input);

  return (
    <div className="space-y-6">
      {/* HEX TO BINARY CONVERSION */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-2xl text-slate-100 mb-6 text-indigo-300">
          📊 CHUYỂN ĐỔI HEX → BINARY BITS
        </h3>

        {/* Key Conversion */}
        <div className="mb-6">
          <h4 className="font-bold text-lg text-slate-100 mb-4 text-indigo-400">🔑 Khóa (Key)</h4>
          <div className="bg-slate-950/50 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-2">Hex (16 ký tự):</p>
              <div className="bg-slate-900/50 rounded p-3 font-mono text-sm text-orange-300 break-all border border-slate-700">
                {steps.key}
              </div>
            </div>
            <div className="text-center text-slate-500 text-sm">↓ HEX → BINARY ↓</div>
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-2">Binary (64 bits):</p>
              <div className="overflow-x-auto rounded border border-slate-700">
                <div 
                  className="grid gap-1 bg-slate-900/50 rounded p-3"
                  style={{ gridTemplateColumns: 'repeat(64, minmax(28px, 28px))' }}
                >
                  {keyBinary.split('').map((bit, idx) => (
                    <div
                      key={`keybin-${idx}`}
                      className="bg-slate-800/50 border border-slate-700 rounded p-1 text-center text-xs font-bold text-indigo-300 hover:bg-slate-700 transition-colors"
                      title={`Bit ${idx}`}
                    >
                      <div className="text-[8px] text-slate-500">{idx}</div>
                      <div>{bit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input/Plaintext Conversion */}
        <div>
          <h4 className="font-bold text-lg text-slate-100 mb-4 text-indigo-400">📝 Bản Rõ (Plaintext)</h4>
          <div className="bg-slate-950/50 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-2">Hex (16 ký tự):</p>
              <div className="bg-slate-900/50 rounded p-3 font-mono text-sm text-cyan-300 break-all border border-slate-700">
                {steps.input}
              </div>
            </div>
            <div className="text-center text-slate-500 text-sm">↓ HEX → BINARY ↓</div>
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-2">Binary (64 bits):</p>
              <div className="overflow-x-auto rounded border border-slate-700">
                <div 
                  className="grid gap-1 bg-slate-900/50 rounded p-3"
                  style={{ gridTemplateColumns: 'repeat(64, minmax(28px, 28px))' }}
                >
                  {inputBinary.split('').map((bit, idx) => (
                    <div
                      key={`inputbin-${idx}`}
                      className="bg-slate-800/50 border border-slate-700 rounded p-1 text-center text-xs font-bold text-cyan-300 hover:bg-slate-700 transition-colors"
                      title={`Bit ${idx}`}
                    >
                      <div className="text-[8px] text-slate-500">{idx}</div>
                      <div>{bit}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 1: KEY GENERATION */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-2xl text-slate-100 mb-6 text-purple-300">
          PHẦN 1: SINH KHÓA Ki
        </h3>

        {/* Step 1: PC1 Permutation */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
          <h4 className="font-bold text-lg text-slate-100 mb-4 text-cyan-400">
            Bước 1: Hoán vị PC1 đối với khóa K
          </h4>
          <div className="bg-slate-950/50 rounded-xl p-4 space-y-2">
            <div className="font-mono text-sm">
              <p className="text-slate-400">Input: K = <span className="text-orange-300">{steps.key}</span></p>
              <p className="text-slate-400">PC1 (xem tài liệu mục 3.2 DES)</p>
              <p className="text-cyan-300 mt-2">Output:</p>
              <p className="text-slate-200">C0 = <span className="text-green-400 font-bold">{steps.step1.C0}</span></p>
              <p className="text-slate-200">D0 = <span className="text-green-400 font-bold">{steps.step1.D0}</span></p>
            </div>
          </div>
          
          {/* PC1 Table Display */}
          <PermutationTableDisplay
            title="PC1 Permutation Table (Loại bỏ 8 bit parity, chọn 56 bits)"
            table={PC1}
            cols={8}
            description="PC1 chọn 56 bits từ 64 bits khóa gốc và chia thành C0 (28 bits) và D0 (28 bits)"
            inputBits={keyBinary}
            outputBits={hexStringToBinary(steps.step1.C0) + hexStringToBinary(steps.step1.D0)}
          />
        </div>

        {/* Steps 2-3: Key Generation Rounds */}
        <div className="space-y-3">
          <h4 className="font-bold text-lg text-slate-100 text-cyan-400 mb-4">
            Bước 2-3: Dịch Vòng và Tính Khóa Ki (16 Rounds)
          </h4>
          {steps.keyGenSteps.map((keyStep, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <button
                onClick={() => setExpandedKeyRound(expandedKeyRound === index ? null : index)}
                className="w-full p-4 text-left hover:bg-slate-800/30 transition-colors flex items-center justify-between"
              >
                <span className="font-bold text-lg text-slate-100">
                  Vòng {keyStep.round}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-sm">Shift: {keyStep.shift}</span>
                  <span className="text-sm">K{keyStep.round} = {keyStep.K.slice(0, 8)}...</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedKeyRound === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {expandedKeyRound === index && (
                <div className="bg-slate-950/30 border-t border-slate-800 p-6 space-y-4">
                  {/* Step 2 */}
                  <div>
                    <p className="text-slate-400 text-sm font-semibold mb-2">
                      Bước 2: Dịch vòng trái (Left Shift)
                    </p>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <p className="font-mono text-xs text-slate-300">
                        C{keyStep.round - 1} = <span className="text-indigo-300">{keyStep.C_prev}</span> → Shift {keyStep.shift} → C{keyStep.round} = <span className="text-cyan-300">{keyStep.C}</span>
                      </p>
                      <p className="font-mono text-xs text-slate-300 mt-2">
                        D{keyStep.round - 1} = <span className="text-indigo-300">{keyStep.D_prev}</span> → Shift {keyStep.shift} → D{keyStep.round} = <span className="text-cyan-300">{keyStep.D}</span>
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <p className="text-slate-400 text-sm font-semibold mb-2">
                      Bước 3: Tính khóa K{keyStep.round} (PC2 Permutation)
                    </p>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                      <p className="font-mono text-xs text-slate-300">
                        Input: C{keyStep.round} = <span className="text-indigo-300">{keyStep.C}</span>, D{keyStep.round} = <span className="text-indigo-300">{keyStep.D}</span>
                      </p>
                      <p className="font-mono text-xs text-slate-300 mt-2">
                        PC2 (xem tài liệu mục 3.2 DES)
                      </p>
                      <p className="font-mono text-xs text-slate-300 mt-2">
                        Output: K{keyStep.round} = <span className="text-green-400 font-bold">{keyStep.K}</span>
                      </p>
                    </div>
                    
                    {/* PC2 Table Display */}
                    <PermutationTableDisplay
                      title="PC2 Permutation Table (Nén 56 bits thành 48 bits)"
                      table={PC2}
                      cols={8}
                      description="PC2 chọn 48 bits từ 56 bits C+D và tạo khóa vòng Ki"
                      inputBits={hexStringToBinary(keyStep.C) + hexStringToBinary(keyStep.D)}
                      outputBits={hexStringToBinary(keyStep.K)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PART 2: ENCRYPTION */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
        <h3 className="font-bold text-2xl text-slate-100 mb-6 text-blue-300">
          PHẦN 2: MÃ HÓA
        </h3>

        {/* Step 4: Initial Permutation */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
          <h4 className="font-bold text-lg text-slate-100 mb-4 text-blue-400">
            Bước 4: Hoán vị ban đầu (Initial Permutation - IP)
          </h4>
          <div className="bg-slate-950/50 rounded-xl p-4 space-y-2">
            <div className="font-mono text-sm">
              <p className="text-slate-400">Input: M = {steps.input}</p>
              <p className="text-blue-300 mt-2">Output:</p>
              <p className="text-slate-200">L0 = <span className="text-green-400 font-bold">{steps.step4.L0}</span></p>
              <p className="text-slate-200">R0 = <span className="text-green-400 font-bold">{steps.step4.R0}</span></p>
            </div>
          </div>
          
          {/* IP Table Display */}
          <PermutationTableDisplay
            title="IP Permutation Table (Hoán vị ban đầu)"
            table={IP}
            cols={8}
            description="IP sắp xếp lại 64 bits bản rõ thành L0 (32 bits) và R0 (32 bits)"
            inputBits={inputBinary}
            outputBits={hexStringToBinary(steps.step4.L0) + hexStringToBinary(steps.step4.R0)}
          />
        </div>

        {/* Rounds Details */}
        <div className="space-y-3">
          <h4 className="font-bold text-lg text-slate-100 text-blue-400 mb-4">
            Bước 5-10: Các Vòng Lặp (16 Rounds)
          </h4>
          {steps.steps.map((step, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <button
                onClick={() => setExpandedRound(expandedRound === index ? null : index)}
                className="w-full p-4 text-left hover:bg-slate-800/30 transition-colors flex items-center justify-between"
              >
                <span className="font-bold text-lg text-slate-100">
                  Vòng {step.round}
                </span>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-sm">Li = {step.L.slice(0, 4)}...</span>
                  <span className="text-sm">Ri = {step.R.slice(0, 4)}...</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${expandedRound === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>

              {expandedRound === index && (
                <div className="bg-slate-950/30 border-t border-slate-800 p-6 space-y-4">
                {/* Step 5 */}
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-2">
                    Bước 5: Hàm mở rộng E[R{step.round - 1}]
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="font-mono text-xs text-slate-300">
                      Input: R{step.round - 1} = <span className="text-indigo-300">{step.R_prev}</span>
                    </p>
                    <p className="font-mono text-xs text-slate-300 mt-1">
                      Output: ER{step.round - 1} = <span className="text-green-400">{step.ER0}</span>
                    </p>
                  </div>
                  
                  {/* E Table Display */}
                  <PermutationTableDisplay
                    title="E Expansion Function (Mở rộng 32 bits thành 48 bits)"
                    table={E}
                    cols={8}
                    description="E mở rộng R thành 48 bits bằng cách lặp lại một số bit"
                    inputBits={hexStringToBinary(step.R_prev)}
                    outputBits={hexStringToBinary(step.ER0)}
                  />
                </div>

                {/* Step 6 */}
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-2">
                    Bước 6: XOR với khóa K{step.round}
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="font-mono text-xs text-slate-300">
                      ER{step.round - 1} XOR K{step.round} = <span className="text-green-400">{step.XORResult}</span>
                    </p>
                  </div>
                </div>

                {/* Step 7 */}
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-2">
                    Bước 7: Phép thế S-box
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="font-mono text-xs text-slate-300">
                      B = S(A) = <span className="text-green-400">{step.B}</span>
                    </p>
                  </div>
                </div>

                {/* Step 8 */}
                <div>
                  <p className="text-slate-400 text-sm font-semibold mb-2">
                    Bước 8: Hoán vị P
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <p className="font-mono text-xs text-slate-300">
                      F = P(B) = <span className="text-green-400">{step.F}</span>
                    </p>
                  </div>
                  
                  {/* P Table Display */}
                  <PermutationTableDisplay
                    title="P Permutation Function (Hoán vị sau S-box)"
                    table={P}
                    cols={8}
                    description="P sắp xếp lại 32 bits từ S-boxes để tạo F"
                    inputBits={hexStringToBinary(step.B)}
                    outputBits={hexStringToBinary(step.F)}
                  />
                </div>

                {/* Step 9/10 */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-slate-400 text-sm font-semibold mb-3">
                    Bước {step.round === 1 ? '9' : '10'}: Vòng lặp thứ {step.round}
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <p className="text-slate-300">
                      L{step.round} = R{step.round - 1} = <span className="text-cyan-400">{step.L}</span>
                    </p>
                    <p className="text-slate-300">
                      R{step.round} = L{step.round - 1} XOR F = <span className="text-cyan-400">{step.R}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          ))}
        </div>
      </div>

      {/* Step 11: Final Permutation */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <h4 className="font-bold text-lg text-slate-100 mb-4 text-green-400">
          Bước 11: Hoán vị cuối cùng (IP⁻¹)
        </h4>
        <div className="bg-slate-950/50 rounded-xl p-4">
          <div className="font-mono text-sm space-y-2">
            <p className="text-slate-400">
              Input: L16 = {steps.steps[15].L}, R16 = {steps.steps[15].R}
            </p>
            <p className="text-green-300 mt-3">Bản mã (Ciphertext):</p>
            <p className="text-emerald-400 font-bold text-lg">{steps.step11}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-2xl p-6">
        <h4 className="font-bold text-lg text-slate-100 mb-4">Tóm Tắt Kết Quả</h4>
        <div className="space-y-2 font-mono text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Bản rõ:</span>
            <span className="text-blue-300 font-bold">{steps.input}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Khóa:</span>
            <span className="text-blue-300 font-bold">{steps.key}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
            <span className="text-slate-400">Bản mã:</span>
            <span className="text-emerald-400 font-bold">{steps.step11}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
