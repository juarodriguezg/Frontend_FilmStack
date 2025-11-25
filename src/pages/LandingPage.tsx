import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Star, Heart, Search } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-6">
            Tu Catálogo Personal de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Películas</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Organiza, descubre y guarda tus películas favoritas en un solo lugar. 
            Con pósters, información detallada y una interfaz intuitiva.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Comenzar Gratis
            </Link>
            <Link
              to="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl animate-slide-up">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Búsqueda Inteligente</h3>
            <p className="text-gray-400">
              Busca películas en nuestra base de datos conectada a TMDB y agrega 
              tus favoritas con un clic.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Gestión Completa</h3>
            <p className="text-gray-400">
              Crea, edita y elimina películas de tu catálogo personal. 
              Mantén tu colección siempre actualizada.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Pósters & Info</h3>
            <p className="text-gray-400">
              Visualiza pósters de alta calidad y toda la información relevante: 
              director, año, género y más.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para organizar tu colección?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete ahora y comienza a crear tu catálogo personal de películas
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all inline-block"
          >
            Crear Cuenta Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Film className="w-6 h-6" />
            <span className="font-semibold">MovieCatalog</span>
          </div>
          <p>© 2024 MovieCatalog. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};