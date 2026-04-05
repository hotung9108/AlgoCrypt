import { CipherType } from './types';
import type { CipherDefinition } from './types';

export const CIPHERS: CipherDefinition[] = [
  {
    id: CipherType.CAESAR,
    name: 'Caesar Cipher',
    description: 'A type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.',
    complexity: 'Low'
  },
  {
    id: CipherType.RAIL_FENCE,
    name: 'Rail Fence Cipher',
    description: 'A form of transposition cipher that gets its name from the way in which it is encoded by writing the message in a zigzag pattern on imaginary rails.',
    complexity: 'Low'
  },
  {
    id: CipherType.VIGENERE,
    name: 'Vigenère Cipher',
    description: 'A method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword.',
    complexity: 'Medium'
  },
  {
    id: CipherType.PLAYFAIR,
    name: 'Playfair Cipher',
    description: 'The first practical digraph substitution cipher. It uses a 5x5 grid containing a keyword or phrase to encrypt pairs of letters.',
    complexity: 'High'
  },
  {
    id: CipherType.MONOALPHABETIC,
    name: 'Monoalphabetic Cipher',
    description: 'A fixed substitution where each letter of the alphabet is replaced by another letter based on a fixed key.',
    complexity: 'Medium'
  }
];
