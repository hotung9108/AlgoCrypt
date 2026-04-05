import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CaesarPage from './pages/CaesarPage';
import RailFencePage from './pages/RailFencePage';
import PlayfairPage from './pages/PlayfairPage';
import VigenerePage from './pages/VigenerePage';
import MonoalphabeticPage from './pages/MonoalphabeticPage';
import VigenereAutokeyPage from './pages/VigenereAutokeyPage';
import DESPage from './pages/DESPage';
import AESPage from './pages/AESPage';
import { CipherType } from './types';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCipher, setActiveCipher] = useState<CipherType>(CipherType.CAESAR);

  useEffect(() => {
    switch (location.pathname) {
      case '/caesar':
        setActiveCipher(CipherType.CAESAR);
        break;
      case '/rail-fence':
        setActiveCipher(CipherType.RAIL_FENCE);
        break;
      case '/playfair':
        setActiveCipher(CipherType.PLAYFAIR);
        break;
      case '/vigenere':
        setActiveCipher(CipherType.VIGENERE);
        break;
      case '/vigenere-repeat-key':
        setActiveCipher(CipherType.VIGENERE_REPEAT_KEY);
        break;
      case '/vigenere-autokey':
        setActiveCipher(CipherType.VIGENERE_AUTOKEY);
        break;
      case '/monoalphabetic':
        setActiveCipher(CipherType.MONOALPHABETIC);
        break;
      case '/des':
        setActiveCipher(CipherType.DES);
        break;
      case '/aes':
        setActiveCipher(CipherType.AES);
        break;
      default:
        setActiveCipher(CipherType.CAESAR);
    }
  }, [location.pathname]);

  const handleSelect = (id: CipherType) => {
    setActiveCipher(id);
    switch (id) {
      case CipherType.CAESAR:
        navigate('/caesar');
        break;
      case CipherType.RAIL_FENCE:
        navigate('/rail-fence');
        break;
      case CipherType.PLAYFAIR:
        navigate('/playfair');
        break;
      case CipherType.VIGENERE:
        navigate('/vigenere');
        break;
      case CipherType.VIGENERE_REPEAT_KEY:
        navigate('/vigenere-repeat-key');
        break;
      case CipherType.VIGENERE_AUTOKEY:
        navigate('/vigenere-autokey');
        break;
      case CipherType.MONOALPHABETIC:
        navigate('/monoalphabetic');
        break;
      case CipherType.DES:
        navigate('/des');
        break;
      case CipherType.AES:
        navigate('/aes');
        break;
      default:
        navigate('/caesar');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar active={activeCipher} onSelect={handleSelect} />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/caesar" replace />} />
          <Route path="/caesar" element={<CaesarPage />} />
          <Route path="/rail-fence" element={<RailFencePage />} />
          <Route path="/playfair" element={<PlayfairPage />} />
          <Route path="/vigenere" element={<VigenerePage />} />
          <Route path="/vigenere-repeat-key" element={<VigenerePage />} />
          <Route path="/vigenere-autokey" element={<VigenereAutokeyPage />} />
          <Route path="/monoalphabetic" element={<MonoalphabeticPage />} />
          <Route path="/des" element={<DESPage />} />
          <Route path="/aes" element={<AESPage />} />
        </Routes>
      </main>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
