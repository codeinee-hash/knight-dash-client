import { formatTime } from '@/shared/utils/helpers';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useGameTimer } from '@/shared/utils/hooks/use-game-timer';
import type { FC } from 'react';
import classes from './timer.module.scss';

export const Timer: FC<{ timerKey: number }> = ({ timerKey }) => {
  const setIsGameOver = useGame((state) => state.setIsGameOver);
  const setStartedAt = useGame((state) => state.setStartedAt);
  const timer = useGame((state) => state.gameMode);

  const timeLeft = useGameTimer(
    timer,
    () => {
      setIsGameOver(true);
      setStartedAt(null);
    },
    timerKey
  );

  if (timerKey === 0) {
    return <div className={classes.timer}>00:00:00</div>;
  }

  return <div className={classes.timer}>{formatTime(timeLeft)}</div>;
};
