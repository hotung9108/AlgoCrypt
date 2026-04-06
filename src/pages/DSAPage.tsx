import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  generateSignature,
  verifySignature,
  modPow,
  isPrime,
  verifyQDividesPMinus1,
} from "@/algorithms/dsaEncrypt";

const DSAPage: React.FC = () => {
  // DSA parameters
  const [p, setP] = useState(7919);
  const [q, setQ] = useState(59);
  const [h, setH] = useState(10);
  const [xA, setXA] = useState(19);
  const [k, setK] = useState(23);
  const [H_M, setH_M] = useState(210);

  // Computed values
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
  const [hk, setHk] = useState(0);
  const [w, setW] = useState(0);
  const [u1, setU1] = useState(0);
  const [u2, setU2] = useState(0);
  const [v, setV] = useState(0);

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

    // Validate h
    if (h < 2 || h >= p) {
      setHError(`h must be between 2 and ${p - 1}`);
      setYA(0);
      setR(0);
      setS(0);
      setVerificationResult(false);
      return;
    }

    // Validate h^q ≡ 1 (mod p)
    const hq_mod_p = modPow(h, q, p);
    if (hq_mod_p !== 1) {
      setHError(`⚠ h^q mod p should be 1, but got ${hq_mod_p}`);
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
      // a) Generate public key: yA = h^xA mod p
      const newYA = calculatePublicKey(h, xA, p);
      setYA(newYA);

      // b) Generate signature
      const [newR, newS] = generateSignature(H_M, p, q, h, xA, k);
      setR(newR);
      setS(newS);

      // Intermediate values for signature generation
      const newHk = modPow(h, k, p);
      setHk(newHk);

      // c) Verify signature
      const isValid = verifySignature(H_M, newR, newS, p, q, h, newYA);
      setVerificationResult(isValid);

      // Intermediate values for verification
      if (isValid) {
        try {
          // w = s^(-1) mod q (simplified calculation for display)
          let w_val = 0;
          for (let i = 1; i < q; i++) {
            if ((newS * i) % q === 1) {
              w_val = i;
              break;
            }
          }
          setW(w_val);

          const newU1 = (H_M * w_val) % q;
          const newU2 = (newR * w_val) % q;
          setU1(newU1);
          setU2(newU2);

          const hu1 = modPow(h, newU1, p);
          const yAu2 = modPow(newYA, newU2, p);
          const newV = ((hu1 * yAu2) % p) % q;
          setV(newV);
        } catch (err) {
          // Ignore verification computation errors for display
        }
      }
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
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-tighter">
                Digital Signature
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              DSA - Digital Signature Algorithm
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              DSA (Digital Signature Algorithm) is a public-key cryptographic algorithm for creating digital signatures. It provides authentication and non-repudiation based on the discrete logarithm problem.
            </p>
          </header>

          {/* Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Parameters */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                a) Parameters & Private Key
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Prime Modulus (p)
                  </label>
                  <input
                    type="number"
                    value={p}
                    onChange={(e) => setP(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 7919"
                  />
                  {pError && (
                    <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                      {pError}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Prime Order (q) - divides (p-1)
                  </label>
                  <input
                    type="number"
                    value={q}
                    onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 59"
                  />
                  {qError && (
                    <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                      {qError}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Generator (h) - h^q mod p = 1
                  </label>
                  <input
                    type="number"
                    value={h}
                    onChange={(e) => setH(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 10"
                  />
                  {hError && (
                    <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                      {hError}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-700 pt-5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Alice's Signing Keys
                  </h4>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Private Key (xA)
                    </label>
                    <input
                      type="number"
                      value={xA}
                      onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 19"
                    />
                    {xAError && (
                      <div className="mt-2 text-xs text-red-400">
                        {xAError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Signature Generation
                  </h4>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Hash H(M)
                    </label>
                    <input
                      type="number"
                      value={H_M}
                      onChange={(e) => setH_M(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 210"
                    />
                    {H_MError && (
                      <div className="mt-2 text-xs text-red-400">
                        {H_MError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Random Nonce (k)
                    </label>
                    <input
                      type="number"
                      value={k}
                      onChange={(e) => setK(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
            </div>

            {/* Key Generation & Signature Generation */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                Key & Signature Generation
              </h3>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 border border-purple-500/20 rounded-2xl p-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    a) Khóa công khai (yA)
                  </div>
                  <div className="text-xs text-slate-500 mb-2 font-mono">
                    yA = h^xA mod p
                  </div>
                  <div className="text-3xl font-black text-purple-400 font-mono">
                    {yA}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-2">
                    {h}^{xA} mod {p} = {yA}
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">Step 1: Compute h^k mod p</div>
                  <div className="text-sm font-mono text-slate-400 mb-2">
                    h^k mod p = {h}^{k} mod {p}
                  </div>
                  <div className="text-xl font-black text-blue-300">
                    {hk}
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">Step 2: r = (h^k mod p) mod q</div>
                  <div className="text-sm font-mono text-slate-400 mb-2">
                    r = {hk} mod {q}
                  </div>
                  <div className="text-2xl font-black text-blue-300">
                    {r}
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">Step 3: s = (H(M) + xA·r) / k mod q</div>
                  <div className="text-sm font-mono text-slate-400 mb-2 text-xs">
                    s = ({H_M} + {xA}·{r}) · k^-1 mod {q}
                  </div>
                  <div className="text-2xl font-black text-cyan-300">
                    {s}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    b) Chữ ký số (r, s)
                  </div>
                  <div className="text-sm font-mono text-blue-200">
                    ({r}, {s})
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Verification */}
            <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                c) Xác minh chữ ký
              </h3>

              <div className="space-y-4">
                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">Step 1: w = s^-1 mod q</div>
                  <div className="text-sm font-mono text-slate-400 mb-2">
                    w = modInverse({s}, {q})
                  </div>
                  <div className="text-xl font-black text-blue-300">
                    {w}
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">Step 2: Calculate u1, u2</div>
                  <div className="space-y-2 text-sm font-mono text-slate-400">
                    <div>u1 = H(M)·w mod q = {H_M}·{w} mod {q}</div>
                    <div>u2 = r·w mod q = {r}·{w} mod {q}</div>
                  </div>
                  <div className="space-y-1 text-xs text-blue-300 mt-2">
                    <div>u1 = {u1}</div>
                    <div>u2 = {u2}</div>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 mb-3 uppercase">Step 3: v = (h^u1 · yA^u2 mod p) mod q</div>
                  <div className="text-sm font-mono text-slate-400 mb-2 text-xs">
                    v = ({h}^{u1} · {yA}^{u2} mod {p}) mod {q}
                  </div>
                  <div className="text-xl font-black text-green-300">
                    {v}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Verification Result
                  </div>
                  {verificationResult ? (
                    <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4">
                      <div className="text-center">
                        <div className="text-3xl font-black text-emerald-400">✓</div>
                        <div className="text-sm font-bold text-emerald-400 mt-2">
                          Valid Signature!
                        </div>
                        <div className="text-[10px] text-emerald-300 mt-1">
                          v == r: {v} == {r}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-4">
                      <div className="text-center">
                        <div className="text-3xl font-black text-red-400">✗</div>
                        <div className="text-sm font-bold text-red-400 mt-2">
                          Invalid Signature
                        </div>
                        <div className="text-[10px] text-red-300 mt-1">
                          v ≠ r: {v} ≠ {r}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Explanation */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              DSA Algorithm Explanation
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">a) Key Generation (Tạo khóa)</h4>
                <div className="bg-slate-950/50 rounded-2xl p-4 space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                      1
                    </div>
                    <div>Select domain parameters: large prime p, prime q dividing (p-1), generator h</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                      2
                    </div>
                    <div>Choose random private key: 0 {'<'} xA {'<'} q</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                      3
                    </div>
                    <div>Calculate public key: <span className="font-mono">yA = h^xA mod p</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">b) Signature Generation (Ký)</h4>
                <div className="bg-slate-950/50 rounded-2xl p-4 space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      1
                    </div>
                    <div>Compute: <span className="font-mono">r = (h^k mod p) mod q</span></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      2
                    </div>
                    <div>Compute: <span className="font-mono">s = (H(M) + xA·r)·k^-1 mod q</span></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                      3
                    </div>
                    <div>Signature: <span className="font-mono">(r, s)</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">c) Signature Verification (Xác minh)</h4>
                <div className="bg-slate-950/50 rounded-2xl p-4 space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      1
                    </div>
                    <div>Compute: <span className="font-mono">w = s^-1 mod q</span></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      2
                    </div>
                    <div>Compute: <span className="font-mono">u1 = H(M)·w mod q, u2 = r·w mod q</span></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      3
                    </div>
                    <div>Compute: <span className="font-mono">v = (h^u1 · yA^u2 mod p) mod q</span></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      4
                    </div>
                    <div>Valid if: <span className="font-mono">v == r</span></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Security Properties</h4>
                <div className="bg-slate-950/50 rounded-2xl p-4 space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>Authentication: Verifies signer identity</div>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>Non-repudiation: Signer cannot deny signing</div>
                  </div>
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>Integrity: Any change to message invalidates signature</div>
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
