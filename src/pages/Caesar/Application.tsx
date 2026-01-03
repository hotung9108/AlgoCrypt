export default function Application() {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
        Ứng Dụng Thực Tế của Thuật Toán Caesar
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        Thuật toán Caesar được sử dụng trong các ứng dụng đơn giản như:
      </p>
      <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400">
        <li>Mã hóa tin nhắn trong các trò chơi hoặc ứng dụng giáo dục.</li>
        <li>Giới thiệu các khái niệm cơ bản về mật mã học.</li>
        <li>Ứng dụng trong các bài toán bảo mật đơn giản.</li>
      </ul>
    </div>
  );
}