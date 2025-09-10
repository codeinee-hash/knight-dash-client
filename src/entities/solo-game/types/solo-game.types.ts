export type SoloGameSession = {
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
};
