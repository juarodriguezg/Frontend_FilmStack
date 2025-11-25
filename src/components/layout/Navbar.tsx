import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, LogOut, User, Menu, X } from 'lucide-react';
import { authService } from '@/services/authService';

interface NavbarProps {
  isAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="backdrop-blur-sm border-b sticky top-0 z-50" style={{ 
      backgroundColor: 'var(--color-primary-1-alpha)',
      borderColor: 'var(--color-primary-3)'
    }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white transition-colors group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Film className="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" 
                  style={{ color: 'var(--color-primary-5)' }} />
            <span className="text-lg sm:text-xl font-bold">FilmStack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                >
                  Mis Películas
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg" 
                     style={{ backgroundColor: 'var(--color-primary-2)' }}>
                  <User className="w-5 h-5" style={{ color: 'var(--color-primary-5)' }} />
                  <span className="text-white text-sm">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors px-3 py-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="text-white px-4 py-2 rounded-lg transition-all hover:scale-105 shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--color-primary-3) 0%, var(--color-primary-5) 100%)'
                  }}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Mis Películas
                </Link>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" 
                     style={{ backgroundColor: 'var(--color-primary-2)' }}>
                  <User className="w-5 h-5" style={{ color: 'var(--color-primary-5)' }} />
                  <span className="text-white text-sm">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white px-4 py-2 rounded-lg transition-all text-center"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--color-primary-3) 0%, var(--color-primary-5) 100%)'
                  }}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};