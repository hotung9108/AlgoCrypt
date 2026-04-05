import React, { useState, useEffect } from 'react';
import { aesEncryptHex, aesDecryptHex } from '@/algorithms/aesEncrypt';

const AESPage: React.FC = () => {
  const [key, setKey] = useState('6704C20E086B3F537AE5721F486DC559');
  const [inputText, setInputText] = useState('4AEB5D62EC3B55DBF5D5A87708E2FF1E');
  const [outputText, setOutputText] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);

  useEffect(() => {
    try {
      const result = isEncrypt 
        ? aesEncryptHex(inputText, key)
        : aesDecryptHex(inputText, key);
      setOutputText(result);
    } catch (error) {
      setOutputText('ERROR');
    }
  }, [inputText, key, isEncrypt]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                Algorithm High
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">AES-128 Cipher</h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Advanced Encryption Standard (AES) is a symmetric-key block cipher that encrypts 128-bit blocks using a 128-bit key through 10 rounds of SubBytes, ShiftRows, MixColumns, and AddRoundKey transformations.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    Input Controller
                  </h3>
                  <div className="flex bg-slate-800 p-1 rounded-xl">
                    <button 
                      onClick={() => setIsEncrypt(true)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isEncrypt ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      ENCRYPT
                    </button>
                    <button 
                      onClick={() => setIsEncrypt(false)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isEncrypt ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                      DECRYPT
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Plaintext / Ciphertext (Hex)</label>
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value.toUpperCase())}
                      className="w-full h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono resize-none"
                      placeholder="Enter hex text (32 characters, 128 bits)..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
                      <span>Key (Hex)</span>
                      <span className="text-blue-400 font-bold">{key.length} chars</span>
                    </label>
                    <input 
                      type="text"
                      value={key}
                      onChange={(e) => setKey(e.target.value.toUpperCase())}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                      placeholder="Enter 32-character hex key (128 bits)..."
                    />
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
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Block Size</div>
                        <div className="text-2xl font-bold text-blue-300">128 bits</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Key Size</div>
                        <div className="text-2xl font-bold text-blue-300">128 bits</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Rounds</div>
                        <div className="text-2xl font-bold text-indigo-300">10</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Standard</div>
                        <div className="text-xl font-bold text-indigo-300 truncate">FIPS 197</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-4 mt-4">
                      <div className="text-[10px] text-blue-300 uppercase font-bold tracking-wider mb-2">Process</div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div>• Key Expansion (44 words)</div>
                        <div>• AddRoundKey (Initial)</div>
                        <div>• 9 Main Rounds</div>
                        <div>• Final Round (no MixColumns)</div>
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
                    {isEncrypt ? 'Encrypted Result' : 'Decrypted Result'}
                  </h3>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(outputText);
                    }}
                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors group"
                  >
                    <svg className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 bg-slate-950/80 border border-white/5 rounded-2xl p-6 overflow-y-auto scrollbar-hide">
                  <div className="text-2xl font-black tracking-widest break-all leading-relaxed bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent mono">
                    {outputText || 'NO OUTPUT'}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Output Type</div>
                    <div className="text-xl font-bold text-white truncate">Hexadecimal</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <div className="text-[10px] text-blue-300 uppercase font-bold tracking-tighter mb-1">Method</div>
                    <div className="text-xl font-bold text-white truncate">AES-128</div>
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

export default AESPage;
