import React from 'react';

const DESTablesPage: React.FC = () => {
  // PC1 Permutation Table (56 elements)
  const PC1 = [
    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37,
    29, 21, 13, 5, 28, 20, 12, 4
  ];

  // PC2 Permutation Table (48 elements)
  const PC2 = [
    14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4,
    26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40,
    51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32
  ];

  // IP Permutation Table (64 elements)
  const IP = [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7
  ];

  // IP-1 Permutation Table (64 elements)
  const IP_1 = [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25
  ];

  // E Expansion Table (48 elements)
  const E = [
    32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1
  ];

  // P-Box Permutation Table (32 elements)
  const P = [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10,
    2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25
  ];

  const renderTable = (title: string, data: number[], cols: number, description: string) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-slate-100 mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))` }}>
          {data.map((value, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded p-2 text-center text-xs font-mono hover:bg-slate-700 transition-colors cursor-help"
              title={`Position ${index}: value ${value}`}
            >
              <div className="text-slate-400 text-[10px] font-semibold">{index}</div>
              <div className="text-blue-300 font-bold text-sm">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-tighter">
                DES Tables
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Bảng Hoán Vị DES</h2>
            <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
              Các bảng hoán vị (Permutation Tables) sử dụng trong thuật toán DES để sắp xếp lại các bit.
            </p>
          </header>

          {/* PC1 Table */}
          {renderTable(
            'PC1 - Initial Key Permutation',
            PC1,
            8,
            'Hoán vị ban đầu của khóa 64 bits thành C0 (28 bits) và D0 (28 bits). Loại bỏ 8 bit parity.'
          )}

          {/* PC2 Table */}
          {renderTable(
            'PC2 - Key Compression Permutation',
            PC2,
            8,
            'Nén C và D thành khóa vòng Ki 48 bits. Chọn 48 bits từ 56 bits của C và D.'
          )}

          {/* IP Table */}
          {renderTable(
            'IP - Initial Permutation',
            IP,
            8,
            'Hoán vị ban đầu của bản rõ 64 bits. Sắp xếp lại để chuẩn bị cho các vòng Feistel.'
          )}

          {/* IP-1 Table */}
          {renderTable(
            'IP⁻¹ - Inverse Initial Permutation',
            IP_1,
            8,
            'Hoán vị ngược lại sau 16 vòng. Sắp xếp lại để tạo bản mã cuối cùng 64 bits.'
          )}

          {/* E Table */}
          {renderTable(
            'E - Expansion Function',
            E,
            8,
            'Mở rộng 32 bits sang 48 bits bằng cách lặp lại một số bit. Chuẩn bị cho S-box substitution.'
          )}

          {/* P Table */}
          {renderTable(
            'P - Permutation Function',
            P,
            8,
            'Hoán vị 32 bits sau S-box substitution. Tạo đầu ra cho hàm F trong mỗi vòng.'
          )}

          {/* Summary Box */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-slate-100 mb-4">Thông Tin Chi Tiết</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-purple-300 font-semibold mb-1">PC1</div>
                <div className="text-slate-400">56 phần tử (0-55)</div>
                <div className="text-slate-500 text-xs mt-1">Chọn từ 64 bits khóa</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-blue-300 font-semibold mb-1">PC2</div>
                <div className="text-slate-400">48 phần tử (0-47)</div>
                <div className="text-slate-500 text-xs mt-1">Chọn từ 56 bits (C+D)</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-cyan-300 font-semibold mb-1">IP / IP⁻¹</div>
                <div className="text-slate-400">64 phần tử (1-64)</div>
                <div className="text-slate-500 text-xs mt-1">Sắp xếp bản rõ/mã</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-green-300 font-semibold mb-1">E</div>
                <div className="text-slate-400">48 phần tử (0-47)</div>
                <div className="text-slate-500 text-xs mt-1">Mở rộng từ 32 bits</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-yellow-300 font-semibold mb-1">P</div>
                <div className="text-slate-400">32 phần tử (0-31)</div>
                <div className="text-slate-500 text-xs mt-1">Hoán vị sau S-box</div>
              </div>
              <div className="bg-slate-800/30 rounded p-3">
                <div className="text-orange-300 font-semibold mb-1">S-Boxes</div>
                <div className="text-slate-400">8 bảng (4x16)</div>
                <div className="text-slate-500 text-xs mt-1">Thế 48 bits → 32 bits</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-slate-100 mb-4">Hướng Dẫn Đọc Bảng</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><span className="font-mono bg-slate-900 px-2 py-1 rounded text-blue-300">Chỉ số hàng trên</span> - Vị trí trong bảng (0-55, 0-63, v.v.)</li>
              <li><span className="font-mono bg-slate-900 px-2 py-1 rounded text-green-300">Giá trị phía dưới</span> - Bit vị trí từ input (bit position from input)</li>
              <li>Ví dụ: PC1[0] = 57 có nghĩa lấy bit thứ 57 từ khóa 64 bits gốc</li>
              <li>Trong PC2[24] = 41, lấy bit thứ 41 từ D (bit thứ 41 - 28 = 13 của D)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DESTablesPage;
