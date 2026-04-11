import React, { useState, useEffect } from "react";
import { modularInverseWithSteps} from "@/algorithms/modularInverse";
import type { EuclideanTableRow } from "@/algorithms/modularInverse";
const ModularInversePage: React.FC = () => {
    const [a, setA] = useState(1885);
    const [n, setN] = useState(6563);
    const [result, setResult] = useState<number | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [tableRows, setTableRows] = useState<EuclideanTableRow[]>([]);
    const [expandSteps, setExpandSteps] = useState(true);

    useEffect(() => {
        const calculate = () => {
            const { result, steps, tableRows } = modularInverseWithSteps(a, n);
            setResult(result);
            setSteps(steps);
            setTableRows(tableRows);
        };

        calculate();
    }, [a, n]);

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <header className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-tighter">
                                Algorithm
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            Modular Inverse
                        </h2>
                        <p className="text-sm text-slate-400 max-w-2xl">
                            Find x = a<sup>-1</sup> mod n using Extended Euclidean Algorithm
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                    Input
                                </h3>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 mb-1">
                                            a
                                        </label>
                                        <input
                                            type="number"
                                            value={a}
                                            onChange={(e) => setA(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="Number..."
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
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all mono"
                                            placeholder="Modulus..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 3v2m6-2v2M9 5h6m-1 4v10m-4-10v10m-5-3h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Algorithm Table
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-[11px] font-mono">
                                        <thead>
                                            <tr className="border-b border-purple-500/40 text-purple-300 bg-slate-800/30">
                                                <th className="px-1.5 py-1.5 text-center font-bold">Q</th>
                                                <th className="px-1.5 py-1.5 text-center font-bold">A2</th>
                                                <th className="px-1.5 py-1.5 text-center font-bold">A1</th>
                                                <th className="px-1.5 py-1.5 text-center font-bold">A3</th>
                                                <th className="px-1.5 py-1.5 text-center font-bold border-l border-slate-700">B2</th>
                                                <th className="px-1.5 py-1.5 text-center font-bold">B1</th>
                                                <th className="px-1.5 py-1.5 text-center font-bold">B3</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="text-center py-4 text-slate-400 text-xs">
                                                        Enter values to see the table
                                                    </td>
                                                </tr>
                                            ) : (
                                                tableRows.map((row, index) => (
                                                    <tr 
                                                        key={index}
                                                        className={`border-b border-slate-800/50 transition-colors ${
                                                            index % 2 === 0 ? 'bg-slate-800/10' : 'bg-slate-900/10'
                                                        } hover:bg-slate-800/30`}
                                                    >
                                                        <td className="px-1.5 py-1 text-center text-slate-300 font-bold">{row.q}</td>
                                                        <td className="px-1.5 py-1 text-center text-purple-300">{row.a2}</td>
                                                        <td className="px-1.5 py-1 text-center text-purple-300">{row.a1}</td>
                                                        <td className="px-1.5 py-1 text-center text-purple-400 font-bold bg-purple-900/20">{row.a3}</td>
                                                        <td className="px-1.5 py-1 text-center text-cyan-300 border-l border-slate-700">{row.b2}</td>
                                                        <td className="px-1.5 py-1 text-center text-cyan-300">{row.b1}</td>
                                                        <td className="px-1.5 py-1 text-center text-cyan-400 font-bold bg-cyan-900/20">{row.b3}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden">
                                <button 
                                    onClick={() => setExpandSteps(!expandSteps)}
                                    className="w-full flex items-center justify-between mb-3 text-sm font-bold text-slate-100 hover:text-purple-300 transition-colors group"
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
                                        Steps
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
                                                    className="bg-slate-800/40 border-l-2 border-purple-500/60 pl-2 py-1 rounded text-slate-300 hover:bg-slate-800/60 transition-colors"
                                                >
                                                    <span className="text-purple-400">{">"}</span> {step}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl p-6 shadow-xl flex flex-col h-fit">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                        Result
                                    </h3>
                                    <button
                                        onClick={() => {
                                            if (result !== null && result !== -1) {
                                                navigator.clipboard.writeText(result.toString());
                                            }
                                        }}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                        title="Copy"
                                    >
                                        <svg
                                            className="w-4 h-4 text-purple-200"
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

                                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-5 flex flex-col justify-center items-center">
                                    {result === -1 ? (
                                        <div className="text-center">
                                            <div className="text-base font-bold text-red-400">NO INVERSE</div>
                                            <div className="text-xs text-slate-400 mt-1">gcd({a}, {n}) ≠ 1</div>
                                        </div>
                                    ) : result !== null ? (
                                        <div className="text-center">
                                            <div className="text-xs text-slate-400 mb-2 font-mono">x = a^(-1) mod n</div>
                                            <div className="text-4xl font-black tracking-wider bg-gradient-to-br from-purple-100 to-purple-300 bg-clip-text text-transparent mono">
                                                {result}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-400">Enter values</div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-purple-300 font-bold mb-1">Verify</div>
                                        <div className="font-mono text-white break-words">
                                            {result && result !== -1 ? `${a} × ${result} ≡ ${(a * result) % n}` : "—"}
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-purple-300 font-bold mb-1">Method</div>
                                        <div className="text-white font-semibold">Extended GCD</div>
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

export default ModularInversePage;
