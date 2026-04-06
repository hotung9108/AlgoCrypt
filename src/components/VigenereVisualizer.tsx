import React from 'react';

const VigenereVisualizer: React.FC<{ plaintext: string; keyValue: string; isEncrypt: boolean; output: string }> = ({
  plaintext,
  keyValue,
  isEncrypt,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cleanPlaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
  const cleanKey = keyValue.toUpperCase().replace(/[^A-Z]/g, "");
  const n = Math.min(cleanPlaintext.length, 16);

  // Build visualization data
  const visualizationData = [];
  let keyIndex = 0;

  for (let i = 0; i < n; i++) {
    const char = cleanPlaintext[i];
    const keyChar = cleanKey[keyIndex % cleanKey.length];
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
      keyIndex++;
    }

    visualizationData.push({
      char,
      keyChar,
      charIndex,
      keyCharIndex,
      shiftAmount,
      resultChar,
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

          {/* Key Row */}
          <div className="flex items-center gap-2">
            <div className="w-20 text-[9px] font-bold text-slate-600 uppercase">Key (repeating)</div>
            <div className="flex gap-0.5">
              {visualizationData.map((data, idx) => (
                <div
                  key={`key-${idx}`}
                  className="w-8 h-8 flex items-center justify-center rounded text-[10px] font-bold bg-purple-600/20 text-purple-400 border border-purple-500/30"
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
        <div className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-blue-500/50"></div>
            <span className="text-[9px] text-slate-400">{isEncrypt ? 'Plaintext' : 'Ciphertext'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-purple-500/50"></div>
            <span className="text-[9px] text-slate-400">Key Char</span>
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
      {cleanPlaintext.length > 0 && cleanKey.length > 0 && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Input Length</div>
              <div className="text-base font-bold text-blue-400">{cleanPlaintext.length}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Key Length</div>
              <div className="text-base font-bold text-purple-400">{cleanKey.length}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 uppercase font-bold mb-0.5">Key Cycles</div>
              <div className="text-base font-bold text-amber-400">
                {Math.ceil(cleanPlaintext.length / cleanKey.length)}x
              </div>
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

export default VigenereVisualizer;
