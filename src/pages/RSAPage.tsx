import React, { useState, useEffect } from "react";
import {
  calculateN,
  calculatePhi,
  calculateD,
  encryptRSA,
  decryptRSA,
  isPrime,
  verifyKey,
} from "@/algorithms/rsaEncrypt";
import FormulaDisplay from "@/components/FormulaDisplay";

const RSAPage: React.FC = () => {
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [e, setE] = useState(17);
  const [message, setMessage] = useState(42);

  const [n, setN] = useState(0);
  const [phi, setPhi] = useState(0);
  const [d, setD] = useState(0);
  const [ciphertext, setCiphertext] = useState(0);
  const [decrypted, setDecrypted] = useState(0);

  const [pError, setPError] = useState("");
  const [qError, setQError] = useState("");
  const [eError, setEError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [keyValid, setKeyValid] = useState(true);

  // Recalculate whenever inputs change
  useEffect(() => {
    setPError("");
    setQError("");
    setEError("");
    setMessageError("");

    if (p <= 1) {
      setPError("p must be a prime number > 1");
      setN(0);
      setPhi(0);
      setD(0);
      setCiphertext(0);
      setDecrypted(0);
      setKeyValid(false);
      return;
    }

    if (q <= 1) {
      setQError("q must be a prime number > 1");
      setN(0);
      setPhi(0);
      setD(0);
      setCiphertext(0);
      setDecrypted(0);
      setKeyValid(false);
      return;
    }

    if (p === q) {
      setPError("p and q must be different primes");
      setN(0);
      setPhi(0);
      setD(0);
      setCiphertext(0);
      setDecrypted(0);
      setKeyValid(false);
      return;
    }

    if (!isPrime(p)) {
      setPError("p should be a prime number");
    }

    if (!isPrime(q)) {
      setQError("q should be a prime number");
    }

    try {
      // Calculate n and φ(n)
      const newN = calculateN(p, q);
      const newPhi = calculatePhi(p, q);

      setN(newN);
      setPhi(newPhi);

      // Validate e
      if (e <= 1 || e >= newPhi) {
        setEError(`e must be between 2 and ${newPhi - 1}`);
        setD(0);
        setCiphertext(0);
        setDecrypted(0);
        setKeyValid(false);
        return;
      }

      // Calculate d
      try {
        const newD = calculateD(e, newPhi);
        setD(newD);

        // Verify encryption/decryption
        if (message >= newN) {
          setMessageError(`Message must be less than n (${newN})`);
          setCiphertext(0);
          setDecrypted(0);
        } else {
          const encrypted = encryptRSA(message, newD, newN);
          const decrypted = decryptRSA(encrypted, e, newN);
          setCiphertext(encrypted);
          setDecrypted(decrypted);
          setMessageError("");
        }

        // Verify key
        const isValid = verifyKey(p, q, e, newD);
        setKeyValid(isValid);
        setEError("");
      } catch (err) {
        setEError("e is not valid (not coprime with φ(n))");
        setD(0);
        setCiphertext(0);
        setDecrypted(0);
        setKeyValid(false);
      }
    } catch (err) {
      setN(0);
      setPhi(0);
      setD(0);
      setCiphertext(0);
      setDecrypted(0);
      setKeyValid(false);
    }
  }, [p, q, e, message]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                Asymmetric Cryptography
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">RSA Algorithm</h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              RSA is a widely used public-key cryptographic algorithm. Security depends on the difficulty of factoring large composite numbers. Each user has a public key (e, n) for encryption and a private key (d, n) for decryption.
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
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Prime Number (p)</label>
                      <input
                        type="number"
                        value={p}
                        onChange={(e) => setP(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 61"
                      />
                      {pError && (
                        <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {pError}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Prime Number (q)</label>
                      <input
                        type="number"
                        value={q}
                        onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 53"
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Public Exponent (e)</label>
                      <input
                        type="number"
                        value={e}
                        onChange={(e) => setE(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 17"
                      />
                      {eError && (
                        <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {eError}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message to Encrypt (M)</label>
                      <input
                        type="number"
                        value={message}
                        onChange={(e) => setMessage(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 42"
                      />
                      {messageError && (
                        <div className="mt-2 text-xs text-red-400">{messageError}</div>
                      )}
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
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Modulus (n)</div>
                        <div className="text-2xl font-bold text-blue-300">{n}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Phi φ(n)</div>
                        <div className="text-2xl font-bold text-blue-300">{phi}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Private Key (d)</div>
                        <div className="text-2xl font-bold text-indigo-300">{d}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Encryption (c)</div>
                        <div className="text-2xl font-bold text-indigo-300">{ciphertext}</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-4 mt-4">
                      <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-2">Key Validation</div>
                      <div className="text-xs text-slate-300">
                        {keyValid ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Keys verified ✓
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Invalid configuration
                          </div>
                        )}
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
                      <div className="text-slate-500 mb-1">Formula:</div>
                      <div className="text-blue-200"><FormulaDisplay formula="M = c^d mod n" /></div>
                    </div>
                    <div className="text-center">
                      <div className="text-slate-500 mb-1">Values:</div>
                      <div className="text-blue-200"><FormulaDisplay formula={`${ciphertext}^${d} mod ${n} = ${decrypted}`} /></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Public Key</div>
                    <div className="text-sm font-bold text-white">{`{${e}, ${n}}`}</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Private Key</div>
                    <div className="text-sm font-bold text-white">{`{${d}, ${n}}`}</div>
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

export default RSAPage;
