import axios from './axios';
import { API_ENDPOINTS } from '@/config/api';
import type { Movie, MovieFormData, TMDBMovie, ApiResponse } from '@/types';

export const movieService = {
  async searchMovies(title: string): Promise<TMDBMovie[]> {
    const response = await axios.get<{ success: boolean; results: TMDBMovie[] }>(
      API_ENDPOINTS.SEARCH_MOVIES,
      { params: { title } }
    );
    return response.data.results || [];
  },

  async createMovie(data: MovieFormData): Promise<Movie> {
    const response = await axios.post<ApiResponse<Movie>>(API_ENDPOINTS.MOVIES, data);
    return response.data.data!;
  },

  async getMovies(): Promise<Movie[]> {
    const response = await axios.get<ApiResponse<{ movies: Movie[]; total: number }>>(
      API_ENDPOINTS.MOVIES
    );
    return response.data.data?.movies || [];
  },

  async getMovieById(id: number): Promise<Movie> {
    const response = await axios.get<ApiResponse<Movie>>(API_ENDPOINTS.MOVIE_BY_ID(id));
    return response.data.data!;
  },

  async updateMovie(id: number, data: Partial<MovieFormData>): Promise<Movie> {
    const response = await axios.put<ApiResponse<Movie>>(
      API_ENDPOINTS.MOVIE_BY_ID(id),
      data
    );
    return response.data.data!;
  },

  async deleteMovie(id: number): Promise<void> {
    await axios.delete(API_ENDPOINTS.MOVIE_BY_ID(id));
  },
};