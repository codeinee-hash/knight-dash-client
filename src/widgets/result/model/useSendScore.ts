import { $authApi } from '@/shared/api/axios';
import type { GAME_MODE } from '@/shared/utils/consts/consts';
import type { LeaderBoardDto } from '@/shared/utils/types';
import { create } from 'zustand';

interface IResponse {
  message: string;
  isLoading: boolean;
  data: LeaderBoardDto[];
  fetchScore: (id: string, score: number, mode: GAME_MODE) => Promise<void>;
}

export const useSendScore = create<IResponse>((set) => ({
  data: [],
  message: '',
  isLoading: false,

  fetchScore: async (id: string, score: number, mode) => {
    try {
      set({ isLoading: true });
      const response = await $authApi.post<IResponse>(
        `score/update-score?mode=${mode}`,
        {
          id,
          score,
        }
      );
      set({
        data: response.data.data,
        message: response.data.message,
      });
    } catch (e) {
      return Promise.reject(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
