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
    onSuccess: (data, gameId) => {
      queryClient.invalidateQueries({ queryKey: ['solo-game', gameId] });
    },
    onError: (error: AxiosError) => {
      console.error('Error deleting game:', error);
      if (error.response?.status === 400) {
        toast.error('Неверный формат gameId');
      } else if (error.response?.status === 403) {
        toast.error('У вас нет прав на удаление этой игры');
      } else if (error.response?.status === 404) {
        toast.error('Игра не найдена');
      } else {
        toast.error('Ошибка при удалении игры');
      }
    },
  });

  return {
    deleteGame: deleteGameMutation.mutate,
    isPending: deleteGameMutation.isPending,
    isError: deleteGameMutation.isError,
    error: deleteGameMutation.error,
  };
}
