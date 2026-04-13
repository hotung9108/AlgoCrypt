import React from 'react';

const DiffieHellmanTablesPage: React.FC = () => {
  // Common prime numbers used in DH
  const commonPrimes = [
    { bitLength: 1024, useCase: 'Legacy systems' },
    { bitLength: 2048, useCase: 'Modern standard' },
    { bitLength: 4096, useCase: 'High security' }
  ];

  // Example small primes and their primitive roots
  const smallPrimes = [
    { q: 5, roots: [2, 3] },
    { q: 7, roots: [3, 5] },
    { q: 11, roots: [2, 6, 7, 8] },
    { q: 13, roots: [2, 6, 7, 11] },
    { q: 23, roots: [5, 7, 10, 11, 14, 15, 17, 19, 20, 21] }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Diffie-Hellman Reference</h2>
        <p className="text-lg text-slate-400">
          Complete reference for Diffie-Hellman key exchange algorithm
        </p>
      </div>

      {/* Algorithm Overview */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold">Algorithm</span>
          How Diffie-Hellman Works
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Setup Phase</h4>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 space-y-3">
              <div>
                <div className="text-sm font-semibold text-slate-400 mb-1">1. Choose prime q</div>
                <div className="text-xs text-slate-300">
                  A large prime number that both parties publicly agree on
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-400 mb-1">2. Choose primitive root a</div>
                <div className="text-xs text-slate-300">
                  A primitive root modulo q, publicly known to both parties
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Key Agreement Phase</h4>
            <div className="bg-slate-950 border border-slate-700 rounded-xl p-4 space-y-3">
              <div>
                <div className="text-sm font-semibold text-slate-400 mb-1">3. Each party calculates public key</div>
                <div className="text-xs text-blue-300 font-mono mb-1">yA = a^xA mod q</div>
                <div className="text-xs text-blue-300 font-mono">yB = a^xB mod q</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-400 mb-1">4. Exchange public keys</div>
                <div className="text-xs text-slate-300">
                  yA and yB are sent through public channel
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-400 mb-1">5. Calculate shared secret</div>
                <div className="text-xs text-green-300 font-mono mb-1">A: K = yB^xA mod q</div>
                <div className="text-xs text-green-300 font-mono">B: K = yA^xB mod q</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl p-4">
          <div className="text-sm font-semibold text-blue-300 mb-2">Why It Works</div>
          <div className="text-xs text-slate-300">
            <div className="font-mono mb-2">K = yB^xA mod q = (a^xB mod q)^xA mod q = a^(xB·xA) mod q</div>
            <div className="font-mono">K = yA^xB mod q = (a^xA mod q)^xB mod q = a^(xA·xB) mod q</div>
            <div className="mt-2">Both calculations yield the same result because multiplication is commutative!</div>
          </div>
        </div>
      </div>

      {/* Prime Numbers */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-bold">Primes</span>
          Common Prime Sizes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commonPrimes.map((prime, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-700 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400 mb-2">{prime.bitLength}</div>
              <div className="text-xs text-slate-400 uppercase font-semibold mb-1">bits</div>
              <div className="text-sm text-slate-300">{prime.useCase}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-900/20 border border-blue-600/30 rounded-xl p-4">
          <div className="text-sm font-semibold text-blue-300 mb-2">Security Note</div>
          <div className="text-xs text-slate-300">
            Larger primes provide better security. For modern applications, at least 2048-bit primes are recommended.
            The difficulty of computing discrete logarithms grows with the prime size.
          </div>
        </div>
      </div>

      {/* Small Primes and Primitive Roots */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-bold">Examples</span>
          Small Primes and Primitive Roots
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="border border-slate-700 px-4 py-3 text-sm font-bold text-slate-300">Prime (q)</th>
                <th className="border border-slate-700 px-4 py-3 text-sm font-bold text-slate-300">Primitive Roots (a)</th>
              </tr>
            </thead>
            <tbody>
              {smallPrimes.map((prime, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="border border-slate-700 px-4 py-3 font-mono text-lg text-green-400 font-bold">
                    {prime.q}
                  </td>
                  <td className="border border-slate-700 px-4 py-3 font-mono text-sm text-blue-400">
                    {prime.roots.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-purple-900/20 border border-purple-600/30 rounded-xl p-4">
          <div className="text-sm font-semibold text-purple-300 mb-2">About Primitive Roots</div>
          <div className="text-xs text-slate-300">
            A primitive root modulo a prime q is a number whose powers generate all numbers from 1 to q-1.
            This ensures good distribution of the shared secrets and avoids weak keys.
          </div>
        </div>
      </div>

      {/* Security Analysis */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm font-bold">Security</span>
          Security Properties
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Strengths</h4>
            <div className="space-y-2">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-green-300 text-sm">Discrete Logarithm Problem</div>
                  <div className="text-xs text-slate-400">Finding x from y = a^x mod q is computationally hard</div>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-green-300 text-sm">Forward Secrecy Potential</div>
                  <div className="text-xs text-slate-400">Each session can use fresh key material</div>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-green-300 text-sm">No Authentication Built-in</div>
                  <div className="text-xs text-slate-400">Can be extended with digital signatures for verification</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Vulnerabilities</h4>
            <div className="space-y-2">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-red-300 text-sm">Man-in-the-Middle Attack</div>
                  <div className="text-xs text-slate-400">Without authentication, attacker can intercept keys</div>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-red-300 text-sm">Small Subgroup Attack</div>
                  <div className="text-xs text-slate-400">Weak choice of parameters can lead to predictable keys</div>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-semibold text-red-300 text-sm">Quantum Risk</div>
                  <div className="text-xs text-slate-400">Vulnerable to quantum computers (Shor's algorithm)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4">
          <div className="text-sm font-semibold text-yellow-300 mb-2">Best Practices</div>
          <div className="text-xs text-slate-300 space-y-1">
            <div>• Use large primes (2048-bit minimum, 4096+ for high security)</div>
            <div>• Verify primitive root properties before use</div>
            <div>• Combine with authentication mechanism (e.g., digital signatures)</div>
            <div>• Use strong randomness for private key generation</div>
            <div>• Use in conjunction with modern key derivation functions</div>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6">Real-World Applications</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
            <div className="font-semibold text-blue-300 mb-3">TLS/SSL Handshake</div>
            <div className="text-xs text-slate-300">
              Elliptic Curve DH (ECDH) is widely used in TLS 1.3 for secure key establishment
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
            <div className="font-semibold text-green-300 mb-3">IPSec</div>
            <div className="text-xs text-slate-300">
              Internet Protocol Security uses DH for authenticated key exchange
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
            <div className="font-semibold text-purple-300 mb-3">SSH Protocol</div>
            <div className="text-xs text-slate-300">
              Secure Shell uses DH variants for initial key exchange before authentication
            </div>
          </div>
          <div className="bg-slate-950 border border-slate-700 rounded-xl p-4">
            <div className="font-semibold text-amber-300 mb-3">VPN Protocols</div>
            <div className="text-xs text-slate-300">
              OpenVPN and other VPN solutions use DH for secure tunnel establishment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffieHellmanTablesPage;
