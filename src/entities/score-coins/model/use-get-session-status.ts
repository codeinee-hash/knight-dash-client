import { $authApi } from '@/shared/api/axios';
import { useQuery } from '@tanstack/react-query';

export interface SoloGameSession {
  gameId: string;
  timeMode: number;
  remainingTime: number;
  totalScore: number;
  coint150: number;
  coint200: number;
  coint250: number;
  coint300: number;
  coint350: number;
  finished: boolean;
}

export function useGetSessionStatus(gameId: string) {
  const sessionStatusQuery = useQuery({
    queryKey: ['session-status', gameId],
    queryFn: async () => {
      const { data } = await $authApi.get<SoloGameSession>(
        `solo-game/${gameId}/status`
      );
      return data;
    },
    enabled: !!gameId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    isPending: sessionStatusQuery.isLoading,
    gameSession: sessionStatusQuery.data,
  };
}
