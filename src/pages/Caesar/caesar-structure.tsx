import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Structure() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Cấu trúc Thuật Toán Caesar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 dark:text-slate-400">
          Cấu trúc thuật toán Caesar bao gồm các bước sau:
        </p>
        <ul className="list-disc pl-6 mt-4 text-slate-600 dark:text-slate-400">
          <li>Nhập văn bản cần mã hóa hoặc giải mã.</li>
          <li>Chọn khóa dịch chuyển (shift key).</li>
          <li>Dịch chuyển từng ký tự trong văn bản theo khóa đã chọn.</li>
        </ul>
      </CardContent>
    </Card>
  );
}