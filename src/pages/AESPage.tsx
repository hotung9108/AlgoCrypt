import React, { useState, useEffect } from 'react';
import { aesEncryptHex, aesDecryptHex, aesEncryptDebug, type AESDebugSteps } from '@/algorithms/aesEncrypt';
import { AESStepVisualizer } from '@/components/AESStepVisualizer';
import AESTablesPage from './AESTablesPage';

const AESPage: React.FC = () => {
  const [key, setKey] = useState('6704C20E086B3F537AE5721F486DC559');
  const [inputText, setInputText] = useState('4AEB5D62EC3B55DBF5D5A87708E2FF1E');
  const [outputText, setOutputText] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [debugSteps, setDebugSteps] = useState<AESDebugSteps | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [showTables, setShowTables] = useState(false);

  useEffect(() => {
    try {
      const result = isEncrypt 
        ? aesEncryptHex(inputText, key)
        : aesDecryptHex(inputText, key);
      setOutputText(result);

      // Calculate debug steps for encryption only
      if (isEncrypt && showSteps) {
        const steps = aesEncryptDebug(inputText, key);
        setDebugSteps(steps);
      }
    } catch (error) {
      setOutputText('ERROR');
      setDebugSteps(null);
    }
  }, [inputText, key, isEncrypt, showSteps]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="space-y-3 pb-4 border-b border-slate-800">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">AES-128 Cipher</h2>
                <p className="text-sm text-slate-400 mt-1">Advanced Encryption Standard - symmetric block cipher</p>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => { setShowSteps(false); setShowTables(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!showSteps && !showTables ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Normal
                </button>
                <button
                  onClick={() => { setShowSteps(true); setShowTables(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${showSteps && !showTables ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                  disabled={!isEncrypt}
                  title={!isEncrypt ? 'Steps available for encryption only' : ''}
                >
                  Steps
                </button>
                <button
                  onClick={() => { setShowSteps(false); setShowTables(true); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${showTables ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  Tables
                </button>
              </div>
            </div>
          </header>

          {showTables ? (
            <AESTablesPage />
          ) : showSteps && debugSteps ? (
            <AESStepVisualizer steps={debugSteps} />
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
                      placeholder="32 hex characters (128 bits)"
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
                      placeholder="32-character hex key"
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
                    <div className="text-lg font-bold text-blue-300">128 bits</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Key Size</div>
                    <div className="text-lg font-bold text-blue-300">128 bits</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Rounds</div>
                    <div className="text-lg font-bold text-indigo-300">10</div>
                  </div>
                  <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">Standard</div>
                    <div className="text-base font-bold text-indigo-300">FIPS 197</div>
                  </div>
                </div>
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
                  <div className="text-[11px] text-slate-300 uppercase font-semibold tracking-wider mb-2">Process</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>• Key Expansion (44 words)</div>
                    <div>• AddRoundKey (Initial)</div>
                    <div>• 9 Main Rounds</div>
                    <div>• Final Round (no MixColumns)</div>
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
                    <div className="text-sm font-bold text-white">AES-128</div>
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

export default AESPage;
