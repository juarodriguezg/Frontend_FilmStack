import React, { useState, useEffect } from 'react';
import { Plus, Film as FilmIcon } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/common/Button';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieForm } from '@/components/movies/MovieForm';
import { movieService } from '@/services/movieService';
import type { Movie, MovieFormData } from '@/types';

export const DashboardPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>();

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await movieService.getMovies();
      setMovies(data);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: MovieFormData) => {
    try {
      await movieService.createMovie(data);
      await loadMovies();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  };

  const handleUpdate = async (data: MovieFormData) => {
    if (!editingMovie) return;
    
    try {
      await movieService.updateMovie(editingMovie.id, data);
      await loadMovies();
      setEditingMovie(undefined);
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta película?')) return;

    try {
      await movieService.deleteMovie(id);
      await loadMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar isAuthenticated />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Mis Películas</h1>
            <p className="text-gray-400">
              {movies.length} {movies.length === 1 ? 'película' : 'películas'} en tu catálogo
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Agregar Película
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Cargando películas...</p>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <FilmIcon className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No hay películas aún</h2>
            <p className="text-gray-400 mb-6">Comienza agregando tu primera película favorita</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Agregar Primera Película
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <MovieForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingMovie && (
        <MovieForm
          movie={editingMovie}
          onSubmit={handleUpdate}
          onCancel={() => setEditingMovie(undefined)}
        />
      )}
    </div>
  );
};