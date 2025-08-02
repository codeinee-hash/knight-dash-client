import clsx from 'clsx';
import type { FC } from 'react';
import typeLogo from '../../assets/images/geekcoin 150.svg';
import totalGeekCoins from '../../assets/images/total-coins.png';
import type { CoinNaminals } from '../../utils/consts/consts';
import classes from './score-item.module.scss';

export const ScoreItem: FC<{
  variant: 'single' | 'total';
  nominal: CoinNaminals;
  coinCount: number;
  logo: typeof typeLogo | null;
  totalScore?: number;
}> = ({ variant, nominal, coinCount, logo, totalScore }) => {
  const coinValue = coinCount ? coinCount * nominal : 0;

  return (
    <div className={classes.scoreItem}>
      <div className={classes.label}>
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
        className={clsx(
          classes.value,
          variant === 'total' && classes.totalValue
        )}
      >
        {variant === 'single' ? coinValue : totalScore}
      </p>
    </div>
  );
};
