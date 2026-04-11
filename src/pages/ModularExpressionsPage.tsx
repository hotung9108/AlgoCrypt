import React, { useState, useEffect } from "react";
import { calculateModularExpressions } from "@/algorithms/modularExpressions";
import type { ModularExpressionStep } from "@/algorithms/modularExpressions";

const ModularExpressionsPage: React.FC = () => {
    const [a, setA] = useState(37);
    const [b, setB] = useState(97);
    const [x, setX] = useState(581);
    const [y, setY] = useState(364);
    const [n, setN] = useState(127);
    
    const [A1, setA1] = useState<number>(0);
    const [A2, setA2] = useState<number>(0);
    const [A3, setA3] = useState<number>(0);
    const [A4, setA4] = useState<number | null>(null);
    const [A5, setA5] = useState<number | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [detailSteps, setDetailSteps] = useState<ModularExpressionStep[]>([]);
    const [expandSteps, setExpandSteps] = useState(true);

    useEffect(() => {
        const calculate = () => {
            const result = calculateModularExpressions(a, b, x, y, n);
            setA1(result.A1);
            setA2(result.A2);
            setA3(result.A3);
            setA4(result.A4);
            setA5(result.A5);
            setSteps(result.steps);
            setDetailSteps(result.detailSteps);
        };

        calculate();
    }, [a, b, x, y, n]);

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <header className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                                Number Theory
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            Basic Modular Expressions
                        </h2>
                        <p className="text-sm text-slate-400 max-w-2xl">
                            Tính các biểu thức modulo cơ bản: A1, A2, A3, A4, A5
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    Input
                                </h3>

                                <div className="grid grid-cols-5 gap-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            a
                                        </label>
                                        <input
                                            type="number"
                                            value={a}
                                            onChange={(e) => setA(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="a"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            b
                                        </label>
                                        <input
                                            type="number"
                                            value={b}
                                            onChange={(e) => setB(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="b"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            x
                                        </label>
                                        <input
                                            type="number"
                                            value={x}
                                            onChange={(e) => setX(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="x"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            y
                                        </label>
                                        <input
                                            type="number"
                                            value={y}
                                            onChange={(e) => setY(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="y"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            n
                                        </label>
                                        <input
                                            type="number"
                                            value={n}
                                            onChange={(e) => setN(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="n"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-cyan-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    Expression Results
                                </h3>
                                <div className="bg-slate-950/60 rounded-lg p-3 font-mono text-xs space-y-2">
                                    {detailSteps.map((step, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-slate-800/40 p-2 rounded border border-slate-700/50 hover:border-slate-600">
                                            <span className="text-blue-300 font-bold min-w-[40px]">{step.label}</span>
                                            <span className="text-slate-400">→</span>
                                            <span className="text-slate-300 flex-1 text-right">
                                                {step.result !== null ? (
                                                    <span className="text-green-300 font-bold">{step.result}</span>
                                                ) : (
                                                    <span className="text-orange-300">No inverse</span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden">
                                <button 
                                    onClick={() => setExpandSteps(!expandSteps)}
                                    className="w-full flex items-center justify-between mb-3 text-sm font-bold text-slate-100 hover:text-blue-300 transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg
                                            className="w-4 h-4 text-indigo-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                        Detailed Calculations
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${expandSteps ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                                    </svg>
                                </button>
                                {expandSteps && (
                                    <div className="overflow-y-auto max-h-[400px] space-y-1.5 font-mono text-xs">
                                        {steps.length === 0 ? (
                                            <div className="text-slate-400 text-center py-4">Enter values to see steps</div>
                                        ) : (
                                            steps.map((step, index) => (
                                                <div 
                                                    key={index}
                                                    className={`border-l-2 pl-2 py-1 rounded ${
                                                        step.startsWith('✗') ? 'border-red-500/60 text-red-300' :
                                                        step.startsWith('✓') ? 'border-green-500/60 text-green-300' :
                                                        step.startsWith('Bước') ? 'border-blue-500/60 text-blue-300' :
                                                        'border-slate-600/60 text-slate-300'
                                                    } hover:bg-slate-800/60 transition-colors whitespace-pre-wrap break-words bg-slate-800/40 rounded`}
                                                >
                                                    <span className="text-blue-400">{">"}</span> {step}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
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
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Results
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {/* A1 */}
                                    <div className="bg-slate-950/80 border border-white/5 rounded-lg p-4">
                                        <div className="text-xs text-slate-400 mb-1 font-mono">A1 = (ax + by) mod n</div>
                                        <div className="text-2xl font-black text-green-300">{A1}</div>
                                    </div>

                                    {/* A2 */}
                                    <div className="bg-slate-950/80 border border-white/5 rounded-lg p-4">
                                        <div className="text-xs text-slate-400 mb-1 font-mono">A2 = (ax - by) mod n</div>
                                        <div className="text-2xl font-black text-green-300">{A2}</div>
                                    </div>

                                    {/* A3 */}
                                    <div className="bg-slate-950/80 border border-white/5 rounded-lg p-4">
                                        <div className="text-xs text-slate-400 mb-1 font-mono">A3 = (ax * by) mod n</div>
                                        <div className="text-2xl font-black text-green-300">{A3}</div>
                                    </div>

                                    {/* A4 */}
                                    <div className="bg-slate-950/80 border border-white/5 rounded-lg p-4">
                                        <div className="text-xs text-slate-400 mb-1 font-mono">A4 = (by)^(-1) mod n</div>
                                        <div className="text-2xl font-black">
                                            {A4 !== null ? (
                                                <span className="text-green-300">{A4}</span>
                                            ) : (
                                                <span className="text-orange-300">No inverse</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* A5 */}
                                    <div className="bg-slate-950/80 border border-white/5 rounded-lg p-4">
                                        <div className="text-xs text-slate-400 mb-1 font-mono">A5 = (ax / by) mod n</div>
                                        <div className="text-2xl font-black">
                                            {A5 !== null ? (
                                                <span className="text-green-300">{A5}</span>
                                            ) : (
                                                <span className="text-orange-300">Cannot compute</span>
                                            )}
                                        </div>
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

export default ModularExpressionsPage;
