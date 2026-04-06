export const CipherType = {
  CAESAR: 'caesar',
  RAIL_FENCE: 'rail_fence',
  VIGENERE: 'vigenere',
  VIGENERE_REPEAT_KEY: 'vigenere_repeat_key',
  VIGENERE_AUTOKEY: 'vigenere_autokey',
  PLAYFAIR: 'playfair',
  MONOALPHABETIC: 'monoalphabetic',
  DES: 'des',
  AES: 'aes',
  DIFFIE_HELLMAN: 'diffie_hellman',
  RSA: 'rsa',
  ELGAMAL: 'elgamal',
  DSA: 'dsa'
} as const;

export type CipherType = typeof CipherType[keyof typeof CipherType];

export interface CipherDefinition {
  id: CipherType;
  name: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface CipherState {
  inputText: string;
  outputText: string;
  isEncrypt: boolean;
  params: Record<string, any>;
}
