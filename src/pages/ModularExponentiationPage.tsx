import React, { useState, useEffect } from "react";
import { modularExponentiationWithSteps, fermatTheoremExponentiation, eulerTheoremExponentiation } from "@/algorithms/modularExponentiation";

const ModularExponentiationPage: React.FC = () => {
    const [base, setBase] = useState(397);
    const [exponent, setExponent] = useState(6329);
    const [modulus, setModulus] = useState(6329);
    const [result, setResult] = useState<number | null>(null);
    const [steps, setSteps] = useState<string[]>([]);
    const [expandSteps, setExpandSteps] = useState(true);
    const [fermatResult, setFermatResult] = useState<number | null>(null);
    const [fermatSteps, setFermatSteps] = useState<string[]>([]);
    const [fermatMessage, setFermatMessage] = useState("");
    const [fermatCanUse, setFermatCanUse] = useState(false);
    const [expandFermatSteps, setExpandFermatSteps] = useState(true);
    const [eulerResult, setEulerResult] = useState<number | null>(null);
    const [eulerSteps, setEulerSteps] = useState<string[]>([]);
    const [eulerMessage, setEulerMessage] = useState("");
    const [eulerCanUse, setEulerCanUse] = useState(false);
    const [expandEulerSteps, setExpandEulerSteps] = useState(true);

    useEffect(() => {
        const calculate = () => {
            const { result, steps } = modularExponentiationWithSteps(base, exponent, modulus);
            setResult(result);
            setSteps(steps);
        };

        calculate();
    }, [base, exponent, modulus]);

    useEffect(() => {
        const calculateFermat = () => {
            const { result, steps, canUseFermat, message } = fermatTheoremExponentiation(base, exponent, modulus);
            setFermatResult(result);
            setFermatSteps(steps);
            setFermatCanUse(canUseFermat);
            setFermatMessage(message);
        };

        calculateFermat();
    }, [base, exponent, modulus]);

    useEffect(() => {
        const calculateEuler = () => {
            const { result, steps, canUseEuler, message } = eulerTheoremExponentiation(base, exponent, modulus);
            setEulerResult(result);
            setEulerSteps(steps);
            setEulerCanUse(canUseEuler);
            setEulerMessage(message);
        };

        calculateEuler();
    }, [base, exponent, modulus]);

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-4">
                    {/* Header */}
                    <header className="space-y-2 pb-4">
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

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Left Column - Input */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <h3 className="font-bold text-sm text-slate-100 mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    Input
                                </h3>

                                <div className="space-y-2">
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

                                <div className="mt-3 pt-3 border-t border-slate-700 space-y-2 text-xs">
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
                        </div>

                        {/* Middle Column - Result */}
                        <div className="lg:col-span-1">
                            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-2xl p-4 shadow-xl flex flex-col h-fit">
                                <h3 className="font-bold text-base text-white flex items-center gap-2 mb-3">
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

                                <div className="bg-slate-950/80 border border-white/5 rounded-xl p-4 text-center">
                                    <div className="text-xs text-slate-400 mb-2 font-mono">a^m mod n</div>
                                    <div className="text-3xl font-black tracking-wider text-cyan-300">
                                        {result !== null ? result : "..."}
                                    </div>
                                    {result !== null && (
                                        <div className="text-xs text-slate-400 mt-2 font-mono">
                                            {base}^{exponent} mod {modulus}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Comparison Status */}
                        <div className="lg:col-span-1 space-y-3">
                            {/* Fermat Status Card */}
                            <div className={`p-3 rounded-lg border-l-4 ${
                                fermatCanUse 
                                    ? 'bg-emerald-900/20 border-l-emerald-500' 
                                    : 'bg-red-900/20 border-l-red-500'
                            }`}>
                                <div className="flex items-start gap-2">
                                    <svg
                                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${fermatCanUse ? 'text-emerald-400' : 'text-red-400'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        {fermatCanUse ? (
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        ) : (
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        )}
                                    </svg>
                                    <div className="min-w-0">
                                        <div className={`text-xs font-semibold ${fermatCanUse ? 'text-emerald-300' : 'text-red-300'}`}>Fermat</div>
                                        <div className={`text-xs ${fermatCanUse ? 'text-emerald-200' : 'text-red-200'}`}>
                                            {fermatMessage.replace("Có thể sử dụng Định lý Fermat", "Usable").replace("Không thể sử dụng Fermat: ", "")}
                                        </div>
                                        {fermatCanUse && fermatResult !== null && (
                                            <div className="text-xs font-mono font-bold text-emerald-300 mt-1">{fermatResult}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Euler Status Card */}
                            <div className={`p-3 rounded-lg border-l-4 ${
                                eulerCanUse 
                                    ? 'bg-violet-900/20 border-l-violet-500' 
                                    : 'bg-red-900/20 border-l-red-500'
                            }`}>
                                <div className="flex items-start gap-2">
                                    <svg
                                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${eulerCanUse ? 'text-violet-400' : 'text-red-400'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        {eulerCanUse ? (
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        ) : (
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        )}
                                    </svg>
                                    <div className="min-w-0">
                                        <div className={`text-xs font-semibold ${eulerCanUse ? 'text-violet-300' : 'text-red-300'}`}>Euler</div>
                                        <div className={`text-xs ${eulerCanUse ? 'text-violet-200' : 'text-red-200'}`}>
                                            {eulerMessage.replace("Có thể sử dụng Định lý Euler", "Usable").replace("Không thể sử dụng Euler: ", "")}
                                        </div>
                                        {eulerCanUse && eulerResult !== null && (
                                            <div className="text-xs font-mono font-bold text-violet-300 mt-1">{eulerResult}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Calculation Steps */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden">
                            <button 
                                onClick={() => setExpandSteps(!expandSteps)}
                                className="w-full flex items-center justify-between mb-3 text-sm font-bold text-slate-100 hover:text-blue-300 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-blue-400"
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
                                <div className="overflow-y-auto max-h-[220px] space-y-1 font-mono text-xs">
                                    {steps.length === 0 ? (
                                        <div className="text-slate-400 text-center py-4">Enter values to calculate</div>
                                    ) : (
                                        steps.map((step, index) => (
                                            <div 
                                                key={index}
                                                className="bg-slate-800/40 border-l-2 border-blue-500/60 pl-2 py-1 rounded text-slate-300 text-xs whitespace-pre-wrap break-words"
                                            >
                                                <span className="text-blue-400">{">"}  </span>{step}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Fermat Steps */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden">
                            <button 
                                onClick={() => setExpandFermatSteps(!expandFermatSteps)}
                                className="w-full flex items-center justify-between mb-3 text-sm font-bold text-slate-100 hover:text-emerald-300 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-emerald-400"
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
                                    Fermat Steps
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${expandFermatSteps ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                                </svg>
                            </button>
                            {expandFermatSteps && (
                                <div className="overflow-y-auto max-h-[220px] space-y-1 font-mono text-xs">
                                    {fermatSteps.length === 0 ? (
                                        <div className="text-slate-400 text-center py-4">Enter values to calculate</div>
                                    ) : (
                                        fermatSteps.map((step, index) => (
                                            <div 
                                                key={index}
                                                className={`${
                                                    step === "" 
                                                        ? "h-0.5" 
                                                        : `bg-slate-800/40 border-l-2 border-emerald-500/60 pl-2 py-1 rounded text-slate-300 text-xs whitespace-pre-wrap break-words ${
                                                            step.includes("✓") || step.includes("Kết quả cuối cùng") 
                                                                ? "font-bold text-emerald-300" 
                                                                : ""
                                                        }`
                                                }`}
                                            >
                                                {step !== "" && (
                                                    <>
                                                        <span className="text-emerald-400">{">"}  </span>{step}
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Euler Steps */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg overflow-hidden lg:col-span-2">
                            <button 
                                onClick={() => setExpandEulerSteps(!expandEulerSteps)}
                                className="w-full flex items-center justify-between mb-3 text-sm font-bold text-slate-100 hover:text-violet-300 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4 text-violet-400"
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
                                    Euler Steps
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${expandEulerSteps ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                                </svg>
                            </button>
                            {expandEulerSteps && (
                                <div className="overflow-y-auto max-h-[220px] space-y-1 font-mono text-xs">
                                    {eulerSteps.length === 0 ? (
                                        <div className="text-slate-400 text-center py-4">Enter values to calculate</div>
                                    ) : (
                                        eulerSteps.map((step, index) => (
                                            <div 
                                                key={index}
                                                className={`${
                                                    step === "" 
                                                        ? "h-0.5" 
                                                        : `bg-slate-800/40 border-l-2 border-violet-500/60 pl-2 py-1 rounded text-slate-300 text-xs whitespace-pre-wrap break-words ${
                                                            step.includes("✓") || step.includes("Kết quả cuối cùng") 
                                                                ? "font-bold text-violet-300" 
                                                                : ""
                                                        }`
                                                }`}
                                            >
                                                {step !== "" && (
                                                    <>
                                                        <span className="text-violet-400">{">"}  </span>{step}
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ModularExponentiationPage;