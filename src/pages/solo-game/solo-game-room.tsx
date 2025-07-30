import { ScoreCoins } from '@/entities/score-coins';
import { Timer } from '@/entities/score-coins/view/timer/timer';
import { BoardComponent } from '@/features/board';
import { Board } from '@/features/board/model/board';
import playerLogo from '@/shared/assets/images/yellow-logo.svg';
import { useSession } from '@/shared/model/use-session';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import { PageLayout } from '@/widgets/page-layout';
import { useEffect, useState, type FC } from 'react';

const SoloGameRoom: FC = () => {
  const [board, setBoard] = useState(new Board());
  const [timerKey, setTimerKey] = useState(0);
  const isGameOver = useGame((state) => state.isGameOver);
  const session = useSession((state) => state.session);
  const isDesktop = useMediaQuery('(min-width: 1201px)');

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard((prev) => {
        const newLevel = prev.getCoinLevel() + 1;
        prev.setCoinLevel(newLevel);

        return Object.assign(new Board(), prev);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function start() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    newBoard.addCoins(5);
    setBoard(newBoard);
    setTimerKey((k) => k + 1);
  }

  const scoreBoardCoins = {
    lotCoin150: board.lostCoint150,
    lotCoin200: board.lostCoint200,
    lotCoin250: board.lostCoint250,
    lotCoin300: board.lostCoint300,
    lotCoin350: board.lostCoint350,
    totalScore: board.totalScore,
  };

  return (
    <PageLayout>
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
              {!isDesktop && <Timer timerKey={timerKey} />}
            </div>
            <BoardComponent board={board} setBoard={setBoard} />
          </div>

          {isDesktop && (
            <ScoreCoins
              timerKey={timerKey}
              coins={scoreBoardCoins}
              isGameRoom
            />
          )}

          {!isDesktop && (
            <div className='max-w-[480px] max-[510px]:max-w-[352px] max-[390px]:max-w-[288px] w-full mt-6!'>
              <Tabs defaultValue='account' className='w-full'>
                <TabsList className='flex gap-1'>
                  <TabsTrigger
                    value='account'
                    className='bg-[#494949] p-2.5! text-white text-base font-medium'
                  >
                    Результаты
                  </TabsTrigger>
                  <TabsTrigger
                    value='password'
                    className='bg-[#494949] p-2.5! text-white text-base font-medium'
                  >
                    Лидеры
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value='account'
                  className='bg-[#393939] p-2.5! text-white'
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsam, recusandae!
                </TabsContent>
                <TabsContent
                  value='password'
                  className='bg-[#393939] p-2.5! text-white'
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic,
                  ab?
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export const Component = SoloGameRoom;
