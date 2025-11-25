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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-2 text-white hover:text-blue-400 transition-colors mb-4">
            <Film className="w-10 h-10" />
            <span className="text-2xl font-bold">MovieCatalog</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400">Accede a tu catálogo de películas</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
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
              <LogIn className="w-5 h-5 mr-2 inline" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
                Regístrate
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};