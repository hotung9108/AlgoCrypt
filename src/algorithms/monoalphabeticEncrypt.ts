export const monoalphabeticEncrypt = (text: string, key: string): string => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const keyMap = key.split("");

    return text
        .toUpperCase()
        .split("")
        .map((char) => {
            const index = alphabet.indexOf(char);
            return index !== -1 ? keyMap[index] : char;
        })
        .join("");
};

export const monoalphabeticDecrypt = (text: string, key: string): string => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const keyMap = key.split("");

    return text
        .toUpperCase()
        .split("")
        .map((char) => {
            const index = keyMap.indexOf(char);
            return index !== -1 ? alphabet[index] : char;
        })
        .join("");
};