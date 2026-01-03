export default function Structure() {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
        Cấu trúc Thuật Toán Caesar
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        Cấu trúc thuật toán Caesar bao gồm các bước sau:
      </p>
      <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400">
        <li>Nhập văn bản cần mã hóa hoặc giải mã.</li>
        <li>Chọn khóa dịch chuyển (shift key).</li>
        <li>Dịch chuyển từng ký tự trong văn bản theo khóa đã chọn.</li>
      </ul>
    </div>
  );
}