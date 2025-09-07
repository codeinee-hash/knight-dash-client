import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { $mainApi } from '../api/axios';
import { Tokens } from '../lib/consts';

type Session = {
  telephone: number;
  login: string;
  exp: number;
  iat: number;
};

type SessionStore = {
  token: string | null;
  session: Session | null;
  login: (token: string) => void;
  logout: () => void;
  refresh: () => Promise<string | null>;
};

let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = create<SessionStore>((set, get) => {
  const token = localStorage.getItem(Tokens.ACCESS) || null;

  const decoded = token ? jwtDecode<Session>(token) : null;

  return {
    token,
    session: decoded,

    login(token: string) {
      localStorage.setItem(Tokens.ACCESS, token);
      set({ token, session: jwtDecode<Session>(token) });
    },

    logout() {
      localStorage.removeItem(Tokens.ACCESS);
      set({ token: null, session: null });
      $mainApi.post('auth/logout');
    },

    async refresh() {
      const { token, login, logout } = get();
      if (!token) {
        return null;
      }

      const session = jwtDecode<Session>(token);

      if (session?.exp < Date.now() / 1000 + 1) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = $mainApi
            .post('auth/refresh')
            .then((res) => res.data?.access_token ?? null)
            .then((newToken) => {
              if (newToken) {
                login(newToken);
                return newToken;
              } else {
                logout();
                return null;
              }
            })
            .catch((err) => {
              console.error('Ошибка при обновлении токена: ', err);
              logout();
              return null;
            })
            .finally(() => {
              refreshTokenPromise = null;
            });
        }

        const newToken = await refreshTokenPromise;
        return newToken;
      }

      return token;
    },
  };
});
