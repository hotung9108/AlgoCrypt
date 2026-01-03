export default function Operating() {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
        Nguyên lý hoạt động của Thuật Toán Caesar
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        Thuật toán Caesar hoạt động bằng cách thay thế mỗi ký tự trong văn bản gốc bằng một ký tự khác, 
        được dịch chuyển một số bước trong bảng chữ cái. Ví dụ, với khóa là 3, chữ "A" sẽ được thay bằng chữ "D".
      </p>
    </div>
  );
}