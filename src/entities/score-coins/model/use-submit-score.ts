import { $authApi } from '@/shared/api/axios';
import { useMutation } from '@tanstack/react-query';

export function useSubmitScore() {
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
    //  onSuccess: (data) => {
    //    console.log('Score submitted successfully:', data);
    //  },
    //  onError: (error: AxiosError) => {
    //    console.error('Error submitting score:', error);
    //    if (error.response?.status === 400) {
    //      toast.error('Неверный номинал монеты');
    //    } else if (error.response?.status === 403) {
    //      toast.error('Игра уже закончена');
    //    } else if (error.response?.status === 404) {
    //      toast.error('Игра не найдена');
    //    } else {
    //      toast.error('Ошибка при обновлении очков');
    //    }
    //  },
  });

  return {
    submitScore: submitScoreMutation.mutate,
    isPending: submitScoreMutation.isPending,
    isError: submitScoreMutation.isError,
    error: submitScoreMutation.error,
  };
}
