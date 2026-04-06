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
          const encrypted = encryptRSA(message, newD, newN);  // Use private key d
          const decrypted = decryptRSA(encrypted, e, newN);   // Use public key e
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
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-tighter">
                Asymmetric Cryptography
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              RSA Algorithm
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              RSA is a widely used public-key cryptographic algorithm. Security depends on the difficulty of factoring large composite numbers. Each user has a public key (e, n) for encryption and a private key (d, n) for decryption.
            </p>
          </header>

          {/* Key Generation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Parameters */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
              <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                Step 1: Input Parameters
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Prime Number (p)
                  </label>
                  <input
                    type="number"
                    value={p}
                    onChange={(e) => setP(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 61"
                  />
                  {pError && (
                    <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {pError}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Prime Number (q)
                  </label>
                  <input
                    type="number"
                    value={q}
                    onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 53"
                  />
                  {qError && (
                    <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {qError}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Public Exponent (e)
                  </label>
                  <input
                    type="number"
                    value={e}
                    onChange={(e) => setE(Math.max(2, parseInt(e.target.value) || 2))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 17"
                  />
                  {eError && (
                    <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {eError}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-700 pt-5">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Message to Encrypt (M)
                  </label>
                  <input
                    type="number"
                    value={message}
                    onChange={(e) => setMessage(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 42"
                  />
                  {messageError && (
                    <div className="mt-2 text-xs text-red-400">{messageError}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Generation Results */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
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
                Step 2: Key Generation
              </h3>

              <div className="space-y-4">
                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    n = p × q
                  </div>
                  <div className="text-2xl font-black text-yellow-400 font-mono">
                    {n}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-2">
                    {p} × {q} = {n}
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    φ(n) = (p-1) × (q-1)
                  </div>
                  <div className="text-2xl font-black text-yellow-400 font-mono">
                    {phi}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-2">
                    ({p}-1) × ({q}-1) = {phi}
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Private Key Exponent (d)
                  </div>
                  <div className="text-2xl font-black text-yellow-400 font-mono">
                    {d}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-2">
                    e × d ≡ 1 (mod φ(n))
                  </div>
                </div>

                {keyValid ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3 text-xs text-green-400 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Keys verified ✓
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 text-xs text-red-400 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Invalid key configuration
                  </div>
                )}
              </div>
            </div>

            {/* Encryption/Decryption Results */}
            <div className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border border-red-500/20 rounded-3xl p-8 shadow-2xl">
              <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Step 3: Encryption & Decryption
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    a) Public Key (PU)
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 space-y-2">
                    <div className="text-[10px] text-slate-400">{`PU = {${e}, ${n}}`}</div>
                    <div className="text-sm font-mono text-red-200">
                      {`{${e}, ${n}}`}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    b) Private Key (PR)
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4 space-y-2">
                    <div className="text-[10px] text-slate-400">{`PR = {${d}, ${n}}`}</div>
                    <div className="text-sm font-mono text-red-200">
                      {`{${d}, ${n}}`}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    c) Encrypted (C = M^d mod n)
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                    <div className="text-3xl font-black bg-gradient-to-br from-red-100 to-pink-100 bg-clip-text text-transparent font-mono">
                      {ciphertext}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-3">
                      {message}^{d} mod {n} = {ciphertext}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    d) Decrypted (M' = C^e mod n)
                  </div>
                  <div className="bg-slate-950/80 border border-white/5 rounded-2xl p-4">
                    <div className="text-3xl font-black bg-gradient-to-br from-red-100 to-pink-100 bg-clip-text text-transparent font-mono">
                      {decrypted}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-3">
                      {ciphertext}^{e} mod {n} = {decrypted}
                    </div>
                  </div>
                </div>

                {message === decrypted && message !== 0 && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3 text-xs text-green-400 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Decryption successful! M = M'
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Algorithm Steps Explanation */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
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
              RSA Algorithm Steps
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Key Generation</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      1
                    </div>
                    <div>
                      Choose two distinct large primes <span className="font-mono">p</span> and <span className="font-mono">q</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      2
                    </div>
                    <div>
                      Calculate <span className="font-mono">n = p × q</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      3
                    </div>
                    <div>
                      Calculate <span className="font-mono">φ(n) = (p-1) × (q-1)</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      4
                    </div>
                    <div>
                      Choose <span className="font-mono">e</span> such that <span className="font-mono">1 &lt; e &lt; φ(n)</span> and <span className="font-mono">gcd(e, φ(n)) = 1</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      5
                    </div>
                    <div>
                      Calculate <span className="font-mono">d</span> such that <span className="font-mono">e × d ≡ 1 (mod φ(n))</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Encryption & Decryption</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      6
                    </div>
                    <div>
                      <strong>Public Key:</strong> <span className="font-mono">{`PU = {${e}, ${n}}`}</span> (publish)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      7
                    </div>
                    <div>
                      <strong>Private Key:</strong> <span className="font-mono">{`PR = {${d}, ${n}}`}</span> (keep secret)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      8
                    </div>
                    <div>
                      <strong>Encryption:</strong> <span className="font-mono">C ≡ M^e (mod n)</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                      9
                    </div>
                    <div>
                      <strong>Decryption:</strong> <span className="font-mono">M ≡ C^d (mod n)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="font-semibold text-white text-sm mb-4">Security Properties</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>Security relies on difficulty of factoring large numbers</div>
                </div>
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>Private key d must be kept secret</div>
                </div>
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>Both p and q should be large (1024+ bits)</div>
                </div>
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>Message must be less than n (M &lt; n)</div>
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
