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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {movie ? 'Editar Película' : 'Agregar Película'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!movie && (
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Buscar película en TMDB..."
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <Button onClick={handleSearch} isLoading={isSearching}>
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectMovie(result)}
                      className="w-full flex items-center gap-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left"
                    >
                      {result.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                          alt={result.title}
                          className="w-12 h-18 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-semibold">{result.title}</p>
                        <p className="text-gray-400 text-sm">
                          {result.release_date ? new Date(result.release_date).getFullYear() : 'N/A'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
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

            <div className="flex gap-3 pt-4">
              <Button type="submit" isLoading={isLoading} className="flex-1">
                {movie ? 'Actualizar' : 'Agregar'}
              </Button>
              <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};