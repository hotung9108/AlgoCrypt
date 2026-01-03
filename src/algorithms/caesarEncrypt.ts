export const caesarEncrypt = (text: string, shift: number):  string =>{
    return text
    .split("")
    .map((char)=>{
        if(char.match(/[a-z]/i)){
            const charCode = char.charCodeAt(0);
            const base = charCode >= 65 && charCode<=90?65:97;
            return String.fromCharCode(((charCode - base + shift)%26)+base);
        }
        return char;
    }).join("");
}
export const caesarDecrypt = (text: string, shift: number): string => {
  return caesarEncrypt(text, 26 - (shift % 26)); 
};