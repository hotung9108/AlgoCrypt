import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { vigenereEncrypt, vigenereDecrypt } from "@/algorithms/vingenereEncrypt";

export default function VigenereExample() {
  const [plaintext, setPlaintext] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleEncrypt = () => {
    if (!keyword.trim()) {
      alert("Vui lòng nhập từ khóa!");
      return;
    }
    const encrypted = vigenereEncrypt(plaintext, keyword);
    setCiphertext(encrypted);
  };

  const handleDecrypt = () => {
    if (!keyword.trim()) {
      alert("Vui lòng nhập từ khóa!");
      return;
    }
    const decrypted = vigenereDecrypt(ciphertext, keyword);
    setDecryptedText(decrypted);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Thuật Toán Vigenère</CardTitle>
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
            <div className="flex space-x-4">
              <Button onClick={handleEncrypt}>Mã hóa</Button>
              <Button onClick={handleDecrypt}>Giải mã</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Kết Quả Mã Hóa</CardTitle>
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
          <CardTitle className="text-xl font-bold">Kết Quả Giải Mã</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="decryptedText">Văn bản giải mã:</Label>
            <Input id="decryptedText" value={decryptedText} readOnly className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}