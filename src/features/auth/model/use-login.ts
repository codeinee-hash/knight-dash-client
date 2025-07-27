import { $mainApi } from '@/shared/api/axios';
import { useSession } from '@/shared/model/use-session';
import { ROUTES } from '@/shared/utils/consts/consts';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { AuthData } from './types';

export function useLogin() {
  const navigate = useNavigate();
  const loginFn = useSession((s) => s.login);

  const loginMutation = useMutation({
    mutationFn: async (reqData: AuthData) => {
      const { data } = await $mainApi.post('auth/sign-in', reqData);
      return data;
    },
    onSuccess(data) {
      loginFn(data.access_token);
      navigate(ROUTES.HOME);
      toast.success('Добро пожаловать в Knight Dash!');
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || 'Ошибка при авторизации'
        );
      }
    },
  });

  const login = (data: AuthData) => {
    loginMutation.mutate(data);
  };

  return {
    login,
    isPending: loginMutation.isPending,
  };
}
