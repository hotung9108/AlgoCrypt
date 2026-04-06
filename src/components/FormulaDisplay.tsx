import React from 'react';

/**
 * Component để hiển thị công thức toán học với mũ (superscript)
 * Ví dụ: "a^xA mod q" sẽ hiển thị như: a<sup>xA</sup> mod q
 * Ví dụ với số: "2^3 = 8" sẽ hiển thị như: 2<sup>3</sup> = 8
 */
const FormulaDisplay: React.FC<{ formula: string | React.ReactNode }> = ({ formula }) => {
  // Hàm để parse công thức và chuyển ^ thành superscript
  const parseFormula = (text: string): (string | JSX.Element)[] => {
    // Regex để tìm pattern: base^exponent (có thể là chữ hoặc số)
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    const regex = /([a-zA-Z0-9]+)\^([a-zA-Z0-9\-]+)/g;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      // Thêm text trước ^
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Thêm base^exponent dạng superscript
      parts.push(
        <span key={key++}>
          {match[1]}
          <sup className="text-xs align-super">{match[2]}</sup>
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    // Thêm text còn lại
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  // Nếu formula là string, parse nó
  if (typeof formula === 'string') {
    return <>{parseFormula(formula)}</>;
  }

  // Nếu là JSX element, return trực tiếp
  return <>{formula}</>;
};

export default FormulaDisplay;
