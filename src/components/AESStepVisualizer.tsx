import React, { useState } from 'react';
import type { AESDebugSteps } from '@/algorithms/aesEncrypt';

interface AESStepVisualizerProps {
  steps: AESDebugSteps;
}

function hexToBinary(hex: string): string {
  return parseInt(hex, 16).toString(2).padStart(4, '0');
}

function hexStringToBinary(hex: string): string {
  let binary = '';
  for (let i = 0; i < hex.length; i++) {
    binary += hexToBinary(hex[i]);
  }
  return binary;
}

export const AESStepVisualizer: React.FC<AESStepVisualizerProps> = ({ steps }) => {
  const [activeSection, setActiveSection] = useState<'keyexp' | 'encryption'>('keyexp');
  const [selectedRound, setSelectedRound] = useState(0);

  const plainBinary = hexStringToBinary(steps.plaintext);
  const keyBinary = hexStringToBinary(steps.key);

  const round = activeSection === 'encryption' ? steps.encryptionRounds[selectedRound] : null;
  const keyExpStep = activeSection === 'keyexp' ? steps.keyExpansion[selectedRound] : null;

  return (
    <div className="space-y-8 bg-slate-950 rounded-3xl border border-slate-800 p-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">AES-128 Step-by-Step Visualization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/50 rounded-2xl p-6">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Input (Plaintext)</div>
            <div className="font-mono text-lg text-blue-300 break-all">{steps.plaintext}</div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key</div>
            <div className="font-mono text-lg text-green-300 break-all">{steps.key}</div>
          </div>
        </div>
      </div>

      {/* Section Toggle */}
      <div className="flex gap-4">
        <button
          onClick={() => { setActiveSection('keyexp'); setSelectedRound(0); }}
          className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
            activeSection === 'keyexp'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          PHẦN 1: Key Expansion
        </button>
        <button
          onClick={() => { setActiveSection('encryption'); setSelectedRound(0); }}
          className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
            activeSection === 'encryption'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          PHẦN 2: Encryption
        </button>
      </div>

      {/* PART 1: Key Expansion */}
      {activeSection === 'keyexp' && keyExpStep && (
        <div className="space-y-6">
          {/* Round Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">
              Select Round (K{selectedRound + 1}):
            </label>
            <div className="flex gap-2 flex-wrap">
              {steps.keyExpansion.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRound(idx)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    selectedRound === idx
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  K{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Key Expansion Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Step 1: Initial 4 words */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Step 1: Initial 4 Words</h3>
              <div className="space-y-3">
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w0</div>
                  <div className="font-mono text-sm text-blue-300">{keyExpStep.w0}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w1</div>
                  <div className="font-mono text-sm text-blue-300">{keyExpStep.w1}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w2</div>
                  <div className="font-mono text-sm text-blue-300">{keyExpStep.w2}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w3</div>
                  <div className="font-mono text-sm text-blue-300">{keyExpStep.w3}</div>
                </div>
              </div>
            </div>

            {/* Step 2-3: RotWord & SubWord */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Steps 2-3: RotWord & SubWord</h3>
              <div className="space-y-3">
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">RotWord(w3)</div>
                  <div className="font-mono text-sm text-green-300">{keyExpStep.rotw}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">SubWord(RotWord)</div>
                  <div className="font-mono text-sm text-amber-300">{keyExpStep.subw}</div>
                </div>
              </div>
            </div>

            {/* Step 4: XOR with Rcon */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Step 4: XOR with Rcon</h3>
              <div className="space-y-3">
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">Rcon[{selectedRound + 1}]</div>
                  <div className="font-mono text-sm text-slate-300">0x{keyExpStep.rcon.toString(16).toUpperCase().padStart(2, '0')}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">SubWord XOR Rcon</div>
                  <div className="font-mono text-sm text-red-300">{keyExpStep.xcsw}</div>
                </div>
              </div>
            </div>

            {/* Step 5: Generate K_{i+1} */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Step 5: Generate K{selectedRound + 1}</h3>
              <div className="space-y-3">
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w{(selectedRound + 1) * 4}</div>
                  <div className="font-mono text-sm text-cyan-300">{keyExpStep.w4}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w{(selectedRound + 1) * 4 + 1}</div>
                  <div className="font-mono text-sm text-cyan-300">{keyExpStep.w5}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w{(selectedRound + 1) * 4 + 2}</div>
                  <div className="font-mono text-sm text-cyan-300">{keyExpStep.w6}</div>
                </div>
                <div className="bg-slate-950 rounded-xl p-3 border border-slate-700">
                  <div className="text-xs text-slate-400 mb-1">w{(selectedRound + 1) * 4 + 3}</div>
                  <div className="font-mono text-sm text-cyan-300">{keyExpStep.w7}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PART 2: Encryption Rounds */}
      {activeSection === 'encryption' && round && (
        <div className="space-y-6">
          {/* Round Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300">
              Select Round:
            </label>
            <div className="flex gap-2 flex-wrap">
              {steps.encryptionRounds.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRound(idx)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                    selectedRound === idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {idx === 0 ? 'Init' : `R${idx}`}
                </button>
              ))}
            </div>
          </div>

          {/* Binary Input Display */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">HEX to BINARY Conversion</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Plaintext (Hex)</div>
                <div className="font-mono text-sm text-blue-300 mb-4 break-all">{steps.plaintext}</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Plaintext (Binary - 128 bits)</div>
                <div className="overflow-x-auto rounded border border-slate-700">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(128, minmax(20px, 20px))' }} className="gap-0.5 p-2 bg-slate-950">
                    {plainBinary.split('').map((bit, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 bg-blue-900/50 border border-blue-600 rounded text-[10px] flex items-center justify-center text-blue-200 font-mono"
                      >
                        {bit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key (Hex)</div>
                <div className="font-mono text-sm text-green-300 mb-4 break-all">{steps.key}</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key (Binary - 128 bits)</div>
                <div className="overflow-x-auto rounded border border-slate-700">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(128, minmax(20px, 20px))' }} className="gap-0.5 p-2 bg-slate-950">
                    {keyBinary.split('').map((bit, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 bg-green-900/50 border border-green-600 rounded text-[10px] flex items-center justify-center text-green-200 font-mono"
                      >
                        {bit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Encryption Round Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Step 6{selectedRound === 0 ? ' - Initial AddRoundKey' : `${selectedRound === 10 ? ' (Final Round)' : ''}`}
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400 mb-2">Round {selectedRound} Input State</div>
                  <div className="font-mono text-sm text-slate-200 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                    {round.inputState}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-2">Round Key (K{selectedRound})</div>
                  <div className="font-mono text-sm text-green-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                    {round.roundKey}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-2">After AddRoundKey</div>
                  <div className="font-mono text-sm text-blue-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                    {round.outputState}
                  </div>
                </div>
              </div>
            </div>

            {selectedRound !== 0 && (
              <>
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Step 7: SubBytes</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Input</div>
                      <div className="font-mono text-sm text-slate-200 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                        {round.inputState}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Output</div>
                      <div className="font-mono text-sm text-amber-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                        {round.afterSubByte}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Step 8: ShiftRows</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Input</div>
                      <div className="font-mono text-sm text-amber-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                        {round.afterSubByte}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Output</div>
                      <div className="font-mono text-sm text-purple-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                        {round.afterShiftRows}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedRound !== 10 && (
                  <>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Step 9: MixColumns</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-400 mb-2">Input</div>
                          <div className="font-mono text-sm text-purple-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                            {round.afterShiftRows}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-2">Output</div>
                          <div className="font-mono text-sm text-orange-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                            {round.afterMixColumns}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Step 10: AddRoundKey</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-400 mb-2">Input</div>
                          <div className="font-mono text-sm text-orange-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                            {round.afterMixColumns}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-2">Round Key (K{selectedRound})</div>
                          <div className="font-mono text-sm text-green-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                            {round.roundKey}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-2">Output</div>
                          <div className="font-mono text-sm text-cyan-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                            {round.outputState}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedRound === 10 && (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Step 11: Final AddRoundKey</h3>
                    <div className="space-y-3">
                      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-3">
                        <div className="text-xs text-yellow-300 mb-1 font-semibold">Note: No MixColumns in Final Round</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-2">Input</div>
                        <div className="font-mono text-sm text-purple-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                          {round.afterShiftRows}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-2">Round Key (K{selectedRound})</div>
                        <div className="font-mono text-sm text-green-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                          {round.roundKey}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-2">Ciphertext</div>
                        <div className="font-mono text-sm text-cyan-300 break-all bg-slate-950 rounded px-3 py-2 border border-slate-700">
                          {round.outputState}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Final Result */}
      <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Final Result</h3>
        <div className="font-mono text-xl text-cyan-300 break-all">{steps.ciphertext}</div>
      </div>
    </div>
  );
};
