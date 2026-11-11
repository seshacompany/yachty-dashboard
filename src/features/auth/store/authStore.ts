import { create } from "zustand";
import type { User } from "@/types/auth";

export interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAuth: (data: { accessToken: string; user: User }) => void;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
  setIsInitializing: (isInitializing: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: ({ accessToken, user }) =>
    set({
      accessToken,
      user,
      isAuthenticated: Boolean(accessToken && user),
      isInitializing: false,
    }),
  setAccessToken: (accessToken) =>
    set((state) => ({
      accessToken,
      isAuthenticated: Boolean(accessToken && state.user),
    })),
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: Boolean(state.accessToken && user),
    })),
  setIsInitializing: (isInitializing) => set({ isInitializing }),
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isInitializing: false,
    }),
}));
