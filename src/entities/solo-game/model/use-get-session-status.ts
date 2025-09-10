import { $authApi } from '@/shared/api/axios';
import { useQuery } from '@tanstack/react-query';
import type { SoloGameSession } from '../types/solo-game.types';

export function useGetSessionStatus(gameId: string) {
  const sessionStatusQuery = useQuery({
    queryKey: ['solo-game', gameId],
    queryFn: async () => {
      const { data } = await $authApi.get<SoloGameSession>(
        `solo-game/${gameId}/status`
      );
      return data;
    },
    enabled: !!gameId,
    staleTime: Infinity,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  return {
    isPending: sessionStatusQuery.isLoading,
    gameSession: sessionStatusQuery.data,
  };
}
