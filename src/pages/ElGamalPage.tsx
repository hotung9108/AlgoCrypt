import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  decryptElGamal,
  modPow,
  isPrime,
  isPrimitiveRoot,
} from "@/algorithms/elgamalEncrypt";
import FormulaDisplay from "@/components/FormulaDisplay";

const ElGamalPage: React.FC = () => {
  // Key generation parameters
  const [q, setQ] = useState(23);
  const [a, setA] = useState(5);
  const [xA, setXA] = useState(6);

  // Encryption parameters
  const [k, setK] = useState(3);
  const [message, setMessage] = useState(10);

  // Computed values
  const [yA, setYA] = useState(0);
  const [K_enc, setK_enc] = useState(0);
  const [C1, setC1] = useState(0);
  const [C2, setC2] = useState(0);
  const [K_dec, setK_dec] = useState(0);
  const [decrypted, setDecrypted] = useState(0);

  // Error messages
  const [qError, setQError] = useState("");
  const [aError, setAError] = useState("");
  const [xAError, setXAError] = useState("");
  const [kError, setKError] = useState("");
  const [messageError, setMessageError] = useState("");

  // Recalculate whenever inputs change
  useEffect(() => {
    setQError("");
    setAError("");
    setXAError("");
    setKError("");
    setMessageError("");

    // Validate q
    if (q <= 1) {
      setQError("q must be a prime number > 1");
      setYA(0);
      setK_enc(0);
      setC1(0);
      setC2(0);
      setK_dec(0);
      setDecrypted(0);
      return;
    }

    if (!isPrime(q)) {
      setQError("⚠ q should be a prime number");
    }

    // Validate a
    if (a < 2 || a >= q) {
      setAError(`a must be between 2 and ${q - 1}`);
      setYA(0);
      setK_enc(0);
      setC1(0);
      setC2(0);
      setK_dec(0);
      setDecrypted(0);
      return;
    }

    if (!isPrimitiveRoot(a, q)) {
      setAError("⚠ a is not a primitive root of q (may still work for demo)");
    }

    // Validate xA
    if (xA < 1 || xA >= q) {
      setXAError(`xA must be between 1 and ${q - 1}`);
      setYA(0);
      setK_enc(0);
      setC1(0);
      setC2(0);
      setK_dec(0);
      setDecrypted(0);
      return;
    }

    // Validate k
    if (k < 2 || k >= q) {
      setKError(`k must be between 2 and ${q - 1}`);
      setC1(0);
      setC2(0);
      setK_enc(0);
      setK_dec(0);
      setDecrypted(0);
      return;
    }

    // Validate message
    if (message < 1 || message >= q) {
      setMessageError(`Message must be between 1 and ${q - 1}`);
      setC1(0);
      setC2(0);
      setK_enc(0);
      setK_dec(0);
      setDecrypted(0);
      return;
    }

    try {
      // a) Calculate public key: YA = a^xA mod q
      const newYA = calculatePublicKey(a, xA, q);
      setYA(newYA);

      // b) Encrypt message
      // C1 = a^k mod q
      const newC1 = modPow(a, k, q);
      setC1(newC1);

      // K_enc = YA^k mod q
      const newK_enc = modPow(newYA, k, q);
      setK_enc(newK_enc);

      // C2 = (M * K_enc) mod q
      const newC2 = (message * newK_enc) % q;
      setC2(newC2);

      // c) Decrypt message
      // K_dec = C1^xA mod q
      const newK_dec = modPow(newC1, xA, q);
      setK_dec(newK_dec);

      // Decrypt
      const decryptedMessage = decryptElGamal(newC1, newC2, xA, q);
      setDecrypted(decryptedMessage);
    } catch (err) {
      setYA(0);
      setK_enc(0);
      setC1(0);
      setC2(0);
      setK_dec(0);
      setDecrypted(0);
    }
  }, [q, a, xA, k, message]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                Asymmetric Encryption
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">ElGamal Encryption</h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              ElGamal is a public-key cryptosystem based on the discrete logarithm problem. It provides both encryption and digital signatures, using a random number k for each encryption to ensure semantic security.
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
                  <div className="grid grid-cols-2 gap-4">
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
                        <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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
                  </div>

                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Private Key (xA)</label>
                        <input
                          type="number"
                          value={xA}
                          onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="e.g., 6"
                        />
                        {xAError && (
                          <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                            {xAError}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Random Number (k)</label>
                        <input
                          type="number"
                          value={k}
                          onChange={(e) => setK(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="e.g., 3"
                        />
                        {kError && (
                          <div className="mt-2 text-xs text-red-400">
                            {kError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message (M)</label>
                    <input
                      type="number"
                      value={message}
                      onChange={(e) => setMessage(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 10"
                    />
                    {messageError && (
                      <div className="mt-2 text-xs text-red-400">
                        {messageError}
                      </div>
                    )}
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
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Public Key</div>
                        <div className="text-2xl font-bold text-blue-300">{yA}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Ciphertext 1 (C1)</div>
                        <div className="text-2xl font-bold text-blue-300">{C1}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Ciphertext 2 (C2)</div>
                        <div className="text-2xl font-bold text-indigo-300">{C2}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Decryption Key</div>
                        <div className="text-2xl font-bold text-indigo-300">{K_dec}</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-4 mt-4">
                      <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-2">Formulas</div>
                      <div className="text-xs text-slate-300 space-y-1 font-mono">
                        <div><FormulaDisplay formula="YA = a^xA mod q" /></div>
                        <div><FormulaDisplay formula="C1 = a^k mod q" /></div>
                        <div><FormulaDisplay formula="K_enc = YA^k mod q" /></div>
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
                    Decryption Result
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(decrypted.toString());
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors group"
                  >
                    <svg className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 bg-slate-950/80 border border-white/5 rounded-2xl p-6 overflow-y-auto scrollbar-hide mb-6">
                  <div className="text-4xl font-black tracking-widest text-center leading-relaxed bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent mono">
                    {decrypted || 'DECRYPTING...'}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs text-slate-400 mono">
                    <div className="text-center">
                      <div className="text-slate-500 mb-1">Encryption (C1, C2):</div>
                      <div className="text-blue-200">({C1}, {C2})</div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 mb-1">Decryption:</div>
                      <div className="text-blue-200"><FormulaDisplay formula={`M = (C2 * K_dec^-1) mod q = ${decrypted}`} /></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Public Key</div>
                    <div className="text-sm font-bold text-white">{yA}</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Shared Secret</div>
                    <div className="text-sm font-bold text-white">{K_enc}</div>
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

export default ElGamalPage;
