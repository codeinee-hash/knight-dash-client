import { ScoreCoins } from '@/entities/score-coins';
import { useCreateSoloGame } from '@/entities/score-coins/model/use-create-session';
import { useGetSessionStatus } from '@/entities/score-coins/model/use-get-session-status';
import { Timer } from '@/entities/score-coins/view/timer/timer';
import { BoardComponent } from '@/features/board';
import { Board } from '@/features/board/model/board';
import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';
import playerLogo from '@/shared/assets/images/yellow-logo.svg';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { ProgresLoader } from '@/shared/ui/progress-loader/progress-loader';
import { ScoreItem } from '@/shared/ui/score-item/score-item';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import { PageLayout } from '@/widgets/page-layout';
import { ResultInfo } from '@/widgets/result';
import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

const SoloGameRoom: FC = () => {
  const [board, setBoard] = useState(() => {
    const initialBoard = new Board();
    initialBoard.initCells();
    initialBoard.addFigures();
    initialBoard.addCoins(5);
    return initialBoard;
  });
  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const session = useSession((state) => state.session);
  const isDesktop = useMediaQuery('(min-width: 1201px)');
  const params = useParams();

  const { gameSession, isPending } = useGetSessionStatus(String(params.gameId));
  const { isGameOver, setIsGameOver } = useGame();
  const createGame = useCreateSoloGame();

  const initialSeconds = useMemo(
    () => gameSession?.remainingTime ?? 0,
    [gameSession]
  );

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
  }, [setIsGameOver]);

  useEffect(() => {
    setIsCreatingGame(createGame.isPending);
  }, [createGame.isPending]);

  useEffect(() => {
    if (gameSession && !gameSession.finished) {
      setIsGameOver(false);
      init();
    } else {
      setIsGameOver(true);
    }
  }, [gameSession]);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setBoard((prev) => {
        const newLevel = prev.getCoinLevel() + 1;
        prev.setCoinLevel(newLevel);
        return prev.getCopyBoard();
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isGameOver]);

  function init() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    newBoard.addCoins(5);
    setBoard(newBoard);
  }

  const memoizedBoard = useMemo(() => board, [board]);

  if (isPending) {
    return (
      <h1 className='text-3xl text-white/60 font-bold text-center mt-20!'>
        Загрузка...
      </h1>
    );
  }

  if (!gameSession) {
    return (
      <h1 className='text-3xl text-white/60 font-bold text-center mt-20!'>
        Игра не найдена
      </h1>
    );
  }

  return (
    <PageLayout soloGameSession={gameSession}>
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

          {isDesktop && (
            <ScoreCoins
              timer={initialSeconds}
              isGameRoom
              isRunning={!isGameOver}
              gameSession={gameSession}
            />
          )}

          {!isDesktop && (
            <div className='max-w-[480px] max-[510px]:max-w-[352px] max-[390px]:max-w-[288px] w-full mt-6!'>
              <Tabs defaultValue='scoreboard' className='w-full'>
                <TabsList className='flex gap-1'>
                  <TabsTrigger
                    value='scoreboard'
                    className='bg-[#494949] p-2.5! text-white text-base font-medium'
                  >
                    Результаты
                  </TabsTrigger>
                  <TabsTrigger
                    value='leaderboard'
                    className='bg-[#494949] p-2.5! text-white text-base font-medium'
                  >
                    Лидеры
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value='scoreboard'
                  className='bg-[#393939] p-2.5! text-white mb-8! rounded-lg'
                >
                  <div className='w-full flex flex-col gap-1 text-white pb-[20px]! pt-3! px-2! border-b border-b-[#666666]'>
                    <ScoreItem
                      variant='single'
                      nominal={150}
                      coinCount={board.lostCoint150.length}
                      logo={logo150}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={200}
                      coinCount={board.lostCoint200.length}
                      logo={logo200}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={250}
                      coinCount={board.lostCoint250.length}
                      logo={logo250}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={300}
                      coinCount={board.lostCoint300.length}
                      logo={logo300}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={350}
                      coinCount={board.lostCoint350.length}
                      logo={logo350}
                    />
                  </div>
                  <div className='text-[15px] pt-[30px]! pb-3! px-2!'>
                    <h4 className='text-base mb-[15px]! text-white font-medium'>
                      Общий:
                    </h4>
                    <ScoreItem
                      variant='total'
                      logo={totalGeekCoins}
                      coinCount={board.lostCoint350.length}
                      nominal={350}
                      totalScore={board.totalScore}
                    />
                  </div>
                </TabsContent>
                <TabsContent
                  value='leaderboard'
                  className='bg-[#393939] p-2.5! text-white'
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic,
                  ab? 12
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={isGameOver} onOpenChange={setIsGameOver}>
        <ResultInfo
          gameSession={gameSession}
          onRestart={() => createGame.create(Number(gameSession.timeMode))}
        />
      </AlertDialog>

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
    </PageLayout>
  );
};

export const Component = SoloGameRoom;
