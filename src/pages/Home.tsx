import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileCheck, Search, List, Shield, Lock, CheckCircle, Globe, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SkillCertify</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            India's first blockchain-enabled vocational certificate verification system.
            Ensuring tamper-proof, transparent, and instantly verifiable credentials for the future workforce.
          </p>
          {user && (
            <div className="mt-6 inline-flex items-center space-x-2 bg-blue-100 px-6 py-3 rounded-full">
              <span className="text-blue-800 font-semibold">Welcome back, {user.name}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ActionCard
            to="/issue"
            icon={<FileCheck className="h-8 w-8" />}
            title="Issue Certificate"
            description="Create and register new vocational certificates on the blockchain"
            color="from-blue-500 to-blue-600"
          />
          <ActionCard
            to="/verify"
            icon={<Search className="h-8 w-8" />}
            title="Verify Certificate"
            description="Instantly verify the authenticity of any certificate using blockchain"
            color="from-indigo-500 to-indigo-600"
          />
          <ActionCard
            to="/certificates"
            icon={<List className="h-8 w-8" />}
            title="View Certificates"
            description="Browse and manage all your issued certificates in one place"
            color="from-blue-600 to-indigo-600"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Blockchain for Certificates?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Lock className="h-6 w-6 text-blue-600" />}
              title="Tamper-Proof Security"
              description="Once issued, certificates cannot be altered or forged, ensuring complete integrity of credentials."
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-green-600" />}
              title="Instant Verification"
              description="Employers can verify certificates in seconds, eliminating the need for lengthy verification processes."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-indigo-600" />}
              title="Universal Access"
              description="Certificates are accessible globally, enabling learners to prove their skills anywhere, anytime."
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
              title="Future-Ready Skills"
              description="Align with India's vision for a skilled workforce with transparent, verifiable credentials."
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Smart India Hackathon 2024</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            This platform addresses the challenge of vocational certificate verification by leveraging
            blockchain technology to create a transparent, secure, and efficient ecosystem for skill validation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-sm text-blue-100">Powered by</p>
              <p className="text-lg font-bold">Blockchain Technology</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-sm text-blue-100">Built for</p>
              <p className="text-lg font-bold">Skill India Mission</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-sm text-blue-100">Ensuring</p>
              <p className="text-lg font-bold">100% Transparency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}> = ({ to, icon, title, description, color }) => (
  <Link
    to={to}
    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
  >
    <div className={`bg-gradient-to-r ${color} p-6 group-hover:scale-105 transition-transform duration-300`}>
      <div className="text-white">{icon}</div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </Link>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default Home;
