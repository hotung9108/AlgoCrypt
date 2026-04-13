import React, { useState } from 'react';

interface PermutationTableDisplayProps {
  title: string;
  table: number[];
  cols: number;
  description?: string;
  inputBits?: string;
  outputBits?: string;
}

export const PermutationTableDisplay: React.FC<PermutationTableDisplayProps> = ({
  title,
  table,
  cols,
  description,
  inputBits,
  outputBits,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const inputArray = inputBits ? inputBits.split('') : [];
  const outputArray = outputBits ? outputBits.split('') : [];

  return (
    <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-4 mt-4 space-y-4">
      <div className="mb-3">
        <p className="text-slate-400 text-sm font-semibold">{title}</p>
        {description && <p className="text-slate-500 text-xs mt-1">{description}</p>}
      </div>

      {inputBits && outputBits ? (
        <>
          {/* Input Bits Grid */}
          <div>
            <p className="text-cyan-400 text-xs font-mono font-bold mb-2">Input Bits ({inputArray.length}):</p>
            <div className="overflow-x-auto rounded border border-slate-700">
              <div 
                className="grid gap-1 bg-slate-950 rounded p-3"
                style={{ gridTemplateColumns: `repeat(${inputArray.length}, minmax(28px, 28px))` }}
              >
              {inputArray.map((bit, idx) => {
                const isInTable = table.includes(idx + 1);
                const isHovered = hoveredIdx === idx;
                return (
                  <div
                    key={`in-${idx}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`rounded p-1.5 text-center text-xs font-bold transition-all ${
                      isHovered
                        ? 'bg-yellow-500 text-black border-2 border-yellow-400 scale-110'
                        : isInTable
                        ? 'bg-cyan-600 border-2 border-cyan-400 text-white'
                        : 'bg-slate-700 border border-slate-600 text-slate-400'
                    }`}
                    title={`Input[${idx}] = ${bit}${isInTable ? ' ✓' : ''}`}
                  >
                    <div className="text-[8px] opacity-70">{idx}</div>
                    <div>{bit}</div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          {/* Permutation Table with Real Bit Values */}
          <div>
            <p className="text-amber-400 text-xs font-mono font-bold mb-2">Áp dụng Permutation:</p>
            <div className="overflow-x-auto rounded border border-slate-700">
              <div 
                className="grid gap-1 bg-slate-950 rounded p-3"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(40px, 40px))` }}
              >
              {table.map((inputIdx, outputIdx) => {
                const bitValue = inputArray[inputIdx - 1] || '?';
                const isHovered = hoveredIdx === inputIdx - 1;
                return (
                  <div
                    key={`perm-${outputIdx}`}
                    onMouseEnter={() => setHoveredIdx(inputIdx - 1)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`rounded p-1 text-center transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-yellow-500 text-black border-2 border-yellow-400 scale-110'
                        : 'bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700'
                    }`}
                    title={`Out[${outputIdx}] ← In[${inputIdx - 1}] = ${bitValue}`}
                  >
                    <div className={`text-[8px] ${isHovered ? 'text-black' : 'text-slate-500'} font-semibold`}>
                      {outputIdx}←{inputIdx - 1}
                    </div>
                    <div className={`text-sm font-bold ${isHovered ? 'text-black' : 'text-amber-300'}`}>
                      {bitValue}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
            <p className="text-slate-500 text-[10px] mt-2">
              💡 Mỗi ô: [output_idx]←[input_idx] | bit_value | Hover để xem chi tiết
            </p>
          </div>

          {/* Output Bits Grid */}
          <div>
            <p className="text-green-400 text-xs font-mono font-bold mb-2">Output Bits ({outputArray.length}):</p>
            <div className="overflow-x-auto rounded border border-slate-700">
              <div 
                className="grid gap-1 bg-slate-950 rounded p-3"
                style={{ gridTemplateColumns: `repeat(${outputArray.length}, minmax(28px, 28px))` }}
              >
              {outputArray.map((bit, idx) => {
                const sourceInputIdx = table[idx] - 1;
                const isHovered = hoveredIdx === sourceInputIdx;
                return (
                  <div
                    key={`out-${idx}`}
                    onMouseEnter={() => setHoveredIdx(sourceInputIdx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`rounded p-1.5 text-center text-xs font-bold transition-all cursor-pointer ${
                      isHovered
                        ? 'bg-yellow-500 text-black border-2 border-yellow-400 scale-110'
                        : 'bg-green-700 border-2 border-green-500 text-white'
                    }`}
                    title={`Output[${idx}] = Input[${sourceInputIdx}] = ${bit}`}
                  >
                    <div className="text-[8px] opacity-70">{idx}</div>
                    <div>{bit}</div>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          {/* Detail Mapping Table */}
          <div className="bg-slate-800/40 border border-slate-700 rounded p-3 max-h-48 overflow-y-auto">
            <p className="text-slate-300 text-xs font-mono font-bold mb-2 sticky top-0 bg-slate-800/60">📋 Mapping Chi Tiết:</p>
            <div className="text-[10px] font-mono space-y-1">
              {outputArray.map((bit, idx) => {
                const sourceIdx = table[idx] - 1;
                return (
                  <div key={`map-${idx}`} className="bg-slate-900/50 rounded px-2 py-1 border border-slate-700">
                    <span className="text-green-400 font-bold">Out[{idx}]</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-cyan-400 font-bold">In[{sourceIdx}]</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-amber-300 font-bold">{bit}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-800/60 border border-slate-700 rounded p-3">
            <div className="text-xs text-slate-300 font-mono space-y-1">
              <p><span className="text-cyan-300 font-semibold">Input:</span> <span className="text-cyan-200 break-all">{inputBits}</span></p>
              <p><span className="text-green-300 font-semibold">Output:</span> <span className="text-green-200 break-all">{outputBits}</span></p>
            </div>
          </div>
        </>
      ) : (
        // Fallback
        <div>
          <p className="text-slate-400 text-xs font-mono mb-2">Bảng hoán vị minh họa:</p>
          <div className="grid gap-1 bg-slate-950 rounded p-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(32px, 1fr))` }}>
            {table.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded p-1 text-center hover:bg-slate-700 transition-colors"
                title={`Output[${index}] = Input[${value - 1}]`}
              >
                <div className="text-slate-500 text-[10px]">{index}</div>
                <div className="text-amber-300 font-bold text-xs">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
