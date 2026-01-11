import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Application() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Ứng Dụng Thực Tế của Thuật Toán Caesar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 dark:text-slate-400">
          Thuật toán Caesar được sử dụng trong các ứng dụng đơn giản như:
        </p>
        <ul className="list-disc pl-6 mt-4 text-slate-600 dark:text-slate-400">
          <li>Mã hóa tin nhắn trong các trò chơi hoặc ứng dụng giáo dục.</li>
          <li>Giới thiệu các khái niệm cơ bản về mật mã học.</li>
          <li>Ứng dụng trong các bài toán bảo mật đơn giản.</li>
        </ul>
      </CardContent>
    </Card>
  );
}