import React, { useState, useEffect } from "react";
import { modularExponentiationWithSteps } from "@/algorithms/modularExponentiation";

const ModularExponentiationPage: React.FC = () => {
    const [base, setBase] = useState(397);
    const [exponent, setExponent] = useState(6329);
    const [modulus, setModulus] = useState(6329);
    const [result, setResult] = useState<number | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [expandSteps, setExpandSteps] = useState(true);

    useEffect(() => {
        const calculate = () => {
            const { result, steps } = modularExponentiationWithSteps(base, exponent, modulus);
            setResult(result);
            setSteps(steps);
        };

        calculate();
    }, [base, exponent, modulus]);

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
                            Modular Exponentiation
                        </h2>
                        <p className="text-sm text-slate-400 max-w-2xl">
                            Binary exponentiation: a^m mod n
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    Input
                                </h3>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">Base (a)</label>
                                        <input
                                            type="number"
                                            value={base}
                                            onChange={(e) => setBase(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">Exponent (m)</label>
                                        <input
                                            type="number"
                                            value={exponent}
                                            onChange={(e) => setExponent(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">Modulus (n)</label>
                                        <input
                                            type="number"
                                            value={modulus}
                                            onChange={(e) => setModulus(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-2 gap-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Binary:</span>
                                        <span className="font-mono text-blue-300">{exponent.toString(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Bits:</span>
                                        <span className="font-mono text-blue-300">{exponent.toString(2).length}</span>
                                    </div>
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
                                        Calculation Steps
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
                                    <div className="overflow-y-auto max-h-[350px] space-y-1.5 font-mono text-xs">
                                        {steps.length === 0 ? (
                                            <div className="text-slate-400 text-center py-4">Enter values to calculate</div>
                                        ) : (
                                            steps.map((step, index) => (
                                                <div 
                                                    key={index}
                                                    className="bg-slate-800/40 border-l-2 border-blue-500/60 pl-2 py-1 rounded text-slate-300 hover:bg-slate-800/60 transition-colors whitespace-pre-wrap break-words"
                                                >
                                                    <span className="text-blue-400">{">"}</span> {step}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-6 shadow-xl flex flex-col h-fit">
                                <h3 className="font-bold text-lg text-white flex items-center gap-2 mb-4">
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
                                    Result
                                </h3>

                                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-5 text-center mb-4">
                                    <div className="text-xs text-slate-400 mb-2 font-mono">a^m mod n</div>
                                    <div className="text-4xl font-black tracking-wider text-cyan-300">
                                        {result !== null ? result : "..."}
                                    </div>
                                    {result !== null && (
                                        <div className="text-xs text-slate-400 mt-3 font-mono">
                                            {base}^{exponent} mod {modulus}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-blue-300 font-bold mb-1">Base</div>
                                        <div className="text-white font-mono">{base}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-blue-300 font-bold mb-1">Exponent</div>
                                        <div className="text-white font-mono">{exponent}</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-blue-300 font-bold mb-1">Modulus</div>
                                        <div className="text-white font-mono">{modulus}</div>
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

export default ModularExponentiationPage;