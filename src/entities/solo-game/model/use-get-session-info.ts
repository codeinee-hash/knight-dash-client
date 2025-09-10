import { $authApi } from '@/shared/api/axios';
import { useQuery } from '@tanstack/react-query';
import type { SoloGameSession } from '../types/solo-game.types'



export function useGetSessionInfo(gameId: string) {
  const sessionStatusQuery = useQuery({
    queryKey: ['solo-game-info', gameId],
    queryFn: async () => {
      const { data } = await $authApi.get<SoloGameSession>(
        `solo-game/${gameId}/info`
      );
      return data;
    },
  });

  return {
    isPending: sessionStatusQuery.isLoading,
    gameSession: sessionStatusQuery.data,
  };
}
