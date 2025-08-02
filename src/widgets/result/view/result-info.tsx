import { useGetSessionStatus } from '@/entities/score-coins/model/use-get-session-status';
import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog';
import { Button } from '@/shared/ui/kit/button';
import { ScoreItem } from '@/shared/ui/score-item/score-item';
import { ROUTES } from '@/shared/utils/consts/consts';
import { getTimeModeImage } from '@/shared/utils/helpers';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ResultInfo: FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const navigate = useNavigate();

  const params = useParams();
  const { gameSession } = useGetSessionStatus(String(params.gameId));

  return (
    <AlertDialogContent className='p-7! bg-[#393939] border-none outline-none text-white'>
      <AlertDialogHeader className='flex flex-col items-center gap-2'>
        <img
          src={getTimeModeImage(gameSession?.timeMode as number)}
          alt='time mode'
          width={70}
          height={70}
        />
        <AlertDialogTitle className='text-center text-2xl'>
          Игра закончена
        </AlertDialogTitle>
      </AlertDialogHeader>

      <div className='flex flex-col gap-2.5 mb-3!'>
        <h4 className='mb-3! text-lg font-medium'>Результаты:</h4>
        <ScoreItem
          variant='total'
          logo={totalGeekCoins}
          coinCount={gameSession?.coint350 as number}
          nominal={350}
          totalScore={gameSession?.totalScore}
        />
        <ScoreItem
          variant='single'
          nominal={150}
          coinCount={gameSession?.coint150 as number}
          logo={logo150}
        />
        <ScoreItem
          variant='single'
          nominal={200}
          coinCount={gameSession?.coint200 as number}
          logo={logo200}
        />
        <ScoreItem
          variant='single'
          nominal={250}
          coinCount={gameSession?.coint250 as number}
          logo={logo250}
        />
        <ScoreItem
          variant='single'
          nominal={300}
          coinCount={gameSession?.coint300 as number}
          logo={logo300}
        />
        <ScoreItem
          variant='single'
          nominal={350}
          coinCount={gameSession?.coint350 as number}
          logo={logo350}
        />
      </div>

      <AlertDialogFooter>
        <Button
          className='text-white/60 px-3! bg-[#202020]'
          onClick={() => navigate(ROUTES.SOLO_GAME)}
        >
          На главную
        </Button>
        <AlertDialogAction
          onClick={onRestart}
          className='text-[#F5D91F]/80 px-3! bg-[#202020]'
        >
          Начать снова
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
