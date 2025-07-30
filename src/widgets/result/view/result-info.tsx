import { useUser } from '@/features/auth/model/use-user';
import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';
import { ScoreItem } from '@/shared/ui/score-item/score-item';
import { Spin } from '@/shared/ui/spiner/spin';
import { ROUTES } from '@/shared/utils/consts/consts';
import { useGame } from '@/shared/utils/hooks/use-game';
import type { IScoreCoins } from '@/shared/utils/types';
import clsx from 'clsx';
import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendScore } from '../model/useSendScore';
import classes from './result-info.module.scss';

export const ResultInfo: FC<{ coins: IScoreCoins; onRestart: () => void }> = ({
  coins,
  onRestart,
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useSendScore();
  const { player } = useUser();
  const { fetchScore } = useSendScore();
  const { setIsGameOver, gameMode } = useGame();

  useEffect(() => {
    if (player?._id) {
      fetchScore(player._id, coins.totalScore, gameMode);
    }
  }, []);

  return (
    <div className={classes.result}>
      <h3>Results</h3>

      <div className={classes.score}>
        <p className={classes.title}>score:</p>
        <div className={classes.scoreList}>
          <ScoreItem
            variant='total'
            logo={totalGeekCoins}
            coins={coins.lotCoin350}
            nominal={350}
            totalScore={coins.totalScore}
          />
          <ScoreItem
            variant='single'
            nominal={150}
            coins={coins.lotCoin150}
            logo={logo150}
          />
          <ScoreItem
            variant='single'
            nominal={200}
            coins={coins.lotCoin200}
            logo={logo200}
          />
          <ScoreItem
            variant='single'
            nominal={250}
            coins={coins.lotCoin250}
            logo={logo250}
          />
          <ScoreItem
            variant='single'
            nominal={300}
            coins={coins.lotCoin300}
            logo={logo300}
          />
          <ScoreItem
            variant='single'
            nominal={350}
            coins={coins.lotCoin350}
            logo={logo350}
          />
        </div>
      </div>

      <div className={classes.leaders}>
        <p className={classes.title}>leaderboard:</p>{' '}
        {isLoading ? (
          <div className={classes.spinner}>
            <Spin />
          </div>
        ) : (
          <ul className={classes.list}>
            {data?.slice(0, 3).map((user, idx) => (
              <li key={user._id} className={classes.player}>
                <p className={classes.login}>
                  {idx + 1}.{' '}
                  <span
                    className={clsx(user._id === player?._id && classes.itsMe)}
                  >
                    {user.login}
                  </span>
                </p>
                <p className={classes.score}>{user.score}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={classes.btns}>
        <button
          onClick={() => {
            onRestart();
            setIsGameOver(false);
          }}
          type='button'
          className={classes.restart}
        >
          Restart
        </button>
        <button
          onClick={() => navigate(ROUTES.INTRO)}
          type='button'
          className={classes.quit}
        >
          Main
        </button>
      </div>
    </div>
  );
};
