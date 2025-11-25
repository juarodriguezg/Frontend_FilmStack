import axios from './axios';
import { API_ENDPOINTS } from '@/config/api';
import type { AuthResponse, RegisterFormData, LoginFormData, User } from '@/types';

export const authService = {
  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(API_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(API_ENDPOINTS.LOGIN, data);
    if (response.data.success && response.data.data.access_token) {
      localStorage.setItem('token', response.data.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await axios.get(API_ENDPOINTS.ME);
    return response.data.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};