import { create } from 'zustand';
import { LinkedInUser, AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (user: LinkedInUser) => set({ user, isAuthenticated: true, isLoading: false }),
  logout: () => set({ user: null, isAuthenticated: false }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
