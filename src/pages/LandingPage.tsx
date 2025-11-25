import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Star, Heart, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, var(--color-primary-1) 0%, var(--color-primary-2) 50%, var(--color-primary-3) 100%)`
    }}>
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            Tu Catálogo Personal de
            <span className="block mt-2 text-gradient-primary">Películas</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Organiza, descubre y guarda tus películas favoritas en un solo lugar. 
            Con pósters, información detallada y una interfaz intuitiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/register"
              className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-primary-3) 0%, var(--color-primary-5) 100%)'
              }}
            >
              Comenzar Gratis
            </Link>
            <Link
              to="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg transition-all border border-gray-700"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl animate-slide-up border border-gray-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 shadow-lg"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--color-primary-3) 0%, var(--color-primary-4) 100%)'
                 }}>
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Búsqueda Inteligente</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Busca películas en nuestra base de datos conectada a TMDB y agrega 
              tus favoritas con un clic.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl animate-slide-up border border-gray-700" 
               style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 shadow-lg"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--color-primary-4) 0%, var(--color-primary-5) 100%)'
                 }}>
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Gestión Completa</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Crea, edita y elimina películas de tu catálogo personal. 
              Mantén tu colección siempre actualizada.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl animate-slide-up border border-gray-700" 
               style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 shadow-lg"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--color-primary-5) 0%, #00f0ff 100%)'
                 }}>
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Pósters & Info</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Visualiza pósters de alta calidad y toda la información relevante: 
              director, año, género y más.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="rounded-2xl p-8 sm:p-12 shadow-2xl border"
             style={{
               background: 'linear-gradient(135deg, var(--color-primary-2) 0%, var(--color-primary-4) 100%)',
               borderColor: 'var(--color-primary-5)'
             }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            ¿Listo para organizar tu colección?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8" style={{ color: 'var(--color-primary-5)' }}>
            Únete ahora y comienza a crear tu catálogo personal de películas
          </p>
          <Link
            to="/register"
            className="inline-block bg-white hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold shadow-lg transition-all hover:scale-105"
            style={{ color: 'var(--color-primary-2)' }}
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 sm:py-8" style={{ 
        backgroundColor: 'var(--color-primary-1)',
        borderColor: 'var(--color-primary-3)'
      }}>
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Film className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--color-primary-5)' }} />
            <span className="font-semibold text-sm sm:text-base">FilmStack</span>
          </div>
          <p className="text-xs sm:text-sm">© 2025 FilmStack. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};