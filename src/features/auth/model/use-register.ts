import { $mainApi } from '@/shared/api/axios';
import { useSession } from '@/shared/model/use-session';
import { ROUTES } from '@/shared/utils/consts/consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authSchema } from '../lib/schema';
import type { AuthData } from './types';

export function useRegister() {
  const navigate = useNavigate();
  const login = useSession((s) => s.login);

  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      login: '',
      telephone: '+996',
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (reqData: AuthData) => {
      const { data } = await $mainApi.post('auth/sign-up', reqData);
      return data;
    },
    onSuccess(data) {
      login(data.access_token);
      navigate(ROUTES.HOME);
      toast.success('Добро пожаловать в Knight Dash!');
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || `Ошибка при регистрации`);
      }
    },
  });

  const onSubmit = (data: { login: string; telephone: string }) => {
    let formattedTelephone = data.telephone.replace(/\s/g, '').trim();
    if (!formattedTelephone.startsWith('+')) {
      formattedTelephone = `+${formattedTelephone}`;
    }

    registerMutation.mutate({
      login: data.login.trim(),
      telephone: formattedTelephone,
    });
  };

  return {
    form,
    onSubmit,
    isPending: registerMutation.isPending,
  };
}
