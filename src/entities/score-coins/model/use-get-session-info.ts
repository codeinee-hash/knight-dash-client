import { $authApi } from '@/shared/api/axios';
import { useQuery } from '@tanstack/react-query';

export interface SoloGameSessionInfo {
  _id: string;
  playerId: string;
  timeMode: number;
  remainingTime: number;
  startedAt: string;
  totalScore: number;
  finished: boolean;
  score150: number;
  score200: number;
  score250: number;
  score300: number;
  score350: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export function useGetSessionInfo(gameId: string) {
  const sessionStatusQuery = useQuery({
    queryKey: ['solo-game-info', gameId],
    queryFn: async () => {
      const { data } = await $authApi.get<SoloGameSessionInfo>(
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
