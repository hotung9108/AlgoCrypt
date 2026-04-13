import React, { useState, useEffect } from 'react';
import { desEncryptHex, desDecryptHex, desEncryptDebug, type DESDebugSteps } from '@/algorithms/desEncrypt';
import { DESStepVisualizer } from '@/components/DESStepVisualizer';
import DESTablesPage from './DESTablesPage';

const DESPage: React.FC = () => {
  const [key, setKey] = useState('B35F59255E3BCB54');
  const [inputText, setInputText] = useState('32D604E6C4504149');
  const [outputText, setOutputText] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [debugSteps, setDebugSteps] = useState<DESDebugSteps | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [showTables, setShowTables] = useState(false);

  useEffect(() => {
    try {
      const result = isEncrypt 
        ? desEncryptHex(inputText, key)
        : desDecryptHex(inputText, key);
      setOutputText(result);

      // Calculate debug steps for encryption only
      if (isEncrypt && showSteps) {
        const steps = desEncryptDebug(inputText, key);
        setDebugSteps(steps);
      }
    } catch (error) {
      setOutputText('ERROR');
      setDebugSteps(null);
    }
  }, [inputText, key, isEncrypt, showSteps]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                  Algorithm High
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowSteps(false); setShowTables(false); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!showSteps && !showTables ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  NORMAL
                </button>
                <button
                  onClick={() => { setShowSteps(true); setShowTables(false); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showSteps && !showTables ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                  disabled={!isEncrypt}
                  title={!isEncrypt ? 'Chi tiết chỉ hoạt động khi mã hóa' : ''}
                >
                  STEPS
                </button>
                <button
                  onClick={() => { setShowSteps(false); setShowTables(true); }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${showTables ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  TABLES
                </button>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">DES Cipher</h2>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Data Encryption Standard (DES) is a symmetric-key block cipher that encrypts 64-bit blocks using a 56-bit key through 16 rounds of permutations and substitutions.
            </p>
          </header>

          {showTables ? (
            <DESTablesPage />
          ) : showSteps && debugSteps ? (
            <DESStepVisualizer steps={debugSteps} />
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      Input Controller
                    </h3>
                    <div className="flex bg-slate-800 p-1 rounded-lg gap-1">
                      <button 
                        onClick={() => setIsEncrypt(true)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isEncrypt ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Encrypt
                      </button>
                      <button 
                        onClick={() => setIsEncrypt(false)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!isEncrypt ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        Decrypt
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Input (Hex)</label>
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value.toUpperCase())}
                        className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono resize-none"
                        placeholder="16 hex characters (64 bits)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex justify-between">
                        <span>Key (Hex)</span>
                        <span className="text-blue-400 font-semibold">{key.length} chars</span>
                      </label>
                      <input 
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value.toUpperCase())}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                        placeholder="16-character hex key"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Algorithm Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Block Size</div>
                      <div className="text-lg font-bold text-blue-300">64 bits</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Key Size</div>
                      <div className="text-lg font-bold text-blue-300">56 bits</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Rounds</div>
                      <div className="text-lg font-bold text-indigo-300">16</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Standard</div>
                      <div className="text-base font-bold text-indigo-300">FIPS 46-3</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
                    <div className="text-[11px] text-slate-300 uppercase font-semibold tracking-wider mb-2">Process</div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>• Initial Permutation (IP)</div>
                      <div>• 16 Feistel Rounds</div>
                      <div>• Key Schedule (PC1 + PC2)</div>
                      <div>• Final Permutation (IP⁻¹)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/20 rounded-xl p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-base text-white flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {isEncrypt ? 'Encrypted Result' : 'Decrypted Result'}
                    </h3>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(outputText);
                      }}
                      className="px-2.5 py-1.5 text-xs bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-colors text-blue-300 hover:text-blue-200 font-semibold"
                      title="Copy to clipboard"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="flex-1 bg-slate-950/60 border border-blue-500/10 rounded-lg p-4 mb-4">
                    <div className="text-xl font-bold break-all text-blue-200 mono min-h-[100px] flex items-center">
                      {outputText || '—'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Output Type</div>
                      <div className="text-sm font-bold text-white">Hexadecimal</div>
                    </div>
                    <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                      <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Method</div>
                      <div className="text-sm font-bold text-white">DES</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DESPage;
