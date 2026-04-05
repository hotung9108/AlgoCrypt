# AlgoCrypt - Cryptography Algorithm Visualization

A modern web application for visualizing and experimenting with various cryptography algorithms including DES, AES-128, Caesar, Playfair, Vigenere, Rail Fence, and Monoalphabetic ciphers.

## Live Demo

The application is automatically deployed to GitHub Pages. Visit: [AlgoCrypt Dashboard](https://hotung9108.github.io/AlgoCrypt/)

## Features

- **DES Encryption**: 64-bit block cipher with 56-bit key and 16 rounds
- **AES-128 Encryption**: 128-bit block cipher with 128-bit key and 10 rounds
- **Caesar Cipher**: Simple substitution cipher with adjustable shift
- **Playfair Cipher**: Digraph substitution cipher
- **Vigenere Cipher**: Polyalphabetic substitution cipher
- **Vigenere Autokey Cipher**: Enhanced Vigenere with autokey mechanism
- **Rail Fence Cipher**: Transposition cipher for rail fence method
- **Monoalphabetic Cipher**: General-purpose substitution cipher

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with GitHub Actions

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
├── .github/workflows/      # GitHub Actions CI/CD configuration
├── src/
│   ├── algorithms/         # Cryptography algorithm implementations
│   ├── pages/              # Page components for each cipher
│   ├── components/         # Reusable UI components
│   ├── App.tsx             # Main application component
│   └── index.css           # Global styles
├── public/                 # Static assets
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

---

**Note**: For questions about the deployment process or to troubleshoot, please refer to the GitHub Actions logs in the **Actions** tab of your repository.

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
