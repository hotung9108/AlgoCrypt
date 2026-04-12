import React, { useState, useEffect, useRef } from "react";
import { monoalphabeticEncrypt, monoalphabeticDecrypt } from "@/algorithms/monoalphabeticEncrypt";

const MonoalphabeticPage: React.FC = () => {
    const [key, setKey] = useState("ZYXWVUTSRQPONMLKJIHGFEDCBA");
    const [inputText, setInputText] = useState("HELLOWORLD");
    const [outputText, setOutputText] = useState("");
    const [isEncrypt, setIsEncrypt] = useState(true);
    const plainScrollRef = useRef<HTMLDivElement>(null);
    const cipherScrollRef = useRef<HTMLDivElement>(null);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        const result = isEncrypt
            ? monoalphabeticEncrypt(inputText, key)
            : monoalphabeticDecrypt(inputText, key);
        setOutputText(result);
    }, [inputText, key, isEncrypt]);

    const handleScrollSync = (sourceRef: any, targetRef: any) => {
        return () => {
            if (sourceRef.current && targetRef.current) {
                targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
            }
        };
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
            <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
                <div className="max-w-5xl mx-auto space-y-4">
                    <header className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-tighter">
                                Algorithm Low
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Monoalphabetic Cipher
                        </h2>
                        <p className="text-sm text-slate-400 max-w-2xl leading-snug">
                            Fixed mapping between plaintext and ciphertext alphabets.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-7 space-y-4">
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                        Input Controller
                                    </h3>
                                    <div className="flex bg-slate-800 p-1 rounded-xl">
                                        <button
                                            onClick={() => setIsEncrypt(true)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isEncrypt ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                                        >
                                            ENCRYPT
                                        </button>
                                        <button
                                            onClick={() => setIsEncrypt(false)}
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isEncrypt ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                                        >
                                            DECRYPT
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                            Plaintext / Ciphertext
                                        </label>
                                        <textarea
                                            value={inputText}
                                            onChange={(e) =>
                                                setInputText(
                                                    e.target.value.toUpperCase(),
                                                )
                                            }
                                            className="w-full h-28 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono resize-none"
                                            placeholder="Enter text..."
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex justify-between">
                                            <span>Cipher Alphabet</span>
                                            <span className="text-blue-400 font-bold text-xs">
                                                {key.length}/26 chars
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={key}
                                            onChange={(e) =>
                                                setKey(e.target.value.toUpperCase())
                                            }
                                            maxLength={26}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mono font-mono"
                                            placeholder="Enter substitution alphabet..."
                                        />
                                        {key.length !== 26 && (
                                            <div className="mt-2 text-xs text-yellow-500 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Key should be exactly 26 letters
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                                            
                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-2xl p-4 shadow-lg h-full flex flex-col">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                                        <svg
                                            className="w-6 h-6 text-blue-400"
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
                                        {isEncrypt
                                            ? "Encrypted Result"
                                            : "Decrypted Result"}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                outputText,
                                            );
                                        }}
                                        className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-colors group"
                                        title="Copy to clipboard"
                                    >
                                        <svg
                                            className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform"
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

                                <div className="flex-1 bg-slate-950/80 border border-white/5 rounded-lg p-4 overflow-y-auto scrollbar-hide">
                                    <div className="text-xl font-black tracking-widest break-all leading-relaxed bg-gradient-to-br from-blue-100 to-white bg-clip-text text-transparent mono">
                                        {outputText || "NO OUTPUT"}
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[9px] text-blue-300 uppercase font-bold tracking-tighter mb-0.5">
                                            Length
                                        </div>
                                        <div className="text-lg font-bold text-white">
                                            {outputText.length}{" "}
                                            <span className="text-[9px] font-normal text-slate-400 ml-1">
                                                CHARS
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <div className="text-[9px] text-blue-300 uppercase font-bold tracking-tighter mb-0.5">
                                            Method
                                        </div>
                                        <div className="text-lg font-bold text-white truncate">
                                            Monoalphabetic
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-2 md:p-4 shadow-xl overflow-hidden">
                        <h3 className="font-bold text-sm md:text-base text-slate-100 mb-3 md:mb-4 flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-indigo-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            Encryption System
                        </h3>
                        <div className="flex flex-col items-center gap-2 md:gap-4">
                            <div
                                ref={plainScrollRef}
                                onScroll={handleScrollSync(plainScrollRef, cipherScrollRef)}
                                className="w-full flex justify-start lg:justify-center gap-1 overflow-x-auto scrollbar-none"
                            >
                                {alphabet.split("").map((letter, index) => (
                                    <div
                                        key={`plain-${index}`}
                                        className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center bg-slate-800 border border-slate-700 rounded text-[10px] md:text-xs font-bold text-slate-300"
                                    >
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <div className="text-slate-500 text-xs font-semibold">Substitutes To</div>
                            <div
                                ref={cipherScrollRef}
                                onScroll={handleScrollSync(cipherScrollRef, plainScrollRef)}
                                className="w-full flex justify-start lg:justify-center gap-1 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
                            >
                                {key.split("").map((letter, index) => (
                                    <div
                                        key={`cipher-${index}`}
                                        className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center bg-blue-600 border border-blue-500 rounded text-[10px] md:text-xs font-bold text-white"
                                    >
                                        {letter || "?"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MonoalphabeticPage;