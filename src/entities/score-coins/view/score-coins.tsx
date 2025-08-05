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
import { useCreateSoloGame } from '../model/use-create-session';
import type { SoloGameSessionInfo } from '../model/use-get-session-info';
import { GameModeSelect } from './game-mode-select';
import { Timer } from './timer';

export const ScoreCoins: FC<{
  timer: number;
  isGameRoom: boolean;
  isRunning?: boolean;
  gameSession?: SoloGameSessionInfo;
}> = ({ timer, isGameRoom, isRunning, gameSession }) => {
  const [filter, setFilter] = useState('15');
  const [isCreatingGame, setIsCreatingGame] = useState(true);

  const isDesktop = useMediaQuery('(min-width: 510px)');

  const createGame = useCreateSoloGame();
  const { setIsGameOver } = useGame();

  useEffect(() => {
    setIsCreatingGame(createGame.isPending);
  }, [createGame.isPending]);

  return (
    <>
      <div className='p-5! bg-[#393939] rounded-[8px] ml-auto! max-[1200px]:ml-0! max-[1200px]:max-w-[480px] max-[1200px]:w-full max-[1200px]:mt-5! max-[1200px]:mb-[50px]! max-[510px]:max-w-[352px] max-[390px]:max-w-[288px]'>
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

        <div className='flex flex-col gap-[5px] text-white pb-5! border-b border-b-[#666666] min-[1201px]:w-[280px]'>
          <ScoreItem
            variant='single'
            nominal={150}
            coinCount={gameSession?.score150 as number}
            logo={logo150}
          />
          <ScoreItem
            variant='single'
            nominal={200}
            coinCount={gameSession?.score200 as number}
            logo={logo200}
          />
          <ScoreItem
            variant='single'
            nominal={250}
            coinCount={gameSession?.score250 as number}
            logo={logo250}
          />
          <ScoreItem
            variant='single'
            nominal={300}
            coinCount={gameSession?.score300 as number}
            logo={logo300}
          />
          <ScoreItem
            variant='single'
            nominal={350}
            coinCount={gameSession?.score350 as number}
            logo={logo350}
          />
        </div>

        <div className='text-[15px] pt-[30px]!'>
          <h4 className='text-base mb-[15px]! text-white font-medium '>
            Общий:
          </h4>
          <ScoreItem
            variant='total'
            logo={totalGeekCoins}
            coinCount={gameSession?.score350 as number}
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
