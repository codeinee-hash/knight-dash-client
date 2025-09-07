import { $authApi } from '@/shared/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

export function useDeleteGame() {
  const queryClient = useQueryClient();

  const deleteGameMutation = useMutation({
    mutationFn: async (gameId: string) => {
      const res = await $authApi.delete(`/solo-game/${gameId}`);
      return res.data;
    },
    onSuccess: (_, gameId) => {
      queryClient.invalidateQueries({ queryKey: ['solo-game', gameId] });
    },
    onError: (error: AxiosError) => {
      const errorMessages: { [key: number]: string } = {
        400: 'Неверный формат gameId',
        403: 'У вас нет прав на удаление этой игры',
        404: 'Игра не найдена',
      };

      toast.error(
        errorMessages[error.response?.status ?? 0] || 'Ошибка при удалении игры'
      );
    },
  });

  return {
    deleteGame: deleteGameMutation.mutate,
    isPending: deleteGameMutation.isPending,
    isError: deleteGameMutation.isError,
    error: deleteGameMutation.error,
  };
}
