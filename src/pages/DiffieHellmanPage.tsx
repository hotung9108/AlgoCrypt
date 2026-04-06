import React, { useState, useEffect } from "react";
import {
  calculatePublicKey,
  calculateSharedSecret,
  isPrime,
  isPrimitiveRoot,
} from "@/algorithms/diffieHellmanEncrypt";

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
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-tighter">
                Key Exchange Protocol
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Diffie-Hellman Key Exchange
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              A cryptographic protocol that allows two parties to establish a shared secret key over an insecure channel. The security is based on the difficulty of computing discrete logarithms.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Parameters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                  Public Parameters
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g., 23"
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
                      Primitive Root (a)
                    </label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
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
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      Party A
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Private Key (xA)
                      </label>
                      <input
                        type="number"
                        value={xA}
                        onChange={(e) => setXA(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 6"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      Party B
                    </h4>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Private Key (xB)
                      </label>
                      <input
                        type="number"
                        value={xB}
                        onChange={(e) => setXB(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        placeholder="e.g., 15"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section - Exchange Process */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <h3 className="font-bold text-lg text-slate-100 mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Public Keys
                </h3>

                <div className="space-y-5">
                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Party A Public Key
                    </div>
                    <div className="text-sm text-slate-400 mb-2 font-mono text-center">
                      yA = a^xA mod q
                    </div>
                    <div className="text-3xl font-black text-amber-400 text-center font-mono">
                      {yA}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-3 text-center">
                      {a}^{xA} mod {q} = {yA}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <svg
                      className="w-6 h-6 text-slate-500 rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Party B Public Key
                    </div>
                    <div className="text-sm text-slate-400 mb-2 font-mono text-center">
                      yB = a^xB mod q
                    </div>
                    <div className="text-3xl font-black text-amber-400 text-center font-mono">
                      {yB}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-3 text-center">
                      {a}^{xB} mod {q} = {yB}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Shared Secret */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-500/20 rounded-3xl p-8 shadow-2xl h-full flex flex-col">
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-amber-400"
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
                    Shared Secret Key
                  </h3>

                  <div className="flex-1 flex flex-col justify-center items-center bg-slate-950/80 border border-white/5 rounded-2xl p-8 mb-6">
                    <div className="text-xs text-slate-400 mb-4 font-mono">
                      K = yB^xA mod q
                    </div>
                    <div className="text-xs text-slate-400 mb-2 font-mono">
                      OR
                    </div>
                    <div className="text-xs text-slate-400 mb-6 font-mono">
                      K = yA^xB mod q
                    </div>
                    <div className="text-5xl font-black bg-gradient-to-br from-amber-100 to-orange-100 bg-clip-text text-transparent font-mono">
                      {sharedSecret}
                    </div>
                    <div className="mt-8 text-center text-[10px] text-slate-500">
                      <div className="mb-2">Party A: {yB}^{xA} mod {q} = {sharedSecret}</div>
                      <div>Party B: {yA}^{xB} mod {q} = {sharedSecret}</div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                    <div className="text-[10px] text-amber-300 uppercase font-bold tracking-tighter mb-2">
                      ✓ Both parties have the same key!
                    </div>
                    <div className="text-xs text-slate-300">
                      The shared key can now be used for symmetric encryption.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Explanation */}
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
              How It Works
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Setup Phase</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                      1
                    </div>
                    <div>
                      <span className="font-mono">q</span>: A large prime number (publicly known)
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
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
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                      3
                    </div>
                    <div>
                      Party A: Calculate <span className="font-mono">yA = a^xA mod q</span>, send yA
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                      4
                    </div>
                    <div>
                      Party B: Calculate <span className="font-mono">yB = a^xB mod q</span>, send yB
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Key Agreement Phase</h4>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                      5
                    </div>
                    <div>
                      Party A: Calculate <span className="font-mono">K = yB^xA mod q</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                      6
                    </div>
                    <div>
                      Party B: Calculate <span className="font-mono">K = yA^xB mod q</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white text-sm">Security Features</h4>
                <div className="space-y-3 text-sm text-slate-300">
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
                    <div>Private keys (xA, xB) never transmitted</div>
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
