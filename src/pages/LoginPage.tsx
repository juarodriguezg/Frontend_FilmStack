import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Film, LogIn } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { authService } from '@/services/authService';
import type { LoginFormData } from '@/types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const successMessage = location.state?.message;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      await authService.login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12"
         style={{
           background: `linear-gradient(135deg, var(--color-primary-1) 0%, var(--color-primary-2) 50%, var(--color-primary-3) 100%)`
         }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-2 text-white hover:opacity-80 transition-opacity mb-4">
            <Film className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: 'var(--color-primary-5)' }} />
            <span className="text-xl sm:text-2xl font-bold">FilmStack</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400 text-sm sm:text-base">Accede a tu catálogo de películas</p>
        </div>

        {/* Form Card */}
        <Card className="p-6 sm:p-8 border" style={{
          backgroundColor: 'var(--color-primary-1)',
          borderColor: 'var(--color-primary-3)'
        }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {successMessage && (
              <div className="px-4 py-3 rounded-lg border text-sm sm:text-base"
                   style={{
                     backgroundColor: 'rgba(16, 185, 129, 0.1)',
                     borderColor: '#10b981',
                     color: '#10b981'
                   }}>
                {successMessage}
              </div>
            )}

            {error && (
              <div className="px-4 py-3 rounded-lg border text-sm sm:text-base"
                   style={{
                     backgroundColor: 'rgba(239, 68, 68, 0.1)',
                     borderColor: '#ef4444',
                     color: '#ef4444'
                   }}>
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              {...register('email', {
                required: 'El email es requerido',
              })}
              error={errors.email?.message}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Tu contraseña"
              {...register('password', {
                required: 'La contraseña es requerida',
              })}
              error={errors.password?.message}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="font-semibold hover:underline"
                    style={{ color: 'var(--color-primary-5)' }}>
                Regístrate
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};