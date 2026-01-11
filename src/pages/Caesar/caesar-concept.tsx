import { Card } from "@/components/ui/card";

export default function Concept() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Khái niệm Thuật Toán Caesar</h1>
      <p>
        Thuật toán Caesar là một trong những phương pháp mã hóa cổ điển nhất, được đặt theo tên của Julius Caesar. 
        Nó hoạt động bằng cách dịch chuyển các ký tự trong bảng chữ cái theo một số bước cố định.
      </p>
    </Card>
  );
}