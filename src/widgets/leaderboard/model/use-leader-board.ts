import { $authApi } from '@/shared/api/axios';
import { useQuery } from '@tanstack/react-query';

interface TopPlayer {
  _id: string;
  login: string;
  telephone: string;
  totalScore: number;
  timeMode: number;
}

interface TopPlayersByMode {
  timeMode: number;
  players: TopPlayer[];
}

interface TopPlayersResponse {
  status: 'success';
  data: TopPlayersByMode[];
}

export function useTopPlayers() {
  return useQuery<TopPlayersResponse, Error>({
    queryKey: ['top-players'],
    queryFn: async () => {
      const { data } = await $authApi.get('/top-players');
      return data;
    },
  });
}
