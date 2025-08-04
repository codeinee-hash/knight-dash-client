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
  const initialSecondsRef = useRef(initialSeconds);

  useEffect(() => {
    if (initialSeconds !== initialSecondsRef.current) {
      setTimeLeft(initialSeconds);
      initialSecondsRef.current = initialSeconds;
      hasEndedRef.current = false;
    }
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0 || hasEndedRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          if (!hasEndedRef.current) {
            hasEndedRef.current = true;
            onEnd?.();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, onEnd, timeLeft]);

  if (!initialSeconds) {
    return <div className={classes.timer}>00:00:00</div>;
  }

  return <div className={classes.timer}>{formatTime(Number(timeLeft))}</div>;
};
