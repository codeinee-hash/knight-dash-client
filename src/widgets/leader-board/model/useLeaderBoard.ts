import { $authApi } from '@/shared/api/axios';
import type { LeaderBoardDto } from '@/shared/utils/types';
import { useQuery } from '@tanstack/react-query';

export function useLeaderBoard() {
  return useQuery({
    queryKey: ['leaderboard'],

    queryFn: async () => {
      const { data } = await $authApi.get<{
        status: string;
        data: LeaderBoardDto[];
      }>('score/top-players');
      return data.data;
    },
  });
}
