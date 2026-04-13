import React from 'react';

const AESTablesPage: React.FC = () => {
  // AES S-box
  const SBOX = [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
  ];

  // Rcon values
  const RCON = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36];

  // MixColumns coefficient matrix
  const MIX_MATRIX = [
    [2, 3, 1, 1],
    [1, 2, 3, 1],
    [1, 1, 2, 3],
    [3, 1, 1, 2]
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">AES Reference Tables</h2>
        <p className="text-lg text-slate-400">
          Complete reference for AES-128 algorithm tables and lookup values
        </p>
      </div>

      {/* S-BOX */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold">Table 5.2</span>
          Substitution Box (S-box / SubWord)
        </h3>
        <p className="text-slate-400 mb-6">
          The S-box is an 8-bit to 8-bit substitution table used for byte substitution in SubBytes operation
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="border border-slate-700 px-2 py-2 text-xs font-bold text-slate-300 bg-slate-950 w-12">x\y</th>
                {Array.from({length: 16}, (_, i) => (
                  <th key={i} className="border border-slate-700 px-2 py-2 text-xs font-bold text-slate-300">
                    {i.toString(16).toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({length: 16}, (_, row) => (
                <tr key={row} className="hover:bg-slate-800/30 transition">
                  <td className="border border-slate-700 px-2 py-2 text-xs font-bold text-slate-300 bg-slate-950">
                    {row.toString(16).toUpperCase()}
                  </td>
                  {Array.from({length: 16}, (_, col) => {
                    const value = SBOX[row * 16 + col];
                    return (
                      <td key={col} className="border border-slate-700 px-2 py-2 text-xs font-mono text-blue-300 hover:bg-blue-900/30">
                        {value.toString(16).toUpperCase().padStart(2, '0')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RCON */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-bold">Round Constants</span>
          Rcon[i] for Key Expansion
        </h3>
        <p className="text-slate-400 mb-6">
          Round constants used in the Key Expansion algorithm, applying XOR to the first byte
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {RCON.map((val, i) => (
            <div key={i} className="bg-slate-950 border border-slate-700 rounded-xl p-4 hover:border-green-600/30 transition">
              <div className="text-sm font-semibold text-slate-400 mb-2">Rcon[{i + 1}]</div>
              <div className="font-mono text-2xl text-green-400 font-bold mb-2">
                0x{val.toString(16).toUpperCase().padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-500">
                Round {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MixColumns Matrix */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-bold">MixColumns</span>
          Matrix Coefficients
        </h3>
        <p className="text-slate-400 mb-6">
          The MixColumns operation applies this matrix multiplication in GF(2^8) over each column
        </p>
        <div className="flex justify-center mb-8">
          <div className="bg-slate-950 border-2 border-purple-600/30 rounded-xl p-8 inline-block">
            <div className="font-mono font-bold text-purple-300">
              <div className="flex gap-4 mb-2">
                <span>[</span>
                <div className="flex flex-col gap-2">
                  {MIX_MATRIX.map((row, i) => (
                    <div key={i} className="flex gap-3">
                      {row.map((val, j) => (
                        <span key={j} className="text-2xl w-8 text-center">
                          {val}
                        </span>
                      ))}
                      {i < MIX_MATRIX.length - 1 && <span className="ml-4">×</span>}
                    </div>
                  ))}
                </div>
                <span>]</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4">
          <div className="text-sm text-blue-200">
            <strong>Multiplication in GF(2^8):</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>0x2 × a byte represents multiply by 2 in Galois Field GF(2^8)</li>
              <li>0x3 × a byte represents multiply by 3 in Galois Field GF(2^8)</li>
              <li>Uses irreducible polynomial: x^8 + x^4 + x^3 + x + 1</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AES Key Sizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">AES-128</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Key Size</div>
              <div className="text-2xl font-bold text-blue-300">128 bits</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Rounds</div>
              <div className="text-2xl font-bold text-blue-300">10</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Word Count</div>
              <div className="text-2xl font-bold text-blue-300">44</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">AES-192</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Key Size</div>
              <div className="text-2xl font-bold text-green-300">192 bits</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Rounds</div>
              <div className="text-2xl font-bold text-green-300">12</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Word Count</div>
              <div className="text-2xl font-bold text-green-300">52</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">AES-256</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Key Size</div>
              <div className="text-2xl font-bold text-red-300">256 bits</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Rounds</div>
              <div className="text-2xl font-bold text-red-300">14</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-700">
              <div className="text-slate-400">Word Count</div>
              <div className="text-2xl font-bold text-red-300">60</div>
            </div>
          </div>
        </div>
      </div>

      {/* AES Operations Summary */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">AES Operations Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
              <h4 className="font-bold text-blue-300 mb-2">SubBytes (Substitution)</h4>
              <p className="text-sm text-slate-300">
                Replaces each byte with a value from the S-box using row and column addressing
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
              <h4 className="font-bold text-green-300 mb-2">ShiftRows (Transposition)</h4>
              <p className="text-sm text-slate-300">
                Row 0: No shift, Row 1: 1 byte left, Row 2: 2 bytes left, Row 3: 3 bytes left
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
              <h4 className="font-bold text-purple-300 mb-2">MixColumns (Mixing)</h4>
              <p className="text-sm text-slate-300">
                Performs matrix multiplication in GF(2^8) for each column
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
              <h4 className="font-bold text-amber-300 mb-2">AddRoundKey (Key Addition)</h4>
              <p className="text-sm text-slate-300">
                XOR each byte with the corresponding round key byte
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AESTablesPage;
