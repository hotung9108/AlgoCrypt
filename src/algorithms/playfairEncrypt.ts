export function generatePlayfairMatrix(keyword: string): string[][] {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const matrix: string[][] = [];
  const used = new Set<string>();
  keyword = keyword.toUpperCase().replace(/J/g, "I");
  for (const char of keyword) {
    if (!used.has(char) && alphabet.includes(char)) {
      used.add(char);
    }
  }

  for (const char of alphabet) {
    if (!used.has(char)) {
      used.add(char);
    }
  }

  const allChars = Array.from(used);
  for (let i = 0; i < 5; i++) {
    matrix.push(allChars.slice(i * 5, i * 5 + 5));
  }

  return matrix;
}

export function playfairEncrypt(plaintext: string, keyword: string): string {
  const matrix = generatePlayfairMatrix(keyword);
  const digraphs = preprocessPlaintext(plaintext);
  let ciphertext = "";

  for (const [char1, char2] of digraphs) {
    const [row1, col1] = findPosition(matrix, char1);
    const [row2, col2] = findPosition(matrix, char2);

    if (row1 === row2) {
      ciphertext += matrix[row1][(col1 + 1) % 5];
      ciphertext += matrix[row2][(col2 + 1) % 5];
    } else if (col1 === col2) {
      ciphertext += matrix[(row1 + 1) % 5][col1];
      ciphertext += matrix[(row2 + 1) % 5][col2];
    } else {
      ciphertext += matrix[row1][col2];
      ciphertext += matrix[row2][col1];
    }
  }

  return ciphertext;
}

function preprocessPlaintext(plaintext: string): string[][] {
  plaintext = plaintext.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  const digraphs: string[][] = [];

  for (let i = 0; i < plaintext.length; i += 2) {
    const char1 = plaintext[i];
    const char2 = plaintext[i + 1] || "X"; 

    if (char1 === char2) {
      digraphs.push([char1, "X"]);
      i--; 
    } else {
      digraphs.push([char1, char2]);
    }
  }

  return digraphs;
}

function findPosition(matrix: string[][], char: string): [number, number] {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) {
        return [row, col];
      }
    }
  }
  throw new Error(`Character ${char} not found in matrix`);
}