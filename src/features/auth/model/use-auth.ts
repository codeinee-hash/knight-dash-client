import { $mainApi } from '@/shared/api/axios';
import { ROUTES, Tokens } from '@/shared/utils/consts/consts';
import { useGame } from '@/shared/utils/hooks/use-game';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { create } from 'zustand';
import { useUser, type PlayerDto } from './use-user';

type TUseAuthProps = {
  isAuth: boolean;
  isLoading: boolean;
  signUp: (
    login: string,
    telephone: string,
    redirect: () => void,
    setPlayer: (data: PlayerDto | null) => void
  ) => void;
  signIn: (
    login: string,
    telephone: string,
    redirect: () => void,
    setPlayer: (data: PlayerDto | null) => void
  ) => void;
  logout: () => void;
};

export const useAuth = create<TUseAuthProps>((set) => {
  const navigate = useNavigate();
  const { clearPlayer } = useUser();
  const setStartedAt = useGame((state) => state.setStartedAt);

  return {
    isAuth: !!localStorage.getItem(Tokens.ACCESS),
    isLoading: false,

    signUp: async (login, telephone, redirect, setPlayer) => {
      try {
        set({ isLoading: true });
        const response = await $mainApi.post('auth/sign-up', {
          login,
          telephone,
        });
        if (response.status === 201) {
          const { access_token, player, message } = response.data;
          console.log(response.data);

          localStorage.setItem(Tokens.ACCESS, access_token);
          setPlayer(player);
          toast.success(message || 'Регистрация прошла успешно!');
          set({ isAuth: true });
          redirect();
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.errors[0] || 'Ошибка при регистрации');
        }
      } finally {
        set({ isLoading: false });
      }
    },

    signIn: async (login, telephone, redirect, setPlayer) => {
      try {
        set({ isLoading: true });
        const response = await $mainApi.post('auth/sign-in', {
          login,
          telephone,
        });
        if (response.status === 201) {
          const { access_token, player } = response.data;
          localStorage.setItem(Tokens.ACCESS, access_token);
          setPlayer(player);
          set({ isAuth: true });
          redirect();
          toast.success('Добро пожаловать в игру!');
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          toast.error(e.response?.data?.errors[0] || 'Ошибка при авторизации');
        }
      } finally {
        set({ isLoading: false });
      }
    },

    logout: () => {
      localStorage.removeItem(Tokens.ACCESS);
      clearPlayer();
      set({ isAuth: false });
      navigate(ROUTES.LOGIN);
      setStartedAt(null);
    },
  };
});
