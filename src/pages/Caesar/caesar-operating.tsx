import { Card } from "@/components/ui/card";

export default function Operating() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nguyên lý hoạt động của Thuật Toán Caesar</h1>
      <p>
        Thuật toán Caesar hoạt động bằng cách thay thế mỗi ký tự trong văn bản gốc bằng một ký tự khác, 
        được dịch chuyển một số bước trong bảng chữ cái. Ví dụ, với khóa là 3, chữ "A" sẽ được thay bằng chữ "D".
      </p>
    </Card>
  );
}