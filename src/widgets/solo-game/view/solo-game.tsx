import { Timer } from '@/entities/score-coins';
import {
  useConnectSoloGameSocket,
  useCreateSoloGame,
  useGetSessionInfo,
  type SoloGameSession,
} from '@/entities/solo-game';
import { BoardComponent } from '@/features/board';
import { Board } from '@/features/board/model/board';

import playerLogo from '@/shared/assets/images/yellow-logo.svg';
import { useGame, useMediaQuery } from '@/shared/lib/hooks';
import { useSession } from '@/shared/model/use-session';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog';
import { Button } from '@/shared/ui/kit/button';
import { ProgresLoader } from '@/shared/ui/progress-loader';
import { ResultInfo } from '@/widgets/result';
import { ScoreContainer } from '@/widgets/score-container';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export function SoloGame() {
  const session = useSession((state) => state.session);
  const isDesktop = useMediaQuery('(min-width: 1201px)');
  const params = useParams();

  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [board, setBoard] = useState(() => {
    const initialBoard = new Board();
    initialBoard.initCells();
    initialBoard.addFigures();
    initialBoard.addCoins(5);
    return initialBoard;
  });

  const { gameSession } = useGetSessionInfo(String(params.gameId));

  const { isGameOver, setIsGameOver } = useGame();
  const createGame = useCreateSoloGame();

  const initialSeconds = useMemo(
    () => gameSession?.remainingTime ?? 0,
    [gameSession?.remainingTime]
  );

  const { resData, error, reconnectSocket, handleGameEnd } =
    useConnectSoloGameSocket();

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    handleGameEnd();
  }, [setIsGameOver, handleGameEnd]);

  useEffect(() => {
    if (error) setIsGameOver(true);
  }, [error, setIsGameOver]);

  useEffect(() => {
    setIsCreatingGame(createGame.isPending);
  }, [createGame.isPending]);

  useEffect(() => {
    if (gameSession && !gameSession.finished) {
      setIsGameOver(false);
      const newBoard = new Board();
      newBoard.initCells();
      newBoard.addFigures();
      newBoard.addCoins(5);
      setBoard(newBoard);
    } else if (gameSession?.finished) {
      setIsGameOver(true);
    }
  }, [gameSession, setIsGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setBoard((prev) => {
        const newLevel = prev.getCoinLevel() + 1;
        prev.setCoinLevel(newLevel);
        return prev;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isGameOver]);

  const memoizedBoard = useMemo(() => board, [board]);

  console.log('Render Solo-Game-Component');

  return (
    <>
      <div className='w-full'>
        <div className='flex pt-8! max-md:pt-[18px]! relative justify-center max-[1200px]:flex-col max-[1200px]:items-center'>
          <div className='min-[1201px]:absolute min-[1201px]:left-1/2 min-[1201px]:-translate-x-1/2'>
            <div className='flex gap-6'>
              <div className='rounded bg-[#212121] px-3! py-2! inline-flex items-center gap-2.5 mb-6! text-white font-medium'>
                <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] py-[5px]! pl-[6.75px]! pr-[7.75px]!'>
                  <img
                    src={playerLogo}
                    alt='player logo'
                    width={13.5}
                    height={18}
                  />
                </div>
                {session?.login}
              </div>
              {!isDesktop && (
                <Timer
                  initialSeconds={initialSeconds}
                  onEnd={handleGameOver}
                  isRunning={!isGameOver}
                />
              )}
            </div>
            <BoardComponent board={memoizedBoard} setBoard={setBoard} />
          </div>

          <ScoreContainer
            gameSession={gameSession!}
            resData={resData}
            isRunning={!isGameOver}
            timer={initialSeconds}
          />
        </div>
      </div>

      <AlertDialog open={isGameOver} onOpenChange={setIsGameOver}>
        <ResultInfo
          gameSession={resData ?? (gameSession as SoloGameSession)}
          onRestart={() => {
            createGame.create(Number(gameSession?.timeMode));
            reconnectSocket();
          }}
        />
      </AlertDialog>

      <AlertDialog open={isCreatingGame} onOpenChange={setIsCreatingGame}>
        <AlertDialogContent className='p-7! bg-[#393939] border-none text-white'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              Создание игровой сессии
            </AlertDialogTitle>
            <AlertDialogDescription className='text-white/80 flex flex-col items-center gap-6'>
              Подключаем вас к игре.
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
}
