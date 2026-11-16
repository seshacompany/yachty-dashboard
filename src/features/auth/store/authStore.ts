import { create } from "zustand";
import type { User } from "@/types/auth";

export const ACCESS_TOKEN_LIFESPAN_MS = 15 * 60 * 1000;

export interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: number | null;
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
  accessTokenExpiresAt: null,
  isAuthenticated: false,
  isInitializing: true,
  setAuth: ({ accessToken, user }) =>
    set({
      accessToken,
      accessTokenExpiresAt: accessToken
        ? Date.now() + ACCESS_TOKEN_LIFESPAN_MS
        : null,
      user,
      isAuthenticated: Boolean(accessToken),
      isInitializing: false,
    }),
  setAccessToken: (accessToken) =>
    set({
      accessToken,
      accessTokenExpiresAt: accessToken
        ? Date.now() + ACCESS_TOKEN_LIFESPAN_MS
        : null,
      isAuthenticated: Boolean(accessToken),
    }),
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: Boolean(state.accessToken),
    })),
  setIsInitializing: (isInitializing) => set({ isInitializing }),
  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      accessTokenExpiresAt: null,
      isAuthenticated: false,
      isInitializing: false,
    }),
}));
