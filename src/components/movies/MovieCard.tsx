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
    <Card hover className="overflow-hidden">
      <div className="relative group">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Poster';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div className="flex gap-2 w-full">
            <button
              onClick={() => onEdit(movie)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </button>
            <button
              onClick={() => onDelete(movie.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{movie.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span className="truncate">{movie.director}</span>
          </div>
          <div className="mt-2">
            <span className="inline-block bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-xs">
              {movie.genre}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};