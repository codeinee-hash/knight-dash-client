import { formatTime } from '@/shared/utils/helpers';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

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
  const intervalRef = useRef<number | null>(null);
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
    return (
      <div className='w-[120px] h-[44px] rounded border border-[#f5d91f] flex items-center justify-center font-medium bg-[#393939] text-white shadow-[0_0_6px_2px_#f5d91f]'>
        00:00:00
      </div>
    );
  }

  return (
    <div className='w-[120px] h-[44px] rounded border border-[#f5d91f] flex items-center justify-center font-medium bg-[#393939] text-white shadow-[0_0_6px_2px_#f5d91f]'>
      {formatTime(Number(timeLeft))}
    </div>
  );
};
