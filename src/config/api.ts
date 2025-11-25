export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  ME: '/auth/me',
  
  // Movies
  MOVIES: '/movies',
  MOVIE_BY_ID: (id: number) => `/movies/${id}`,
  SEARCH_MOVIES: '/movies/search',
};