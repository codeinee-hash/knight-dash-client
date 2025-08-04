import { $authApi } from '@/shared/api/axios';
import { ROUTES } from '@/shared/utils/consts/consts';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useCreateSoloGame() {
  const navigate = useNavigate();
  const abortControllerRef = useRef<AbortController | null>(null);

  const createMutation = useMutation({
    mutationFn: async (timeMode: number) => {
      abortControllerRef.current = new AbortController();
      const res = await $authApi.post(
        '/solo-game/create',
        { timeMode },
        { signal: abortControllerRef.current.signal }
      );
      return res.data;
    },
    onSuccess: (data) => {
      const gameUrl = ROUTES.SOLO_GAME_ROOM.replace(':gameId', data._id);
      // Добавляем фиктивную запись в историю
      window.history.pushState(null, '', gameUrl);
      // Заменяем текущую запись
      window.history.replaceState(null, '', gameUrl);
      // Выполняем редирект
      navigate(gameUrl, { replace: true });
    },
    onError: (err) => {
      if (err.name === 'CanceledError') {
        toast.info('Запрос отменён пользователем');
      } else {
        toast.error('Ошибка при создании игры');
      }

      navigate(ROUTES.SOLO_GAME);
    },
  });

  const cancel = () => {
    abortControllerRef.current?.abort();
  };

  return {
    create: createMutation.mutate,
    cancel,
    isPending: createMutation.isPending,
  };
}
