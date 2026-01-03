import { useState } from "react";
import { caesarDecrypt, caesarEncrypt } from "../../algorithms/caesarEncrypt";

export default function Example() {
    const [inputText, setInputText] = useState("");
    const [key, setKey] = useState(0);
    const [result, setResult] = useState("");
    const handleEncrypt = () => {
        setResult(caesarEncrypt(inputText, key));
    }
    const handleDecrypt = () => {
        setResult(caesarDecrypt(inputText, key));
    }
    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                Ví dụ Minh Họa Thuật Toán Caesar
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
                Giả sử bạn muốn mã hóa văn bản "HELLO" với khóa là 3:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400">
                <li>H -{">"} K</li>
                <li>E -{">"} H</li>
                <li>L -{">"} O</li>
                <li>L -{">"} O</li>
                <li>O -{">"} R</li>
            </ul>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
                Kết quả mã hóa: <strong>"KHOOR"</strong>
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                    Thuật Toán Caesar
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Nhập văn bản và chọn khóa để mã hóa hoặc giải mã bằng thuật toán Caesar.
                </p>

                <div className="mb-4">
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">
                        Văn bản đầu vào:
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">
                        Khóa dịch chuyển:
                    </label>
                    <input
                        type="number"
                        value={key}
                        onChange={(e) => setKey(parseInt(e.target.value))}
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                </div>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={handleEncrypt}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Mã hóa
                    </button>
                    <button
                        onClick={handleDecrypt}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Giải mã
                    </button>
                </div>

                <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-2">
                        Kết quả:
                    </label>
                    <textarea
                        value={result}
                        readOnly
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}