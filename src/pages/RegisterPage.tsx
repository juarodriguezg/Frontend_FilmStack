import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Film, UserPlus } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { authService } from '@/services/authService';
import type { RegisterFormData } from '@/types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      await authService.register(data);
      navigate('/login', { state: { message: 'Registro exitoso. Por favor inicia sesión.' } });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
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
          <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
          <p className="text-gray-400">Comienza a organizar tus películas favoritas</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Input
              label="Usuario"
              placeholder="Tu nombre de usuario"
              {...register('username', {
                required: 'El usuario es requerido',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
              })}
              error={errors.username?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              error={errors.email?.message}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
              error={errors.password?.message}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              <UserPlus className="w-5 h-5 mr-2 inline" />
              Registrarse
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};