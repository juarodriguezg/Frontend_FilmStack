export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  genre: string;
  poster_url?: string;
  imdb_id?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  overview?: string;
  vote_average?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: Record<string, string[]>;
}

export interface MovieFormData {
  title: string;
  year: number;
  director: string;
  genre: string;
  tmdb_id?: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}