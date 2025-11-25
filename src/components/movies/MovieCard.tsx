import React from 'react';
import { Edit, Trash2, Calendar, User } from 'lucide-react';
import { Card } from '@/components/common/Card';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  const posterUrl = movie.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <Card hover className="overflow-hidden border" style={{
      borderColor: 'var(--color-primary-3)',
      backgroundColor: 'var(--color-primary-1)'
    }}>
      <div className="relative group">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-48 sm:h-56 md:h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Poster';
          }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4"
             style={{
               background: 'linear-gradient(to top, rgba(0, 37, 58, 0.95) 0%, transparent 100%)'
             }}>
          <div className="flex gap-2 w-full">
            <button
              onClick={() => onEdit(movie)}
              className="flex-1 text-white py-2 rounded-lg transition-all hover:scale-105 text-sm sm:text-base flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-primary-3) 0%, var(--color-primary-4) 100%)'
              }}
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Editar</span>
            </button>
            <button
              onClick={() => onDelete(movie.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all hover:scale-105 text-sm sm:text-base flex items-center justify-center shadow-lg"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Eliminar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 truncate">{movie.title}</h3>
        
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" 
                      style={{ color: 'var(--color-primary-5)' }} />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center">
            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" 
                  style={{ color: 'var(--color-primary-5)' }} />
            <span className="truncate">{movie.director}</span>
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: 'var(--color-primary-3)',
                    color: 'var(--color-primary-5)'
                  }}>
              {movie.genre}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};