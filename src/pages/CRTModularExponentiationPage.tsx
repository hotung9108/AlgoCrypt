import React, { useState, useEffect } from "react";
import { crtModularExponentiation, directModularExponentiation } from "@/algorithms/chineseRemainderTheorem";
import type { CRTStep } from "@/algorithms/chineseRemainderTheorem";

const CRTModularExponentiationPage: React.FC = () => {
    const [a, setA] = useState(227);
    const [k, setK] = useState(80);
    const [n, setN] = useState(60421);
    const [result, setResult] = useState<number | null>(null);
    const [directResult, setDirectResult] = useState<number | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [crtSteps, setCRTSteps] = useState<CRTStep[]>([]);
    const [primeFactors, setPrimeFactors] = useState<number[]>([]);
    const [expandSteps, setExpandSteps] = useState(true);

    useEffect(() => {
        const calculate = () => {
            const { result, steps, primeFactors, crtSteps } = crtModularExponentiation(a, k, n);
            const direct = directModularExponentiation(a, k, n);
            
            setResult(result);
            setDirectResult(direct);
            setSteps(steps);
            setCRTSteps(crtSteps);
            setPrimeFactors(primeFactors);
        };

        calculate();
    }, [a, k, n]);

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
                            CRT Modular Exponentiation
                        </h2>
                        <p className="text-sm text-slate-400 max-w-2xl">
                            Tính b = a<sup>k</sup> mod n sử dụng Định lý Số dư Trung Hoa
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    Input Parameters
                                </h3>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            a (base)
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
                                            k (exponent)
                                        </label>
                                        <input
                                            type="number"
                                            value={k}
                                            onChange={(e) => setK(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="k"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            n (modulus)
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
                                    CRT Steps
                                </h3>
                                <div className="bg-slate-950/60 rounded-lg p-3 font-mono text-xs space-y-2 max-h-[250px] overflow-y-auto">
                                    {crtSteps.length === 0 ? (
                                        <span className="text-slate-400">Enter values to see CRT steps</span>
                                    ) : (
                                        crtSteps.map((step, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-slate-800/40 p-2 rounded border border-slate-700/50 hover:border-slate-600">
                                                <span className="text-cyan-300">p<sub>{idx + 1}</sub> = {step.prime}</span>
                                                <span className="text-slate-400">→</span>
                                                <span className="text-cyan-300">{a}^{k} mod {step.prime} = <span className="font-bold text-blue-300">{step.modularExp}</span></span>
                                            </div>
                                        ))
                                    )}
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
                                        Detailed Steps
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

                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-6 shadow-xl flex flex-col h-fit">
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
                                        Result (CRT)
                                    </h3>
                                    <button
                                        onClick={() => {
                                            if (result !== null) {
                                                navigator.clipboard.writeText(result.toString());
                                            }
                                        }}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                        title="Copy"
                                    >
                                        <svg
                                            className="w-4 h-4 text-blue-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-5 flex flex-col justify-center items-center mb-4">
                                    {result !== null ? (
                                        <div className="text-center w-full">
                                            <div className="text-xs text-slate-400 mb-2 font-mono">b = a^k mod n</div>
                                            <div className="text-5xl font-black tracking-wider bg-gradient-to-br from-blue-100 to-cyan-300 bg-clip-text text-transparent mono">
                                                {result}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-400">Enter values to calculate</div>
                                    )}
                                </div>

                                <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 mb-4">
                                    <div className="text-xs text-slate-400 font-mono mb-1">Direct Calculation (verification)</div>
                                    <div className="text-2xl font-bold text-cyan-300 mono">
                                        {directResult !== null ? directResult : '—'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-blue-300 font-bold mb-1">Formula</div>
                                        <div className="text-white font-mono text-[10px] break-words">
                                            CRT: b = a^k mod n
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-blue-300 font-bold mb-1">Prime Factors</div>
                                        <div className="text-white font-semibold text-[10px]">
                                            {primeFactors.length > 0 ? primeFactors.join(", ") : "—"}
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

export default CRTModularExponentiationPage;
