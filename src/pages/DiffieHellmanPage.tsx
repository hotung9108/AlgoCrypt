import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  calculateSharedSecret,
  isPrime,
  isPrimitiveRoot,
  diffieHellmanDebug,
  type DiffieHellmanDebugSteps,
} from "@/algorithms/diffieHellmanEncrypt";
import { DiffieHellmanStepVisualizer } from "@/components/DiffieHellmanStepVisualizer";
import DiffieHellmanTablesPage from "./DiffieHellmanTablesPage";
import FormulaDisplay from "@/components/FormulaDisplay";

const DiffieHellmanPage: React.FC = () => {
  const [q, setQ] = useState(23);
  const [a, setA] = useState(5);
  const [xA, setXA] = useState(6);
  const [xB, setXB] = useState(15);

  const [yA, setYA] = useState(0);
  const [yB, setYB] = useState(0);
  const [sharedSecret, setSharedSecret] = useState(0);

  const [qError, setQError] = useState("");
  const [aError, setAError] = useState("");
  const [debugSteps, setDebugSteps] = useState<DiffieHellmanDebugSteps | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [showTables, setShowTables] = useState(false);

  // Calculate public keys and shared secret whenever inputs change
  useEffect(() => {
    setQError("");
    setAError("");

    if (q <= 1) {
      setQError("q must be a prime number > 1");
      setYA(0);
      setYB(0);
      setSharedSecret(0);
      return;
    }

    if (a < 2 || a >= q) {
      setAError(`a must be between 2 and ${q - 1}`);
      setYA(0);
      setYB(0);
      setSharedSecret(0);
      return;
    }

    if (!isPrime(q)) {
      setQError("q should be a prime number");
    }

    if (!isPrimitiveRoot(a, q)) {
      setAError("⚠ a is not a primitive root of q (may still work for demo)");
    }

    try {
      const newYA = calculatePublicKey(a, xA, q);
      const newYB = calculatePublicKey(a, xB, q);
      setYA(newYA);
      setYB(newYB);

      // Both parties calculate the same shared secret
      const secret1 = calculateSharedSecret(newYB, xA, q);

      // They should be equal
      setSharedSecret(secret1);

      // Calculate debug steps if in step mode
      if (showSteps) {
        const steps = diffieHellmanDebug(q, a, xA, xB);
        setDebugSteps(steps);
      }
    } catch (err) {
      setYA(0);
      setYB(0);
      setSharedSecret(0);
      setDebugSteps(null);
    }
  }, [q, a, xA, xB, showSteps]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Diffie-Hellman Key Exchange</h2>
                <p className="text-sm text-slate-400 mt-1">Secure key exchange protocol using discrete logarithms</p>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => { setShowSteps(false); setShowTables(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!showSteps && !showTables ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Normal
                </button>
                <button
                  onClick={() => { setShowSteps(true); setShowTables(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${showSteps && !showTables ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Steps
                </button>
                <button
                  onClick={() => { setShowSteps(false); setShowTables(true); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${showTables ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Tables
                </button>
              </div>
            </div>
          </header>

          {showTables ? (
            <DiffieHellmanTablesPage />
          ) : showSteps && debugSteps ? (
            <DiffieHellmanStepVisualizer steps={debugSteps} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Input Controller
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Prime Number (q)</label>
                    <input
                      type="number"
                      value={q}
                      onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="23"
                    />
                    {qError && (
                      <div className="mt-1 text-xs text-red-400">{qError}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Primitive Root (a)</label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="5"
                    />
                    {aError && (
                      <div className="mt-1 text-xs text-blue-400">{aError}</div>
                    )}
                  </div>

                  <div className="border-t border-slate-700 pt-2.5 mt-2.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">xA (Private)</label>
                        <input
                          type="number"
                          value={xA}
                          onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="6"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">xB (Private)</label>
                        <input
                          type="number"
                          value={xB}
                          onChange={(e) => setXB(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="15"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Algorithm Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Method</div>
                    <div className="text-lg font-bold text-blue-300">Key Exchange</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Type</div>
                    <div className="text-lg font-bold text-blue-300">Asymmetric</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Basis</div>
                    <div className="text-base font-bold text-indigo-300">Discrete Log</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Parties</div>
                    <div className="text-lg font-bold text-indigo-300">2</div>
                  </div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
                  <div className="text-[11px] text-slate-300 uppercase font-semibold tracking-wider mb-2">Key Formulas</div>
                  <div className="text-xs text-slate-300 space-y-1.5 font-mono">
                    <div><FormulaDisplay formula="yA = a^xA mod q" /></div>
                    <div><FormulaDisplay formula="yB = a^xB mod q" /></div>
                    <div><FormulaDisplay formula="K = yB^xA mod q = yA^xB mod q" /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-base text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Shared Secret Key
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(sharedSecret.toString());
                    }}
                    className="px-2.5 py-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-colors text-blue-300 hover:text-blue-200 font-semibold"
                    title="Copy to clipboard"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex-1 bg-slate-950/60 border border-blue-500/10 rounded-lg p-4 mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-200 mono">
                      {sharedSecret || '—'}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">Secret key for both parties</div>
                  </div>
                </div>

                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700 space-y-2">
                  <div className="text-xs">
                    <div className="text-slate-400 mb-0.5">A: yB^xA mod q</div>
                    <div className="text-blue-200 font-mono text-[11px]">{yB}^{xA} mod {q} = {sharedSecret}</div>
                  </div>
                  <div className="text-xs">
                    <div className="text-slate-400 mb-0.5">B: yA^xB mod q</div>
                    <div className="text-blue-200 font-mono text-[11px]">{yA}^{xB} mod {q} = {sharedSecret}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Public Key A</div>
                    <div className="text-base font-bold text-white">{yA}</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Public Key B</div>
                    <div className="text-base font-bold text-white">{yB}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-base text-slate-100 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Process Steps
                </h3>

                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  <div className="bg-slate-950/40 rounded-lg p-3 border-l-2 border-blue-500">
                    <div className="font-semibold text-blue-300 mb-0.5">1. Setup (Public)</div>
                    <div className="text-slate-400 text-[11px]">q = {q}, a = {a}</div>
                  </div>
                  <div className="bg-slate-950/40 rounded-lg p-3 border-l-2 border-amber-500">
                    <div className="font-semibold text-amber-300 mb-0.5">2. Party A: Public Key</div>
                    <div className="text-slate-400 font-mono text-[11px]">yA = {a}^{xA} mod {q} = {yA}</div>
                  </div>
                  <div className="bg-slate-950/40 rounded-lg p-3 border-l-2 border-purple-500">
                    <div className="font-semibold text-purple-300 mb-0.5">3. Party B: Public Key</div>
                    <div className="text-slate-400 font-mono text-[11px]">yB = {a}^{xB} mod {q} = {yB}</div>
                  </div>
                  <div className="bg-slate-950/40 rounded-lg p-3 border-l-2 border-green-500">
                    <div className="font-semibold text-green-300 mb-0.5">4. Both: Shared Secret</div>
                    <div className="text-slate-400 font-mono text-[11px]">K = {sharedSecret}</div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DiffieHellmanPage;
