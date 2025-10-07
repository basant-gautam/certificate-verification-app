import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Home, FileCheck, Search, List, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg border-b border-blue-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg group-hover:bg-white/20 transition-all duration-300">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold tracking-tight">SkillCertify</span>
              <span className="text-blue-100 text-xs">Blockchain Verified</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Home" isActive={isActive('/')} />
            <NavLink to="/issue" icon={<FileCheck className="h-4 w-4" />} text="Issue" isActive={isActive('/issue')} />
            <NavLink to="/verify" icon={<Search className="h-4 w-4" />} text="Verify" isActive={isActive('/verify')} />
            <NavLink to="/certificates" icon={<List className="h-4 w-4" />} text="Certificates" isActive={isActive('/certificates')} />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <User className="h-4 w-4 text-blue-100" />
              <span className="text-white text-sm font-medium">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-1 pb-3 overflow-x-auto">
          <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Home" isActive={isActive('/')} />
          <NavLink to="/issue" icon={<FileCheck className="h-4 w-4" />} text="Issue" isActive={isActive('/issue')} />
          <NavLink to="/verify" icon={<Search className="h-4 w-4" />} text="Verify" isActive={isActive('/verify')} />
          <NavLink to="/certificates" icon={<List className="h-4 w-4" />} text="Certificates" isActive={isActive('/certificates')} />
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string; isActive: boolean }> = ({
  to,
  icon,
  text,
  isActive,
}) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-white text-blue-700 shadow-md'
        : 'text-blue-50 hover:bg-white/10 hover:text-white'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{text}</span>
  </Link>
);

export default Navbar;
