# 🎓 Certificate Verification App

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.57.4-3ECF8E.svg)](https://supabase.com/)

A modern, secure, and user-friendly web application for issuing, managing, and verifying digital certificates using blockchain-inspired technology. Built with React, TypeScript, and powered by Supabase for authentication.

## ✨ Features

### 🔐 **Authentication & Security**
- Secure user authentication with Supabase
- Protected routes for authorized access only
- JWT-based session management

### 📜 **Certificate Management**
- **Issue Certificates**: Create digital certificates with unique blockchain hashes
- **Verify Certificates**: Instant verification using cryptographic hashing
- **View Certificates**: Comprehensive dashboard to manage all certificates
- **Blockchain Security**: SHA-256 hashing for tamper-proof certificate integrity

### 🎨 **Modern UI/UX**
- Beautiful, responsive design with Tailwind CSS
- Intuitive navigation with React Router
- Mobile-first approach
- Dark/light theme support (expandable)

### 🛡️ **Data Security**
- Local storage with encryption-ready architecture
- Cryptographic hash generation for certificate authenticity
- UUID-based unique certificate identification

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/basant-gautam/certificate-verification-app.git
   cd certificate-verification-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new project on [Supabase](https://supabase.com)
   - Copy your project URL and anon key
   - Create environment variables or update the configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

### For Certificate Issuers
1. **Sign Up/Login**: Create an account or log in
2. **Issue Certificate**: Fill in learner details, course info, and institute
3. **Generate Hash**: Automatic blockchain-style hash generation
4. **Store Certificate**: Securely stored with unique ID

### For Certificate Verifiers
1. **Access Verification**: Use the verification page
2. **Enter Details**: Input certificate information
3. **Verify Authenticity**: Instant hash verification
4. **View Results**: Confirmation of certificate validity

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── CertificateCard.tsx
│   ├── Navbar.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts for state management
│   └── AuthContext.tsx
├── pages/             # Main application pages
│   ├── Home.tsx
│   ├── IssueCertificate.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── VerifyCertificate.tsx
│   └── ViewCertificates.tsx
├── utils/             # Utility functions
│   └── blockchain.ts  # Certificate hashing logic
└── App.tsx           # Main application component
```

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Supabase
- **Icons**: Lucide React
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run typecheck
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ by [basant-gautam](https://github.com/basant-gautam)**