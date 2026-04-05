export const caesarEncrypt = (text: string, shift: number): string => {
    return text
        .split("")
        .map((char) => {
            if (char.match(/[a-zA-Z]/)) {
                const charCode = char.charCodeAt(0);
                const base = charCode >= 65 && charCode <= 90 ? 65 : 97;
                return String.fromCharCode(((charCode - base + shift + 26) % 26) + base);
            }
            return char; // Non-alphabetic characters remain unchanged
        })
        .join("");
};

export const caesarDecrypt = (text: string, shift: number): string => {
    return caesarEncrypt(text, -shift); // Decrypt by shifting in the opposite direction
};