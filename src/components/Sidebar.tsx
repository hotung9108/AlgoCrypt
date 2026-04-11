import React, { useState } from 'react';
import { CipherType } from '@/types';

const Sidebar: React.FC<{ 
  active: CipherType; 
  onSelect: (id: CipherType) => void 
}> = ({ active, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative left-0 top-0 h-screen z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 md:p-6 border-b border-slate-800 space-y-1">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            CryptoLab
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Algorithms Lab</p>
        </div>
        
        <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2">
          {CIPHERS.map((cipher) => (
            <button
              key={cipher.id}
              onClick={() => {
                onSelect(cipher.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-200 group ${
                active === cipher.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-xs md:text-sm line-clamp-2">{cipher.name}</div>
              <div className={`text-[9px] md:text-[10px] uppercase mt-0.5 md:mt-1 ${active === cipher.id ? 'text-blue-100' : 'text-slate-600'}`}>
                {cipher.complexity}
              </div>
            </button>
          ))}
        </nav>
        
        <div className="hidden md:block p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-3 text-[11px] text-slate-400 italic">
            "Cryptography is the art of solving mysteries."
          </div>
        </div>
      </div>
    </>
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
  { id: CipherType.MODULAR_EXPONENTIATION, name: 'Modular Exponentiation', complexity: 'Medium' },
  { id: CipherType.MODULAR_INVERSE, name: 'Modular Inverse', complexity: 'Medium' },
  { id: CipherType.EULER_TOTIENT, name: 'Euler Totient Function', complexity: 'Medium' },
  { id: CipherType.CRT_MODULAR_EXPONENTIATION, name: 'CRT Modular Exponentiation', complexity: 'High' },
  { id: CipherType.CRT_SOLVE_SYSTEM, name: 'CRT Solve System', complexity: 'High' },
  { id: CipherType.PRIMITIVE_ROOT, name: 'Primitive Root Checker', complexity: 'High' },
  { id: CipherType.DISCRETE_LOGARITHM, name: 'Discrete Logarithm', complexity: 'High' },
  { id: CipherType.MODULAR_EXPRESSIONS, name: 'Modular Expressions', complexity: 'Medium' },
  { id: CipherType.DES, name: 'DES Cipher', complexity: 'High' },
  { id: CipherType.AES, name: 'AES-128 Cipher', complexity: 'High' },
  { id: CipherType.DIFFIE_HELLMAN, name: 'Diffie-Hellman Key Exchange', complexity: 'High' },
  { id: CipherType.RSA, name: 'RSA Algorithm', complexity: 'High' },
  { id: CipherType.ELGAMAL, name: 'ElGamal Encryption', complexity: 'High' },
  { id: CipherType.DSA, name: 'DSA - Digital Signature', complexity: 'High' },
];

export { CIPHERS };