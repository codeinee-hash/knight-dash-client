import { $mainApi } from '@/shared/api/axios';
import { ROUTES } from '@/shared/lib/consts';
import { useSession } from '@/shared/model/use-session';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authSchema } from '../lib/schema';
import type { AuthData } from './types';

export function useLogin() {
  const navigate = useNavigate();
  const loginFn = useSession((s) => s.login);

  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      login: '',
      telephone: '+996',
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (reqData: AuthData) => {
      const { data } = await $mainApi.post('auth/sign-in', reqData);
      return data;
    },
    onSuccess(data) {
      loginFn(data.access_token);
      navigate(ROUTES.HOME);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || `Ошибка при авторизации:`);
      }
    },
  });

  const onSubmit = (data: { login: string; telephone: string }) => {
    let formattedTelephone = data.telephone.replace(/\s/g, '').trim();
    if (!formattedTelephone.startsWith('+')) {
      formattedTelephone = `+${formattedTelephone}`;
    }

    loginMutation.mutate({
      login: data.login.trim(),
      telephone: formattedTelephone,
    });
  };

  return {
    form,
    onSubmit,
    isPending: loginMutation.isPending,
  };
}
