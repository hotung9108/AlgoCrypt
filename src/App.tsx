import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CaesarPage from './pages/CaesarPage';
import RailFencePage from './pages/RailFencePage';
import PlayfairPage from './pages/PlayfairPage';
import VigenerePage from './pages/VigenerePage';
import MonoalphabeticPage from './pages/MonoalphabeticPage';
import VigenereAutokeyPage from './pages/VigenereAutokeyPage';
import DESPage from './pages/DESPage';
import AESPage from './pages/AESPage';
import DiffieHellmanPage from './pages/DiffieHellmanPage';
import RSAPage from './pages/RSAPage';
import ElGamalPage from './pages/ElGamalPage';
import DSAPage from './pages/DSAPage';
import { CipherType } from './types';
import ModularExponentiationPage from './pages/ModularExponentiationPage';
import ModularInversePage from './pages/ModularInversePage';
import EulerTotientPage from "@/pages/EulerTotientPage";
import CRTModularExponentiationPage from "@/pages/CRTModularExponentiationPage";
import CRTSolveSystemPage from "@/pages/CRTSolveSystemPage";
import PrimitiveRootPage from "@/pages/PrimitiveRootPage";
import DiscreteLogarithmPage from "@/pages/DiscreteLogarithmPage";
import ModularExpressionsPage from "@/pages/ModularExpressionsPage";

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
      case '/diffie-hellman':
        setActiveCipher(CipherType.DIFFIE_HELLMAN);
        break;
      case '/rsa':
        setActiveCipher(CipherType.RSA);
        break;
      case '/elgamal':
        setActiveCipher(CipherType.ELGAMAL);
        break;
      case '/dsa':
        setActiveCipher(CipherType.DSA);
        break;
      case '/modular-exponentiation':
        setActiveCipher(CipherType.MODULAR_EXPONENTIATION);
        break;
      case '/modular-inverse':
        setActiveCipher(CipherType.MODULAR_INVERSE);
        break;
      case '/euler-totient':
        setActiveCipher(CipherType.EULER_TOTIENT);
        break;
      case '/crt-modular-exponentiation':
        setActiveCipher(CipherType.CRT_MODULAR_EXPONENTIATION);
        break;
      case '/crt-solve-system':
        setActiveCipher(CipherType.CRT_SOLVE_SYSTEM);
        break;
      case '/primitive-root':
        setActiveCipher(CipherType.PRIMITIVE_ROOT);
        break;
      case '/discrete-logarithm':
        setActiveCipher(CipherType.DISCRETE_LOGARITHM);
        break;
      case '/modular-expressions':
        setActiveCipher(CipherType.MODULAR_EXPRESSIONS);
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
      case CipherType.DIFFIE_HELLMAN:
        navigate('/diffie-hellman');
        break;
      case CipherType.RSA:
        navigate('/rsa');
        break;
      case CipherType.ELGAMAL:
        navigate('/elgamal');
        break;
      case CipherType.DSA:
        navigate('/dsa');
        break;
      case CipherType.MODULAR_EXPONENTIATION:
        navigate('/modular-exponentiation');
        break;
      case CipherType.MODULAR_INVERSE:
        navigate('/modular-inverse');
        break;
      case CipherType.EULER_TOTIENT:
        navigate('/euler-totient');
        break;
      case CipherType.CRT_MODULAR_EXPONENTIATION:
        navigate('/crt-modular-exponentiation');
        break;
      case CipherType.CRT_SOLVE_SYSTEM:
        navigate('/crt-solve-system');
        break;
      case CipherType.PRIMITIVE_ROOT:
        navigate('/primitive-root');
        break;
      case CipherType.DISCRETE_LOGARITHM:
        navigate('/discrete-logarithm');
        break;
      case CipherType.MODULAR_EXPRESSIONS:
        navigate('/modular-expressions');
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
          <Route path="/diffie-hellman" element={<DiffieHellmanPage />} />
          <Route path="/rsa" element={<RSAPage />} />
          <Route path="/elgamal" element={<ElGamalPage />} />
          <Route path="/dsa" element={<DSAPage />} />
          <Route path="/modular-exponentiation" element={<ModularExponentiationPage />} />
          <Route path="/modular-inverse" element={<ModularInversePage />} />
          <Route path="/euler-totient" element={<EulerTotientPage />} />
          <Route path="/crt-modular-exponentiation" element={<CRTModularExponentiationPage />} />
          <Route path="/crt-solve-system" element={<CRTSolveSystemPage />} />
          <Route path="/primitive-root" element={<PrimitiveRootPage />} />
          <Route path="/discrete-logarithm" element={<DiscreteLogarithmPage />} />
          <Route path="/modular-expressions" element={<ModularExpressionsPage />} />
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
