import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Search } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { movieService } from '@/services/movieService';
import type { MovieFormData, Movie, TMDBMovie } from '@/types';

interface MovieFormProps {
  movie?: Movie;
  onSubmit: (data: MovieFormData) => Promise<void>;
  onCancel: () => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: movie ? {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      genre: movie.genre,
      tmdb_id: movie.imdb_id,
    } : undefined,
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await movieService.searchMovies(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectMovie = (tmdbMovie: TMDBMovie) => {
    setValue('title', tmdbMovie.title);
    setValue('year', new Date(tmdbMovie.release_date || '').getFullYear() || new Date().getFullYear());
    setValue('tmdb_id', tmdbMovie.id.toString());
    setSearchResults([]);
    setSearchQuery('');
  };

  const onFormSubmit = async (data: MovieFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8 border" style={{
        backgroundColor: 'var(--color-primary-1)',
        borderColor: 'var(--color-primary-3)'
      }}>
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {movie ? 'Editar Película' : 'Agregar Película'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Search Section */}
          {!movie && (
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Buscar película en TMDB..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 text-white text-sm sm:text-base"
                  style={{
                    backgroundColor: 'var(--color-primary-2)',
                    borderColor: 'var(--color-primary-3)',
                    border: '1px solid'
                  }}
                />
                <Button onClick={handleSearch} isLoading={isSearching} className="w-full sm:w-auto">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectMovie(result)}
                      className="w-full flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg transition-colors text-left"
                      style={{
                        backgroundColor: 'var(--color-primary-2)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-3)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-2)'}
                    >
                      {result.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                          alt={result.title}
                          className="w-10 h-14 sm:w-12 sm:h-18 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm sm:text-base truncate">{result.title}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {result.release_date ? new Date(result.release_date).getFullYear() : 'N/A'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3 sm:space-y-4">
            <Input
              label="Título"
              placeholder="Título de la película"
              {...register('title', { required: 'El título es requerido' })}
              error={errors.title?.message}
            />

            <Input
              label="Año"
              type="number"
              placeholder="2024"
              {...register('year', {
                required: 'El año es requerido',
                min: { value: 1, message: 'Año inválido' },
                max: { value: 2100, message: 'Año inválido' },
              })}
              error={errors.year?.message}
            />

            <Input
              label="Director"
              placeholder="Nombre del director"
              {...register('director', { required: 'El director es requerido' })}
              error={errors.director?.message}
            />

            <Input
              label="Género"
              placeholder="Ej: Acción, Drama, Ciencia Ficción"
              {...register('genre', { required: 'El género es requerido' })}
              error={errors.genre?.message}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" isLoading={isLoading} className="flex-1 order-2 sm:order-1">
                {movie ? 'Actualizar' : 'Agregar'}
              </Button>
              <Button type="button" variant="secondary" onClick={onCancel} className="flex-1 order-1 sm:order-2">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};