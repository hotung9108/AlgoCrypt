import React from 'react';

const VigenereAutokeyVisualizer: React.FC<{ plaintext: string; initialKey: string; isEncrypt: boolean; output: string }> = ({
  plaintext,
  initialKey,
  isEncrypt,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cleanPlaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
  const cleanInitialKey = initialKey.toUpperCase().replace(/[^A-Z]/g, "");
  
  // Build extended key for autokey: initial key + plaintext
  const extendedKey = cleanInitialKey + cleanPlaintext.slice(0, Math.max(0, cleanPlaintext.length - cleanInitialKey.length));
  const n = Math.min(cleanPlaintext.length, 16);

  // Build visualization data
  const visualizationData = [];

  for (let i = 0; i < n; i++) {
    const char = cleanPlaintext[i];
    const keyChar = extendedKey[i];
    const charIndex = alphabet.indexOf(char);
    const keyCharIndex = alphabet.indexOf(keyChar);

    let resultChar = '';
    let shiftAmount = 0;

    if (charIndex !== -1 && keyCharIndex !== -1) {
      if (isEncrypt) {
        shiftAmount = keyCharIndex;
        const resultIndex = (charIndex + keyCharIndex) % 26;
        resultChar = alphabet[resultIndex];
      } else {
        shiftAmount = keyCharIndex;
        const resultIndex = (charIndex - keyCharIndex + 26) % 26;
        resultChar = alphabet[resultIndex];
      }
    }

    visualizationData.push({
      char,
      keyChar,
      charIndex,
      keyCharIndex,
      shiftAmount,
      resultChar,
      isFromInitialKey: i < cleanInitialKey.length,
    });
  }

  return (
    <div className="w-full space-y-2">
      {/* Visualization Table */}
      <div className="overflow-x-auto bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
        <div className="space-y-2 min-w-max">
          {/* Plaintext Row */}
          <div className="flex items-center gap-2">
            <div className="w-20 text-[9px] font-bold text-slate-600 uppercase">
              {isEncrypt ? 'Plaintext' : 'Ciphertext'}
            </div>
            <div className="flex gap-0.5">
              {visualizationData.map((data, idx) => (
                <div
                  key={`plain-${idx}`}
                  className="w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30"
                >
                  {data.char}
                </div>
              ))}
            </div>
          </div>

          {/* Extended Key Row */}
          <div className="flex items-center gap-2">
            <div className="w-20 text-[9px] font-bold text-slate-600 uppercase">Extended Key</div>
            <div className="flex gap-0.5">
              {visualizationData.map((data, idx) => (
                <div
                  key={`key-${idx}`}
                  className={`w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold border ${
                    data.isFromInitialKey
                      ? 'bg-purple-600/20 text-purple-400 border-purple-500/30'
                      : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                  }`}
                  title={data.isFromInitialKey ? 'From initial key' : 'From plaintext'}
                >
                  {data.keyChar}
                </div>
              ))}
            </div>
          </div>

          {/* Shift Amount Row */}
          <div className="flex items-center gap-2">
            <div className="w-20 text-[9px] font-bold text-slate-600 uppercase">Shift (+)</div>
            <div className="flex gap-0.5">
              {visualizationData.map((data, idx) => (
                <div
                  key={`shift-${idx}`}
                  className="w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold bg-amber-600/20 text-amber-400 border border-amber-500/30"
                >
                  {data.shiftAmount}
                </div>
              ))}
            </div>
          </div>

          {/* Result Row */}
          <div className="flex items-center gap-2">
            <div className="w-20 text-[9px] font-bold text-slate-600 uppercase">
              {isEncrypt ? 'Ciphertext' : 'Plaintext'}
            </div>
            <div className="flex gap-0.5">
              {visualizationData.map((data, idx) => (
                <div
                  key={`result-${idx}`}
                  className="w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold bg-green-600/20 text-green-400 border border-green-500/30 scale-105 shadow-lg shadow-green-500/10"
                >
                  {data.resultChar}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-blue-500/50"></div>
            <span className="text-[9px] text-slate-400">{isEncrypt ? 'Plaintext' : 'Ciphertext'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-purple-500/50"></div>
            <span className="text-[9px] text-slate-400">Initial Key</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-indigo-500/50"></div>
            <span className="text-[9px] text-slate-400">From Plaintext</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-amber-500/50"></div>
            <span className="text-[9px] text-slate-400">Shift Value</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-green-500/50"></div>
            <span className="text-[9px] text-slate-400">Result</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      {cleanPlaintext.length > 0 && cleanInitialKey.length > 0 && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Input Length</div>
              <div className="text-base font-bold text-blue-400">{cleanPlaintext.length}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Initial Key</div>
              <div className="text-base font-bold text-purple-400">{cleanInitialKey.length}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Key from Text</div>
              <div className="text-base font-bold text-indigo-400">
                {Math.max(0, cleanPlaintext.length - cleanInitialKey.length)}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Extended Key</div>
              <div className="text-base font-bold text-amber-400">{extendedKey.length}</div>
            </div>
          </div>
        </div>
      )}

      {cleanPlaintext.length > 16 && (
        <p className="text-[10px] text-slate-500 italic">* Showing first 16 characters of input</p>
      )}
    </div>
  );
};

export default VigenereAutokeyVisualizer;
