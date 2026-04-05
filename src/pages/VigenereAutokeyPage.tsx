import React, { useState } from "react";
import { vigenereEncrypt, vigenereDecrypt } from "@/algorithms/vingenereEncrypt";

const VigenereAutokeyPage: React.FC = () => {
    const [key, setKey] = useState("KEY");
    const [inputText, setInputText] = useState("HELLOWORLD");
    const [outputText, setOutputText] = useState("");
    const [isEncrypt, setIsEncrypt] = useState(true);

    const handleProcess = () => {
        const autokey = key + inputText.slice(0, inputText.length - key.length);
        const result = isEncrypt
            ? vigenereEncrypt(inputText, autokey)
            : vigenereDecrypt(inputText, autokey);
        setOutputText(result);
    };

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-slate-200">
            <main className="flex-1 p-8">
                <h2 className="text-4xl font-black text-white mb-6">Vigenere Cipher (Autokey)</h2>
                <div className="space-y-4">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value.toUpperCase())}
                        className="w-full h-32 bg-slate-800 p-4 rounded-lg text-slate-200"
                        placeholder="Enter text..."
                    />
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value.toUpperCase())}
                        className="w-full bg-slate-800 p-4 rounded-lg text-slate-200"
                        placeholder="Enter key..."
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                setIsEncrypt(true);
                                handleProcess();
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Encrypt
                        </button>
                        <button
                            onClick={() => {
                                setIsEncrypt(false);
                                handleProcess();
                            }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Decrypt
                        </button>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg text-white">
                        {outputText || "Output will appear here..."}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VigenereAutokeyPage;