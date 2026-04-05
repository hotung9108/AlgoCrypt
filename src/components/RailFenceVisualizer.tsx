import React from 'react';

const RailFenceVisualizer: React.FC<{ text: string, rails: number }> = ({ text, rails }) => {
  const n = Math.min(text.length, 24); 
  const displayGrid: string[][] = Array.from({ length: rails }, () => Array(n).fill(""));

  let rail = 0;
  let direction = 1;
  for (let i = 0; i < n; i++) {
    displayGrid[rail][i] = text[i];
    if (rail === 0) direction = 1;
    else if (rail === rails - 1) direction = -1;
    rail += direction;
  }

  return (
    <div className="w-full overflow-x-auto bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
      <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${rails}, minmax(0, 1fr))` }}>
        {displayGrid.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-2 items-center">
            <div className="w-16 text-[10px] font-bold text-slate-600 uppercase border-r border-slate-800 pr-2">Rail {rIdx + 1}</div>
            <div className="flex gap-1">
              {row.map((char, cIdx) => (
                <div 
                  key={cIdx} 
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-all duration-500 ${
                    char ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 scale-110 shadow-lg shadow-blue-500/10' : 'bg-slate-900/30 text-transparent border border-slate-800/20'
                  }`}
                >
                  {char || "·"}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {text.length > 24 && <p className="text-[10px] text-slate-500 mt-4 italic">* Showing first 24 characters</p>}
    </div>
  );
};

export default RailFenceVisualizer;