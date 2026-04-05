import React from 'react';

const CaesarDisk: React.FC<{ shift: number }> = ({ shift }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const size = 300;
  const center = size / 2;
  const outerRadius = 125;
  const innerRadius = 85;

  const getPos = (angle: number, radius: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad)
    };
  };

  return (
    <div className="relative flex items-center justify-center p-4 select-none">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
        <circle cx={center} cy={center} r={outerRadius + 15} className="fill-slate-900 stroke-slate-800" strokeWidth="1" />
        <circle cx={center} cy={center} r={innerRadius + 10} className="fill-slate-950 stroke-blue-500/20" strokeWidth="2" />
        
        <circle cx={center} cy={center} r="40" className="fill-slate-900 stroke-blue-500/40 shadow-inner" strokeWidth="2" />
        <text 
          x={center} y={center + 5} 
          textAnchor="middle" 
          className="fill-blue-400 font-black text-2xl mono"
        >
          {shift}
        </text>
        <text x={center} y={center + 20} textAnchor="middle" className="fill-slate-600 text-[8px] font-bold uppercase tracking-tighter">SHIFT</text>
        
        {alphabet.map((letter, i) => {
          const pos = getPos((i * 360) / 26, outerRadius);
          return (
            <text
              key={`outer-${letter}`}
              x={pos.x} y={pos.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              className="fill-slate-500 font-bold text-[10px]"
            >
              {letter}
            </text>
          );
        })}

        <g style={{ 
          transform: `rotate(${-(shift * 360) / 26}deg)`, 
          transformOrigin: `${center}px ${center}px`,
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
        }}>
          {alphabet.map((letter, i) => {
            const pos = getPos((i * 360) / 26, innerRadius);
            return (
              <text
                key={`inner-${letter}`}
                x={pos.x} y={pos.y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="fill-blue-400 font-black text-[11px] mono"
              >
                {letter}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default CaesarDisk;