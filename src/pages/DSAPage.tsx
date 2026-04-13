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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Input Controller
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Prime (p)</label>
                      <input
                        type="number"
                        value={p}
                        onChange={(e) => setP(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="23"
                      />
                      {pError && (
                        <div className="mt-1 text-xs text-blue-400">{pError}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Prime Order (q)</label>
                      <input
                        type="number"
                        value={q}
                        onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 2))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="11"
                      />
                      {qError && (
                        <div className="mt-1 text-xs text-blue-400">{qError}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Generator (h)</label>
                    <input
                      type="number"
                      value={h}
                      onChange={(e) => setH(Math.max(2, parseInt(e.target.value) || 2))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="6"
                    />
                    {hError && (
                      <div className="mt-1 text-xs text-blue-400">{hError}</div>
                    )}
                  </div>

                  <div className="border-t border-slate-700 pt-2.5 mt-2.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Private (xA)</label>
                        <input
                          type="number"
                          value={xA}
                          onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="8"
                        />
                        {xAError && (
                          <div className="mt-1 text-xs text-red-400">{xAError}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nonce (k)</label>
                        <input
                          type="number"
                          value={k}
                          onChange={(e) => setK(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="9"
                        />
                        {kError && (
                          <div className="mt-1 text-xs text-red-400">{kError}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Hash H(M)</label>
                    <input
                      type="number"
                      value={H_M}
                      onChange={(e) => setH_M(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="10"
                    />
                    {H_MError && (
                      <div className="mt-1 text-xs text-red-400">{H_MError}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                  Algorithm Details
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Public Key (yA)</div>
                      <div className="text-lg font-bold text-blue-400">{yA}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Signature (r)</div>
                      <div className="text-lg font-bold text-blue-400">{r}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Signature (s)</div>
                      <div className="text-lg font-bold text-indigo-400">{s}</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Status</div>
                      <div className="text-lg font-bold" style={{color: verificationResult ? '#86efac' : '#f87171'}}>
                        {verificationResult ? '✓' : '✗'}
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-950/30 border border-blue-500/20 rounded-lg p-3">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-2">Intermediate</div>
                    <div className="text-xs text-slate-300 space-y-1 font-mono">
                      <div><FormulaDisplay formula={`g = h^((p-1)/q) mod p = ${g}`} /></div>
                      <div><FormulaDisplay formula={`g^k mod p = ${gk}`} /></div>
                      <div><FormulaDisplay formula={`r = (g^k mod p) mod q = ${r}`} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-base text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    Signature & Verification
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${r},${s}`);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 bg-slate-950/50 border border-slate-800 rounded-lg p-4 overflow-y-auto mb-4 space-y-3">
                  <div>
                    <div className="text-xs text-slate-400 mb-1.5">Signature (r, s):</div>
                    <div className="text-sm font-bold text-blue-400 mono">{r}</div>
                    <div className="text-sm font-bold text-blue-400 mono">{s}</div>
                  </div>

                  <div className="border-t border-slate-700 pt-3">
                    <div className="text-xs text-slate-400 mb-2">Result:</div>
                    <div className={`text-sm font-bold py-1.5 px-3 rounded-lg ${verificationResult ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {verificationResult ? '✓ VERIFIED' : '✗ INVALID'}
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-3 space-y-2 text-xs">
                    <div>
                      <div className="text-slate-500 mb-0.5">Public Key (yA):</div>
                      <div className="text-blue-300 font-mono">{yA}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 mb-0.5">Message Hash:</div>
                      <div className="text-blue-300 font-mono">{H_M}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-800/50 rounded-lg p-2.5">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-0.5">Algorithm</div>
                    <div className="text-xs font-bold text-white">DSA</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2.5">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-0.5">Status</div>
                    <div className="text-xs font-bold" style={{color: verificationResult ? '#86efac' : '#f87171'}}>
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
