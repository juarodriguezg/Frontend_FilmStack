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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
          <p className="text-gray-400 text-sm sm:text-base">Comienza a organizar tus películas favoritas</p>
        </div>

        {/* Form Card */}
        <Card className="p-6 sm:p-8 border" style={{
          backgroundColor: 'var(--color-primary-1)',
          borderColor: 'var(--color-primary-3)'
        }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 inline" />
              Registrarse
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-semibold hover:underline"
                    style={{ color: 'var(--color-primary-5)' }}>
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};