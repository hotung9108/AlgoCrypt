import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  generateSignature,
  verifySignature,
  modPow,
  isPrime,
  verifyQDividesPMinus1,
} from "@/algorithms/dsaEncrypt";
import FormulaDisplay from "@/components/FormulaDisplay";

const DSAPage: React.FC = () => {
  // DSA parameters (Test case 1: p=23, q=11, h=6, xA=8, k=9, H(M)=10)
  const [p, setP] = useState(23);
  const [q, setQ] = useState(11);
  const [h, setH] = useState(6);
  const [xA, setXA] = useState(8);
  const [k, setK] = useState(9);
  const [H_M, setH_M] = useState(10);

  // Computed values
  const [g, setG] = useState(0);  // Computed generator: g = h^((p-1)/q) mod p
  const [yA, setYA] = useState(0);
  const [r, setR] = useState(0);
  const [s, setS] = useState(0);
  const [verificationResult, setVerificationResult] = useState(false);

  // Error messages
  const [pError, setPError] = useState("");
  const [qError, setQError] = useState("");
  const [hError, setHError] = useState("");
  const [xAError, setXAError] = useState("");
  const [kError, setKError] = useState("");
  const [H_MError, setH_MError] = useState("");

  // Computation values for display
  const [gk, setGk] = useState(0);  // Computed: g^k mod p

  // Recalculate whenever inputs change
  useEffect(() => {
    setPError("");
    setQError("");
    setHError("");
    setXAError("");
    setKError("");
    setH_MError("");

    // Validate p
    if (p <= 1) {
      setPError("p must be a large prime > 1");
      setG(0);
      setYA(0);
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    if (!isPrime(p)) {
      setPError("⚠ p should be a prime number");
    }

    // Validate q
    if (q <= 1) {
      setQError("q must be a prime > 1");
      setG(0);
      setYA(0);
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    if (!isPrime(q)) {
      setQError("⚠ q should be a prime number");
    }

    // Validate q divides (p-1)
    if (!verifyQDividesPMinus1(p, q)) {
      setQError(`q must divide (p-1). Currently: (${p}-1) mod ${q} = ${(p - 1) % q}`);
    }

    // Validate h (generator candidate)
    if (h < 2 || h >= p) {
      setHError(`h must be between 2 and ${p - 1}`);
      setG(0);
      setYA(0);
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    // Calculate g = h^((p-1)/q) mod p
    const exponent = (p - 1) / q;
    const newG = modPow(h, exponent, p);
    setG(newG);

    // Verify g is a valid generator: g^q ≡ 1 (mod p)
    const gq_mod_p = modPow(newG, q, p);
    if (gq_mod_p !== 1) {
      setHError(`⚠ Calculated g: g^q mod p = ${gq_mod_p} (expected 1)`);
    }

    // Validate xA
    if (xA < 1 || xA >= q) {
      setXAError(`xA must be between 1 and ${q - 1}`);
      setYA(0);
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    // Validate k
    if (k < 1 || k >= q) {
      setKError(`k must be between 1 and ${q - 1}`);
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    // Validate H(M)
    if (H_M < 0) {
      setH_MError("H(M) must be non-negative");
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    try {
      // a) Generate public key: yA = g^xA mod p
      const newYA = calculatePublicKey(newG, xA, p);
      setYA(newYA);

      // b) Generate signature using g
      const [newR, newS] = generateSignature(H_M, p, q, newG, xA, k);
      setR(newR);
      setS(newS);

      // Intermediate values for signature generation
      const newGk = modPow(newG, k, p);
      setGk(newGk);

      // c) Verify signature using g
      const isValid = verifySignature(H_M, newR, newS, p, q, newG, newYA);
      setVerificationResult(isValid);
    } catch (err) {
      setYA(0);
      setR(0);
      setS(0);
      setVerificationResult(false);
    }
  }, [p, q, h, xA, k, H_M]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">  
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                Digital Signature
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">DSA - Digital Signature Algorithm</h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              DSA (Digital Signature Algorithm) is a public-key cryptographic algorithm for creating digital signatures. It provides authentication and non-repudiation based on the discrete logarithm problem.
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
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Prime Modulus (p)</label>
                      <input
                        type="number"
                        value={p}
                        onChange={(e) => setP(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 7919"
                      />
                      {pError && (
                        <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                          {pError}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Prime Order (q)</label>
                      <input
                        type="number"
                        value={q}
                        onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 59"
                      />
                      {qError && (
                        <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                          {qError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Generator Candidate (h)</label>
                    <input
                      type="number"
                      value={h}
                      onChange={(e) => setH(Math.max(2, parseInt(e.target.value) || 2))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 6"
                    />
                    {hError && (
                      <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                        {hError}
                      </div>
                    )}
                    
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
                          placeholder="e.g., 19"
                        />
                        {xAError && (
                          <div className="mt-2 text-xs text-red-400">
                            {xAError}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Random Nonce (k)</label>
                        <input
                          type="number"
                          value={k}
                          onChange={(e) => setK(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="e.g., 23"
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
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Hash H(M)</label>
                    <input
                      type="number"
                      value={H_M}
                      onChange={(e) => setH_M(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 210"
                    />
                    {H_MError && (
                      <div className="mt-2 text-xs text-red-400">
                        {H_MError}
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
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Public Key (yA)</div>
                        <div className="text-2xl font-bold text-blue-300">{yA}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Signature (r)</div>
                        <div className="text-2xl font-bold text-blue-300">{r}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Signature (s)</div>
                        <div className="text-2xl font-bold text-indigo-300">{s}</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Verification</div>
                        <div className="text-2xl font-bold" style={{color: verificationResult ? '#86efac' : '#f87171'}}>
                          {verificationResult ? '✓' : '✗'}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-4 mt-4">
                      <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-2">Intermediate Values</div>
                      <div className="text-xs text-slate-300 space-y-1 font-mono">
                        <div><FormulaDisplay formula={`h (input) = ${h}, g (calculated) = h^((p-1)/q) mod p = ${g}`} /></div>
                        <div><FormulaDisplay formula={`g^k mod p = ${g}^${k} mod ${p} = ${gk}`} /></div>
                        <div><FormulaDisplay formula={`r = ${gk} mod ${q} = ${r}`} /></div>
                        <div><FormulaDisplay formula={`v = ${verificationResult ? r : 'verification failed'}`} /></div>
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
                    Signature & Verification
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${r},${s}`);
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors group"
                  >
                    <svg className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 bg-slate-950/80 border border-white/5 rounded-2xl p-6 overflow-y-auto scrollbar-hide mb-6">
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs text-slate-400 mb-2">Signature (r, s):</div>
                      <div className="text-2xl font-black tracking-widest bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent mono">
                        {r}
                      </div>
                      <div className="text-2xl font-black tracking-widest bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent mono">
                        {s}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <div className="text-xs text-slate-400 mb-3">Verification Result:</div>
                      <div className={`text-lg font-bold py-2 px-4 rounded-lg ${verificationResult ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {verificationResult ? '✓ SIGNATURE VERIFIED' : '✗ SIGNATURE INVALID'}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-3 text-xs">
                      <div className="text-center">
                        <div className="text-slate-500 mb-1">Public Key:</div>
                        <div className="text-blue-200 mono">{yA}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-500 mb-1">Message Hash:</div>
                        <div className="text-blue-200 mono">{H_M}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Signature Type</div>
                    <div className="text-sm font-bold text-white">DSA</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Status</div>
                    <div className="text-sm font-bold" style={{color: verificationResult ? '#86efac' : '#f87171'}}>
                      {verificationResult ? 'Valid' : 'Invalid'}
                    </div>
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

export default DSAPage;
