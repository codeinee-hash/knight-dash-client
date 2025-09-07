import typeLogo from '@/shared/assets/images/geekcoin 150.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';
import { cn } from '@/shared/lib/utils';
import type { CoinNaminals } from '../lib/consts';

export function ScoreItem({
  variant,
  nominal,
  coinCount,
  logo,
  totalScore,
}: {
  variant: 'single' | 'total';
  nominal: CoinNaminals;
  coinCount: number;
  logo: typeof typeLogo | null;
  totalScore?: number;
}) {
  const coinValue = coinCount ? coinCount * nominal : 0;

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2.5 text-white'>
        <div>
          <img
            width={variant === 'total' ? 72 : 30}
            height={30}
            src={variant === 'single' ? logo ?? typeLogo : totalGeekCoins}
            alt={`logo-${nominal}`}
          />
        </div>
        <p>{variant === 'single' ? `GeekCoin ${nominal}` : `GeekCoins`}</p>
      </div>
      <p
        className={cn(
          'text-white text-base font-medium',
          variant === 'total' && 'text-[#f5d91f]!'
        )}
      >
        {variant === 'single' ? coinValue : totalScore}
      </p>
    </div>
  );
}
