import React from 'react';
import { CipherType } from '@/types';

const Sidebar: React.FC<{ 
  active: CipherType; 
  onSelect: (id: CipherType) => void 
}> = ({ active, onSelect }) => {
  return (
    <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          CryptoLab
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Algorithms Lab</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {CIPHERS.map((cipher) => (
          <button
            key={cipher.id}
            onClick={() => onSelect(cipher.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group ${
              active === cipher.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="font-semibold text-sm">{cipher.name}</div>
            <div className={`text-[10px] uppercase mt-1 ${active === cipher.id ? 'text-blue-100' : 'text-slate-600'}`}>
              Level: {cipher.complexity}
            </div>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3 text-[11px] text-slate-400 italic">
          "Cryptography is the art of solving mysteries."
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


const CIPHERS = [
  { id: CipherType.CAESAR, name: 'Caesar Cipher', complexity: 'Low' },
  { id: CipherType.RAIL_FENCE, name: 'Rail Fence Cipher', complexity: 'Medium' },
  { id: CipherType.PLAYFAIR, name: 'Playfair Cipher', complexity: 'Medium' },
  { id: CipherType.VIGENERE, name: 'Vigenere Cipher', complexity: 'Medium' },
  { id: CipherType.VIGENERE_AUTOKEY, name: 'Vigenere Cipher (Autokey)', complexity: 'Medium' },
  { id: CipherType.MONOALPHABETIC, name: 'Monoalphabetic Cipher', complexity: 'High' },
  { id: CipherType.DES, name: 'DES Cipher', complexity: 'High' },
  { id: CipherType.AES, name: 'AES-128 Cipher', complexity: 'High' },
  { id: CipherType.DIFFIE_HELLMAN, name: 'Diffie-Hellman Key Exchange', complexity: 'High' },
  { id: CipherType.RSA, name: 'RSA Algorithm', complexity: 'High' },
  { id: CipherType.ELGAMAL, name: 'ElGamal Encryption', complexity: 'High' },
  { id: CipherType.DSA, name: 'DSA - Digital Signature', complexity: 'High' },
];

export { CIPHERS };