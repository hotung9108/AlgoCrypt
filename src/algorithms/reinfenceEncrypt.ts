export const railFenceEncrypt = (text: string, key: number): string => {
  if (key <= 1) return text;

  const trimmedText = text.replace(/\s+/g, "");

  const rails: string[] = Array.from({ length: key }, () => "");
  let directionDown = false;
  let row = 0;

  for (let i = 0; i < trimmedText.length; i++) {
    rails[row] += trimmedText[i];

    if (row === 0 || row === key - 1) {
      directionDown = !directionDown;
    }

    row += directionDown ? 1 : -1;
  }

  return rails.join("");
};

export const railFenceDecrypt = (cipher: string, key: number): string => {
  if (key <= 1) return cipher;

  const trimmedCipher = cipher.replace(/\s+/g, "");

  const rails: string[] = Array.from({ length: key }, () => "");
  const railLengths: number[] = Array(key).fill(0);
  let directionDown = false;
  let row = 0;

  for (let i = 0; i < trimmedCipher.length; i++) {
    railLengths[row]++;
    if (row === 0 || row === key - 1) {
      directionDown = !directionDown;
    }
    row += directionDown ? 1 : -1;
  }

  let index = 0;
  for (let i = 0; i < key; i++) {
    rails[i] = trimmedCipher.slice(index, index + railLengths[i]);
    index += railLengths[i];
  }

  let result = "";
  row = 0;
  directionDown = false;
  const railPositions = Array(key).fill(0);

  for (let i = 0; i < trimmedCipher.length; i++) {
    result += rails[row][railPositions[row]];
    railPositions[row]++;

    if (row === 0 || row === key - 1) {
      directionDown = !directionDown;
    }
    row += directionDown ? 1 : -1;
  }

  return result;
};