import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { caesarEncrypt, caesarDecrypt } from "../../algorithms/caesarEncrypt";

export default function Example() {
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState(0);
  const [result, setResult] = useState("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleEncrypt = () => {
    setResult(caesarEncrypt(inputText, key));
  };

  const handleDecrypt = () => {
    setResult(caesarDecrypt(inputText, key));
  };

  const shiftedAlphabet = () => {
    return alphabet
      .split("")
      .map((char) => {
        const shiftedIndex = (alphabet.indexOf(char) + key) % 26;
        return alphabet[shiftedIndex];
      })
      .join("");
  };

  const calculateFrequency = () => {
    const frequency: { [key: string]: number } = {};
    inputText
      .toUpperCase()
      .split("")
      .forEach((char) => {
        if (alphabet.includes(char)) {
          frequency[char] = (frequency[char] || 0) + 1;
        }
      });
    return frequency;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Ví dụ Minh Họa Thuật Toán Caesar</h1>
        <div className="mb-4">
          <Label htmlFor="inputText">Văn bản đầu vào:</Label>
          <Input
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="key">Khóa dịch chuyển:</Label>
          <Input
            id="key"
            type="number"
            value={key}
            onChange={(e) => setKey(parseInt(e.target.value))}
            className="mt-2"
          />
        </div>
        <div className="flex space-x-4 mb-4">
          <Button onClick={handleEncrypt}>Mã hóa</Button>
          <Button onClick={handleDecrypt}>Giải mã</Button>
        </div>
        <div>
          <Label htmlFor="result">Kết quả:</Label>
          <Input id="result" value={result} readOnly className="mt-2" />
        </div>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Bảng Chữ Cái Dịch Chuyển</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Chữ cái gốc:</p>
              <p>{alphabet.split("").join(" ")}</p>
            </div>
            <div>
              <p className="font-bold">Chữ cái sau khi dịch:</p>
              <p>{shiftedAlphabet().split("").join(" ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Phân Tích Tần Suất Ký Tự</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {Object.entries(calculateFrequency()).length > 0 ? (
              <ul className="list-disc pl-6">
                {Object.entries(calculateFrequency()).map(([char, count]) => (
                  <li key={char}>
                    {char}: {count}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Không có ký tự nào trong văn bản đầu vào.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}