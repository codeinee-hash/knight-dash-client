import { formatTime } from '@/shared/utils/helpers';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import classes from './timer.module.scss';

type Props = {
  initialSeconds: number;
  onEnd?: () => void;
  isRunning?: boolean;
};

export const Timer: FC<Props> = ({
  initialSeconds,
  onEnd,
  isRunning = true,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const hasEndedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialSecondsRef = useRef(initialSeconds); // Храним начальное значение

  // Обновляем timeLeft только если initialSeconds изменился
  useEffect(() => {
    if (initialSeconds !== initialSecondsRef.current) {
      console.log('Timer: Resetting timeLeft to', initialSeconds);
      setTimeLeft(initialSeconds);
      initialSecondsRef.current = initialSeconds;
      hasEndedRef.current = false;
    }
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0 || hasEndedRef.current) {
      if (intervalRef.current) {
        console.log(
          'Timer: Stopping interval, isRunning:',
          isRunning,
          'timeLeft:',
          timeLeft
        );
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    console.log('Timer: Starting interval with timeLeft:', timeLeft);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        console.log('Timer: Tick, timeLeft:', prev);
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          if (!hasEndedRef.current) {
            hasEndedRef.current = true;
            console.log('Timer: Ended, calling onEnd');
            onEnd?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        console.log('Timer: Clearing interval');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, onEnd]);

  if (!initialSeconds) {
    return <div className={classes.timer}>00:00:00</div>;
  }

  return <div className={classes.timer}>{formatTime(Number(timeLeft))}</div>;
};
