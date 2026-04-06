import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  decryptElGamal,
  modPow,
  isPrime,
  isPrimitiveRoot,
} from "@/algorithms/elgamalEncrypt";

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
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-tighter">
                Asymmetric Encryption
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              ElGamal Encryption
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              ElGamal is a public-key cryptosystem based on the discrete logarithm problem. It provides both encryption and digital signatures, using a random number k for each encryption to ensure semantic security.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Parameters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  Setup Parameters
                </h3>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Prime Number (q)
                    </label>
                    <input
                      type="number"
                      value={q}
                      onChange={(e) => setQ(Math.max(2, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 23"
                    />
                    {qError && (
                      <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {qError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Primitive Root (a)
                    </label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 5"
                    />
                    {aError && (
                      <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {aError}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-700 pt-5 mt-5">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                      Alice's Keys
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Private Key (xA)
                      </label>
                      <input
                        type="number"
                        value={xA}
                        onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 6"
                      />
                      {xAError && (
                        <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                          {xAError}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-5 mt-5">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                      Message & Random
                    </h4>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Message (M)
                      </label>
                      <input
                        type="number"
                        value={message}
                        onChange={(e) => setMessage(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 10"
                      />
                      {messageError && (
                        <div className="mt-2 text-xs text-red-400">
                          {messageError}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Random Number (k)
                      </label>
                      <input
                        type="number"
                        value={k}
                        onChange={(e) => setK(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
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
              </div>
            </div>

            {/* Middle Section - Key Generation and Encryption */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.997 5.999h-.001"
                    />
                  </svg>
                  Public Key (PU)
                </h3>

                <div className="space-y-4">
                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Public Key Components
                    </div>
                    <div className="space-y-3 text-sm font-mono">
                      <div>
                        <span className="text-slate-400">q = </span>
                        <span className="text-green-400 font-bold">{q}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">a = </span>
                        <span className="text-green-400 font-bold">{a}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">YA = a^xA mod q = </span>
                        <span className="text-green-400 font-bold">{a}^{xA} mod {q}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl p-4">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Calculated Public Key
                    </div>
                    <div className="text-2xl font-black text-green-400 text-center font-mono">
                      {yA}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-2 text-center">
                      PU = {'{'}{q}, {a}, {yA}{'}'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Encryption Steps
                </h3>

                <div className="space-y-4">
                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-3 font-semibold uppercase">Step 1: C1 = a^k mod q</div>
                    <div className="text-sm font-mono text-slate-400">
                      C1 = {a}^{k} mod {q}
                    </div>
                    <div className="text-2xl font-black text-blue-300 mt-2">
                      C1 = {C1}
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-3 font-semibold uppercase">Step 2: K_enc = YA^k mod q</div>
                    <div className="text-sm font-mono text-slate-400">
                      K_enc = {yA}^{k} mod {q}
                    </div>
                    <div className="text-2xl font-black text-blue-300 mt-2">
                      K_enc = {K_enc}
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-3 font-semibold uppercase">Step 3: C2 = (M * K_enc) mod q</div>
                    <div className="text-sm font-mono text-slate-400">
                      C2 = ({message} * {K_enc}) mod {q}
                    </div>
                    <div className="text-2xl font-black text-blue-300 mt-2">
                      C2 = {C2}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Decryption */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-3">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Decryption Steps
                </h3>

                <div className="space-y-4">
                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-3 font-semibold uppercase">Step 1: K_dec = C1^xA mod q</div>
                    <div className="text-sm font-mono text-slate-400">
                      K_dec = {C1}^{xA} mod {q}
                    </div>
                    <div className="text-2xl font-black text-emerald-300 mt-2">
                      K_dec = {K_dec}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2">
                      Note: K_dec should equal K_enc ({K_enc}) ✓
                    </div>
                  </div>

                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs text-slate-500 mb-3 font-semibold uppercase">Step 2: M = (C2 * K_dec^-1) mod q</div>
                    <div className="text-sm font-mono text-slate-400">
                      M = ({C2} * modInverse({K_dec}, {q})) mod {q}
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-br from-emerald-100 to-green-100 bg-clip-text text-transparent font-mono mt-2">
                      {decrypted}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <div className="flex-1 bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-2 font-semibold">Original:</div>
                      <div className="text-2xl font-bold text-blue-400">{message}</div>
                    </div>
                    <div className="flex-1 bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                      <div className="text-xs text-slate-500 mb-2 font-semibold">Recovered:</div>
                      <div className="text-2xl font-bold text-emerald-400">{decrypted}</div>
                    </div>
                  </div>

                  <div className={`rounded-2xl p-4 ${decrypted === message ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                    <div className={`font-bold text-center ${decrypted === message ? 'text-emerald-400' : 'text-red-400'}`}>
                      {decrypted === message ? '✓ Decryption Successful!' : '✗ Decryption Failed!'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="font-bold text-lg text-slate-100 mb-4">a) Key Generation (Tạo khóa)</h3>
              <div className="space-y-3 text-sm text-slate-400 font-mono text-xs">
                <div className="bg-slate-950/50 rounded-xl p-3">
                  <span className="text-slate-300">Input: q, a, xA</span>
                  <div className="ml-2 mt-1">YA = a^xA mod q</div>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3">
                  <span className="text-slate-300">Output Public Key:</span>
                  <div className="ml-2 mt-1">PU = {'{'}{q}, {a}, {yA}{'}'}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="font-bold text-lg text-slate-100 mb-4">b) Encryption (Mã hóa)</h3>
              <div className="space-y-3 text-sm text-slate-400 font-mono text-xs">
                <div className="bg-slate-950/50 rounded-xl p-3">
                  <span className="text-slate-300">Input: M, k, YA, q</span>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-3">
                  <div>C1 = a^k mod q</div>
                  <div>K_enc = YA^k mod q</div>
                  <div>C2 = (M · K_enc) mod q</div>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3">
                  <span className="text-slate-300">Output Ciphertext:</span>
                  <div className="ml-2 mt-1">(C1, C2) = ({C1}, {C2})</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="font-bold text-lg text-slate-100 mb-4">c) Decryption (Giải mã)</h3>
              <div className="space-y-3 text-sm text-slate-400 font-mono text-xs">
                <div className="bg-slate-950/50 rounded-xl p-3">
                  <span className="text-slate-300">Input: C1, C2, xA, q</span>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-3">
                  <div>K_dec = C1^xA mod q</div>
                  <div>K_inv = modInverse(K_dec, q)</div>
                  <div>M = (C2 · K_inv) mod q</div>
                </div>
                <div className="bg-slate-950/50 rounded-xl p-3">
                  <span className="text-slate-300">Output Message:</span>
                  <div className="ml-2 mt-1">M = {decrypted}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="font-bold text-lg text-slate-100 mb-4">Mathematical Property</h3>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="bg-slate-950/50 rounded-xl p-3 font-mono text-xs">
                  <span className="text-slate-300">Why decryption works:</span>
                  <div className="ml-2 mt-2 space-y-1">
                    <div>C1^xA = (a^k)^xA mod q</div>
                    <div>        = a^(k·xA) mod q</div>
                    <div>        = (a^xA)^k mod q</div>
                    <div>        = YA^k mod q</div>
                    <div>        = K_enc</div>
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
