import blitzMode from '@/shared/assets/images/blitz-mode.svg';
import bulletMode from '@/shared/assets/images/bullet-mode.svg';
import rapidMode from '@/shared/assets/images/rapid-mode.svg';

export function formatTime(seconds: number): string {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function getTimeModeImage(mode: number): string {
  return (
    {
      15: bulletMode,
      30: blitzMode,
      60: rapidMode,
    }[mode] ?? ''
  );
}
