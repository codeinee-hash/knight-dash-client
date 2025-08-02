import blitzMode from '@/shared/assets/images/blitz-mode.svg';
import bulletMode from '@/shared/assets/images/bullet-mode.svg';
import rapidMode from '@/shared/assets/images/rapid-mode.svg';

export function formatTime(seconds: number) {
  console.log('in helper fn:', seconds);

  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function getTimeModeImage(mode: number) {
  switch (mode) {
    case 15:
      return bulletMode;
    case 30:
      return blitzMode;
    case 60:
      return rapidMode;
    default:
      return '';
  }
}
