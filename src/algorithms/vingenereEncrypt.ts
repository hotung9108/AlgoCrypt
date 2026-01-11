export function vigenereEncrypt(plaintext: string, keyword: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
  keyword = keyword.toUpperCase().replace(/[^A-Z]/g, ""); 

  let ciphertext = "";
  let keywordIndex = 0;

  for (const char of plaintext) {
    const plainIndex = alphabet.indexOf(char);
    const keyIndex = alphabet.indexOf(keyword[keywordIndex]);

    if (plainIndex !== -1) {
      const cipherIndex = (plainIndex + keyIndex) % 26;
      ciphertext += alphabet[cipherIndex];
      keywordIndex = (keywordIndex + 1) % keyword.length;
    }
  }

  return ciphertext;
}

export function vigenereDecrypt(ciphertext: string, keyword: string): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, ""); 
  keyword = keyword.toUpperCase().replace(/[^A-Z]/g, ""); 

  let plaintext = "";
  let keywordIndex = 0;

  for (const char of ciphertext) {
    const cipherIndex = alphabet.indexOf(char);
    const keyIndex = alphabet.indexOf(keyword[keywordIndex]);

    if (cipherIndex !== -1) {
      const plainIndex = (cipherIndex - keyIndex + 26) % 26; 
      plaintext += alphabet[plainIndex];
      keywordIndex = (keywordIndex + 1) % keyword.length; 
    }
  }

  return plaintext;
}