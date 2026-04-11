# AlgoCrypt - Cryptography Algorithm Visualization

A modern, interactive web application for visualizing and experimenting with various cryptography algorithms. Features a beautiful dark theme UI with real-time algorithm visualization and comprehensive algorithm implementations.

## Live Demo

The application is automatically deployed to GitHub Pages. Visit: [AlgoCrypt Dashboard](https://hotung9108.github.io/AlgoCrypt/)

## Features

### Symmetric Encryption
- **DES (Data Encryption Standard)**: 64-bit block cipher with 56-bit key and 16 rounds
- **AES-128 (Advanced Encryption Standard)**: 128-bit block cipher with 128-bit key and 10 rounds

### Asymmetric Encryption & Key Exchange
- **Diffie-Hellman Key Exchange**: Secure key exchange protocol based on discrete logarithm
- **RSA Algorithm**: Public-key cryptography with key generation and encryption/decryption
- **ElGamal Encryption**: Asymmetric encryption based on discrete logarithm problem
- **DSA (Digital Signature Algorithm)**: Digital signature generation and verification

### Classical Ciphers
- **Caesar Cipher**: Simple shift cipher with visual disk representation
- **Playfair Cipher**: Digraph substitution cipher with 5×5 grid visualization
- **Vigenere Cipher**: Polyalphabetic substitution with key scheduling
- **Vigenere Autokey Cipher**: Enhanced Vigenere using plaintext as extended key
- **Rail Fence Cipher**: Transposition cipher with multi-rail visualization
- **Monoalphabetic Cipher**: General-purpose substitution cipher

### Number Theory & Modular Arithmetic
- **Modular Exponentiation**: Fast exponentiation using modular arithmetic
- **Modular Inverse**: Extended Euclidean algorithm for finding modular inverse
- **Euler Totient Function**: Compute φ(n) for number theory applications
- **Modular Expressions**: Solve complex modular arithmetic expressions
- **Primitive Root Checker**: Verify primitive roots modulo prime
- **Discrete Logarithm**: Solve discrete logarithm problems
- **CRT (Chinese Remainder Theorem)**: Modular exponentiation and system solving

## UI/UX Highlights

- **Dark Theme**: Modern dark UI with slate and blue color scheme
- **Responsive Design**: Optimized for desktop and mobile devices
- **Mobile Sidebar**: Collapsible hamburger menu for mobile navigation
- **Real-time Computation**: Live results as you modify parameters
- **Input Validation**: Comprehensive error checking and user feedback
- **Visual Feedback**: Animated transitions and hover effects
- **Compact Layout**: Efficient space usage on all screen sizes

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS (v4) with dark mode
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Deployment**: GitHub Pages with GitHub Actions
- **Components**: Reusable UI components with modular architecture

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/hotung9108/AlgoCrypt.git
cd AlgoCrypt

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Setup (Already Configured)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Triggers on every push to the `main` branch
2. Installs dependencies
3. Builds the project
4. Deploys to GitHub Pages

### Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/hotung9108/AlgoCrypt
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Select **Source**: "Deploy from a branch"
   - Select **Branch**: "gh-pages" (created automatically by the workflow)
   - Select **Folder**: "/ (root)"
4. Click **Save**

### Access the Deployed App

After enabling GitHub Pages, your app will be available at:
```
https://hotung9108.github.io/AlgoCrypt/
```

## Project Structure

```
AlgoCrypt/
├── .github/workflows/          # GitHub Actions CI/CD configuration
├── src/
│   ├── algorithms/             # Cryptography algorithm implementations
│   │   ├── caesarEncrypt.ts
│   │   ├── desEncrypt.ts
│   │   ├── aesEncrypt.ts
│   │   ├── rsaEncrypt.ts
│   │   ├── elgamalEncrypt.ts
│   │   ├── dsaEncrypt.ts
│   │   ├── diffieHellmanEncrypt.ts
│   │   ├── playfairEncrypt.ts
│   │   ├── vigenereEncrypt.ts
│   │   └── [other math functions]
│   ├── pages/                  # Page components for each cipher
│   │   ├── CaesarPage.tsx
│   │   ├── DESPage.tsx
│   │   ├── AESPage.tsx
│   │   ├── RSAPage.tsx
│   │   └── [other pages]
│   ├── components/             # Reusable UI components
│   │   ├── Sidebar.tsx         # Mobile-optimized navigation
│   │   ├── CaesarDisk.tsx
│   │   ├── FormulaDisplay.tsx
│   │   └── Visualizers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Entry point
│   ├── types.ts                # TypeScript type definitions
│   └── index.css               # Global styles
├── public/                     # Static assets
├── components.json             # Component configuration
├── eslint.config.js            # ESLint configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Key Features Overview

### Algorithm Page Components

Each algorithm page includes:
- **Input Controller**: Configure parameters and input values
- **Real-time Computation**: Instant calculations as you type
- **Algorithm Details**: Display intermediate values and formulas
- **Result Display**: Show encrypted/decrypted output with copy button
- **Error Handling**: Clear error messages for invalid inputs

### Responsive Design

- Desktop: Full sidebar with complete navigation
- Tablet: Responsive layout with adjusted spacing
- Mobile: Collapsible hamburger menu, optimized touch targets

### Dark Theme

- Background: `#0f172a` (slate-900)
- Text: `text-slate-200`
- Accent: Blue and Indigo gradients
- Compact spacing for efficient UI

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

---

**Last Updated**: April 2026
**Version**: 1.0.0
