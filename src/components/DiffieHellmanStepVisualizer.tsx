import React, { useState } from 'react';
import type { DiffieHellmanDebugSteps } from '@/algorithms/diffieHellmanEncrypt';

interface DiffieHellmanStepVisualizerProps {
  steps: DiffieHellmanDebugSteps;
}

export const DiffieHellmanStepVisualizer: React.FC<DiffieHellmanStepVisualizerProps> = ({ steps }) => {
  const [activePhase, setActivePhase] = useState<'setup' | 'publicA' | 'publicB' | 'secretA' | 'secretB'>('setup');

  return (
    <div className="space-y-8 bg-slate-950 rounded-3xl border border-slate-800 p-8">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Diffie-Hellman Key Exchange - Step-by-Step</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/50 rounded-2xl p-6">
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Prime (q)</div>
            <div className="font-mono text-lg text-blue-300 font-bold">{steps.q}</div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Primitive Root (a)</div>
            <div className="font-mono text-lg text-green-300 font-bold">{steps.a}</div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Private Key A (xA)</div>
            <div className="font-mono text-lg text-amber-300 font-bold">{steps.xA}</div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Private Key B (xB)</div>
            <div className="font-mono text-lg text-purple-300 font-bold">{steps.xB}</div>
          </div>
        </div>
      </div>

      {/* Phase Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActivePhase('setup')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            activePhase === 'setup'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Setup
        </button>
        <button
          onClick={() => setActivePhase('publicA')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            activePhase === 'publicA'
              ? 'bg-amber-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Party A: Public Key
        </button>
        <button
          onClick={() => setActivePhase('publicB')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            activePhase === 'publicB'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Party B: Public Key
        </button>
        <button
          onClick={() => setActivePhase('secretA')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            activePhase === 'secretA'
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Party A: Shared Secret
        </button>
        <button
          onClick={() => setActivePhase('secretB')}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            activePhase === 'secretB'
              ? 'bg-teal-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Party B: Shared Secret
        </button>
      </div>

      {/* Setup Phase */}
      {activePhase === 'setup' && (
        <div className="space-y-6">
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">1. Setup Phase - Publicly Agreed Parameters</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
                <div className="text-sm font-semibold text-slate-400 mb-3">Prime Number (q)</div>
                <div className="font-mono text-3xl text-blue-300 font-bold mb-2">{steps.q}</div>
                <div className="text-xs text-slate-400">
                  A large prime number that is publicly known to both parties
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
                <div className="text-sm font-semibold text-slate-400 mb-3">Primitive Root (a)</div>
                <div className="font-mono text-3xl text-green-300 font-bold mb-2">{steps.a}</div>
                <div className="text-xs text-slate-400">
                  A primitive root modulo q, publicly known to both parties
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-2xl p-6">
            <h4 className="font-semibold text-white mb-4">Private Keys (Kept Secret)</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-amber-700 rounded-xl p-4">
                <div className="text-sm font-semibold text-amber-300 mb-3">Party A Private Key (xA)</div>
                <div className="font-mono text-3xl text-amber-300 font-bold">{steps.xA}</div>
              </div>
              <div className="bg-slate-950 border border-purple-700 rounded-xl p-4">
                <div className="text-sm font-semibold text-purple-300 mb-3">Party B Private Key (xB)</div>
                <div className="font-mono text-3xl text-purple-300 font-bold">{steps.xB}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Party A Public Key */}
      {activePhase === 'publicA' && (
        <div className="space-y-6">
          <div className="bg-amber-900/20 border border-amber-600/30 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">2. Party A Calculates Public Key</h3>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 mb-6">
              <div className="text-sm font-semibold text-slate-400 mb-2">Formula</div>
              <div className="font-mono text-xl text-amber-300 font-bold">
                {steps.partyAPublicKey.formula}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-300 mb-4">Modular Exponentiation Steps (Binary Exponentiation):</div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {steps.partyAPublicKey.steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm"
                  >
                    <div className="text-amber-300 font-mono font-semibold mb-1">Step {step.step}:</div>
                    <div className="text-slate-300">{step.description}</div>
                    {step.step === steps.partyAPublicKey.steps.length && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="text-slate-400 text-xs mb-1">Result:</div>
                        <div className="font-mono text-amber-300 font-bold">
                          yA = {step.result}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-500/20 rounded-xl p-4">
              <div className="text-sm text-amber-300 font-semibold mb-2">Public Key (yA) - Send to Party B</div>
              <div className="font-mono text-3xl text-amber-300 font-bold">{steps.partyAPublicKey.publicKey}</div>
            </div>
          </div>
        </div>
      )}

      {/* Party B Public Key */}
      {activePhase === 'publicB' && (
        <div className="space-y-6">
          <div className="bg-purple-900/20 border border-purple-600/30 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">3. Party B Calculates Public Key</h3>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 mb-6">
              <div className="text-sm font-semibold text-slate-400 mb-2">Formula</div>
              <div className="font-mono text-xl text-purple-300 font-bold">
                {steps.partyBPublicKey.formula}
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-300 mb-4">Modular Exponentiation Steps (Binary Exponentiation):</div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {steps.partyBPublicKey.steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm"
                  >
                    <div className="text-purple-300 font-mono font-semibold mb-1">Step {step.step}:</div>
                    <div className="text-slate-300">{step.description}</div>
                    {step.step === steps.partyBPublicKey.steps.length && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="text-slate-400 text-xs mb-1">Result:</div>
                        <div className="font-mono text-purple-300 font-bold">
                          yB = {step.result}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-xl p-4">
              <div className="text-sm text-purple-300 font-semibold mb-2">Public Key (yB) - Send to Party A</div>
              <div className="font-mono text-3xl text-purple-300 font-bold">{steps.partyBPublicKey.publicKey}</div>
            </div>
          </div>
        </div>
      )}

      {/* Party A Shared Secret */}
      {activePhase === 'secretA' && (
        <div className="space-y-6">
          <div className="bg-cyan-900/20 border border-cyan-600/30 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">4. Party A Calculates Shared Secret</h3>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 mb-6">
              <div className="text-sm font-semibold text-slate-400 mb-2">Formula</div>
              <div className="font-mono text-xl text-cyan-300 font-bold">
                {steps.partyASharedSecret.formula}
              </div>
              <div className="text-xs text-slate-400 mt-3">
                Receives yB from Party B and uses own private key xA
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-300 mb-4">Modular Exponentiation Steps (Binary Exponentiation):</div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {steps.partyASharedSecret.steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm"
                  >
                    <div className="text-cyan-300 font-mono font-semibold mb-1">Step {step.step}:</div>
                    <div className="text-slate-300">{step.description}</div>
                    {step.step === steps.partyASharedSecret.steps.length && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="text-slate-400 text-xs mb-1">Result:</div>
                        <div className="font-mono text-cyan-300 font-bold">
                          K = {step.result}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-xl p-4">
              <div className="text-sm text-cyan-300 font-semibold mb-2">Shared Secret Key (K)</div>
              <div className="font-mono text-3xl text-cyan-300 font-bold">{steps.partyASharedSecret.sharedSecret}</div>
            </div>
          </div>
        </div>
      )}

      {/* Party B Shared Secret */}
      {activePhase === 'secretB' && (
        <div className="space-y-6">
          <div className="bg-teal-900/20 border border-teal-600/30 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">5. Party B Calculates Shared Secret</h3>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 mb-6">
              <div className="text-sm font-semibold text-slate-400 mb-2">Formula</div>
              <div className="font-mono text-xl text-teal-300 font-bold">
                {steps.partyBSharedSecret.formula}
              </div>
              <div className="text-xs text-slate-400 mt-3">
                Receives yA from Party A and uses own private key xB
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-slate-300 mb-4">Modular Exponentiation Steps (Binary Exponentiation):</div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {steps.partyBSharedSecret.steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm"
                  >
                    <div className="text-teal-300 font-mono font-semibold mb-1">Step {step.step}:</div>
                    <div className="text-slate-300">{step.description}</div>
                    {step.step === steps.partyBSharedSecret.steps.length && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="text-slate-400 text-xs mb-1">Result:</div>
                        <div className="font-mono text-teal-300 font-bold">
                          K = {step.result}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-teal-500/20 rounded-xl p-4">
              <div className="text-sm text-teal-300 font-semibold mb-2">Shared Secret Key (K)</div>
              <div className="font-mono text-3xl text-teal-300 font-bold">{steps.partyBSharedSecret.sharedSecret}</div>
            </div>
          </div>
        </div>
      )}

      {/* Final Verification */}
      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Shared Secret Agreed!
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-2">Party A's Result</div>
            <div className="font-mono text-2xl text-cyan-300 font-bold">{steps.partyASharedSecret.sharedSecret}</div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 flex items-center justify-center">
            <div className="text-3xl text-green-400 font-bold">=</div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-2">Party B's Result</div>
            <div className="font-mono text-2xl text-teal-300 font-bold">{steps.partyBSharedSecret.sharedSecret}</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <div className="text-sm text-slate-400 mb-2">Both parties can now use this key for symmetric encryption:</div>
          <div className="font-mono text-3xl text-green-400 font-bold">K = {steps.sharedSecret}</div>
        </div>
      </div>
    </div>
  );
};
