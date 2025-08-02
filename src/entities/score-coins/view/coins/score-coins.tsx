import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog';
import { Button } from '@/shared/ui/kit/button';
import { ProgresLoader } from '@/shared/ui/progress-loader/progress-loader';
import { ScoreItem } from '@/shared/ui/score-item/score-item';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import { useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateSoloGame } from '../../model/use-create-session';
import { useGetSessionStatus } from '../../model/use-get-session-status';
import { GameModeSelect } from '../game-mode-select';
import { Timer } from '../timer/timer';
import classes from './score-coins.module.scss';

export const ScoreCoins: FC<{
  timer: number;
  isGameRoom: boolean;
  isRunning?: boolean;
}> = ({ timer, isGameRoom, isRunning }) => {
  const [filter, setFilter] = useState('15');
  const [isCreatingGame, setIsCreatingGame] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 510px)');

  const createGame = useCreateSoloGame();
  const { setIsGameOver } = useGame();

  const params = useParams();
  const { gameSession } = useGetSessionStatus(String(params.gameId));

  useEffect(() => {
    setIsCreatingGame(createGame.isPending);
  }, [createGame.isPending]);

  return (
    <>
      <div className={classes.lost}>
        {isDesktop && (
          <Timer
            initialSeconds={timer}
            onEnd={() => setIsGameOver(true)}
            isRunning={isRunning}
          />
        )}

        {!isGameRoom && (
          <div className='mt-5! mb-8!'>
            <GameModeSelect value={filter} onChange={setFilter} />
            <Button
              onClick={() => createGame.create(Number(filter))}
              className='w-full h-[44px] rounded-[8px] bg-[#f5d91f] text-[#2C2E35] font-medium text-base hover:bg-[#f0b700] transition-colors duration-200'
            >
              Начать игру
            </Button>
          </div>
        )}

        {isGameRoom && (
          <h3 className='text-white mb-5! max-[510px]:hidden mt-5!'>
            {'РЕЗУЛЬТАТЫ:'}
          </h3>
        )}

        <div className={classes.lostList}>
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

        <div className={classes.total}>
          <h4>Общий:</h4>
          <ScoreItem
            variant='total'
            logo={totalGeekCoins}
            coinCount={gameSession?.coint350 as number}
            nominal={350}
            totalScore={gameSession?.totalScore}
          />
        </div>
      </div>
      <AlertDialog open={isCreatingGame} onOpenChange={setIsCreatingGame}>
        <AlertDialogContent className='p-7! bg-[#393939] border-none text-white'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Создание игровой сессии
            </AlertDialogTitle>
            <AlertDialogDescription className='text-white/80 flex flex-col items-center gap-6'>
              Подключаем вас к комнате.
              <div className='self-center'>
                <ProgresLoader />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant='outline'
              onClick={() => {
                createGame.cancel();
                setIsCreatingGame(false);
              }}
              className='text-black text-base font-medium mt-3!'
            >
              Отмена
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
