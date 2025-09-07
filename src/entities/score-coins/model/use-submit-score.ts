import { $authApi } from '@/shared/api/axios';
import { useGame } from '@/shared/lib/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export function useSubmitScore() {
  const queryClient = useQueryClient();
  const setIsGameOver = useGame((state) => state.setIsGameOver);

  const submitScoreMutation = useMutation({
    mutationFn: async ({
      gameId,
      score,
    }: {
      gameId: string;
      score: number;
    }) => {
      const res = await $authApi.post(`/solo-game/${gameId}/submit-score`, {
        score,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['solo-game-info', data?._id],
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 403) {
        setIsGameOver(true);
      }
    },
  });

  return {
    submitScore: submitScoreMutation.mutate,
    isPending: submitScoreMutation.isPending,
    isError: submitScoreMutation.isError,
    error: submitScoreMutation.error,
  };
}
