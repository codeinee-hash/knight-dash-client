import { $authApi } from '@/shared/api/axios';
import { useQuery } from '@tanstack/react-query';

export function useGetSessionStatus(gameId: string) {
  const sessionStatusQuery = useQuery({
    queryKey: ['session-status', gameId],
    queryFn: async () => {
      const { data } = await $authApi.get(`solo-game/${gameId}/status`);
      return data;
    },
    enabled: !!gameId,
  });

  return {
    isPending: sessionStatusQuery.isLoading,
    gameSession: sessionStatusQuery.data,
  };
}
