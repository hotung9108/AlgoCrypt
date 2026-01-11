import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { generatePlayfairMatrix, playfairEncrypt } from "@/algorithms/playfairEncrypt";

export default function PlayfairExample() {
    const [plaintext, setPlaintext] = useState("");
    const [keyword, setKeyword] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [matrix, setMatrix] = useState<string[][]>([]);

    const handleEncrypt = () => {
        if (keyword.trim() === "") {
            alert("Vui lòng nhập từ khóa!");
            return;
        }
        const generatedMatrix = generatePlayfairMatrix(keyword);
        setMatrix(generatedMatrix);
        const encryptedText = playfairEncrypt(plaintext, keyword);
        setCiphertext(encryptedText);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Thuật Toán Playfair</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="plaintext">Văn bản gốc:</Label>
                            <Input
                                id="plaintext"
                                value={plaintext}
                                onChange={(e) => setPlaintext(e.target.value)}
                                placeholder="Nhập văn bản cần mã hóa"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="keyword">Từ khóa:</Label>
                            <Input
                                id="keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Nhập từ khóa"
                                className="mt-2"
                            />
                        </div>
                        <Button onClick={handleEncrypt} className="mt-4">
                            Mã hóa
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Kết Quả</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor="ciphertext">Văn bản mã hóa:</Label>
                        <Input id="ciphertext" value={ciphertext} readOnly className="mt-2" />
                    </div>
                </CardContent>
            </Card>

            <Card className="p-6">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Ma Trận Playfair</CardTitle>
                </CardHeader>
                <CardContent>
                    {matrix.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse border border-gray-300 dark:border-gray-700 mx-auto">
                                <tbody>
                                    {matrix.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((char, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    className="w-12 h-12 border border-gray-300 dark:border-gray-700 text-center font-bold text-lg bg-gray-100 dark:bg-gray-800"
                                                >
                                                    {char}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">Ma trận sẽ hiển thị sau khi mã hóa.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}