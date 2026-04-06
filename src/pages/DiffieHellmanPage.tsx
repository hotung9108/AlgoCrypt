import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  calculateSharedSecret,
  isPrime,
  isPrimitiveRoot,
} from "@/algorithms/diffieHellmanEncrypt";
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
    } catch (err) {
      setYA(0);
      setYB(0);
      setSharedSecret(0);
    }
  }, [q, a, xA, xB]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                Key Exchange Protocol
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Diffie-Hellman Key Exchange</h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              A cryptographic protocol that allows two parties to establish a shared secret key over an insecure channel. The security is based on the difficulty of computing discrete logarithms.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  Input Controller
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Prime Number (q)</label>
                    <input
                      type="number"
                      value={q}
                      onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 23"
                    />
                    {qError && (
                      <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {qError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Primitive Root (a)</label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 5"
                    />
                    {aError && (
                      <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {aError}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Party A Private Key (xA)</label>
                        <input
                          type="number"
                          value={xA}
                          onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="e.g., 6"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Party B Private Key (xB)</label>
                        <input
                          type="number"
                          value={xB}
                          onChange={(e) => setXB(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="e.g., 15"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden min-h-[400px]">
                <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Algorithm Details
                </h3>
                <div className="flex items-center justify-center bg-slate-950/30 rounded-2xl border border-slate-800/50 p-6 min-h-[300px]">
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Method</div>
                        <div className="text-2xl font-bold text-blue-300">Key Exchange</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Type</div>
                        <div className="text-2xl font-bold text-blue-300">Asymmetric</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Basis</div>
                        <div className="text-xl font-bold text-indigo-300">Discrete Log</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Parties</div>
                        <div className="text-2xl font-bold text-indigo-300">2</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-4 mt-4">
                      <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-2">Formulas</div>
                      <div className="text-xs text-slate-300 space-y-1 font-mono">
                        <div><FormulaDisplay formula="yA = a^xA mod q" /></div>
                        <div><FormulaDisplay formula="yB = a^xB mod q" /></div>
                        <div><FormulaDisplay formula="K = yB^xA mod q" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-8 shadow-2xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Shared Secret Key
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(sharedSecret.toString());
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors group"
                  >
                    <svg className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 bg-slate-950/80 border border-white/5 rounded-2xl p-6 overflow-y-auto scrollbar-hide mb-6">
                  <div className="text-5xl font-black tracking-widest text-center leading-relaxed bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent mono">
                    {sharedSecret || 'CALCULATING...'}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs text-slate-400 mono">
                    <div className="text-center">
                      <div className="text-slate-500 mb-1">Party A Calculation:</div>
                      <div className="text-blue-200"><FormulaDisplay formula={`yB^xA mod q = ${yB}^${xA} mod ${q} = ${sharedSecret}`} /></div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 mb-1">Party B Calculation:</div>
                      <div className="text-blue-200"><FormulaDisplay formula={`yA^xB mod q = ${yA}^${xB} mod ${q} = ${sharedSecret}`} /></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Public Key A</div>
                    <div className="text-lg font-bold text-white">{yA}</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Public Key B</div>
                    <div className="text-lg font-bold text-white">{yB}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How It Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Setup Phase</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      1
                    </div>
                    <div>
                      <span className="font-mono">q</span>: A large prime number (publicly known)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      2
                    </div>
                    <div>
                      <span className="font-mono">a</span>: A primitive root modulo q (publicly known)
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Exchange Phase</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      3
                    </div>
                    <div>
                      Party A: Calculate <span className="font-mono"><FormulaDisplay formula="yA = a^xA mod q" /></span>, send yA
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      4
                    </div>
                    <div>
                      Party B: Calculate <span className="font-mono"><FormulaDisplay formula="yB = a^xB mod q" /></span>, send yB
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Key Agreement Phase</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      5
                    </div>
                    <div>
                      Party A: Calculate <span className="font-mono"><FormulaDisplay formula="K = yB^xA mod q" /></span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      6
                    </div>
                    <div>
                      Party B: Calculate <span className="font-mono"><FormulaDisplay formula="K = yA^xB mod q" /></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Security Features</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>Private keys (xA, xB) never transmitted</div>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>Based on discrete logarithm problem</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiffieHellmanPage;
