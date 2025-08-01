import { ScoreCoins } from '@/entities/score-coins';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/kit/tabs';
import { ScoreItem } from '@/shared/ui/score-item/score-item';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import { PageLayout } from '@/widgets/page-layout';
import { useEffect, useState } from 'react';

export function SoloGameRoom() {
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
              <Tabs defaultValue='scoreboard' className='w-full'>
                <TabsList className='flex gap-1'>
                  <TabsTrigger
                    value='scoreboard'
                    className='bg-[#494949] p-2.5! text-white text-base font-medium'
                  >
                    Результаты
                  </TabsTrigger>
                  <TabsTrigger
                    value='lederboard'
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
                      coins={board.lostCoint150}
                      logo={logo150}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={200}
                      coins={board.lostCoint200}
                      logo={logo200}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={250}
                      coins={board.lostCoint250}
                      logo={logo250}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={300}
                      coins={board.lostCoint300}
                      logo={logo300}
                    />
                    <ScoreItem
                      variant='single'
                      nominal={350}
                      coins={board.lostCoint350}
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
                      coins={board.lostCoint350}
                      nominal={350}
                      totalScore={board.totalScore}
                    />
                  </div>
                </TabsContent>
                <TabsContent
                  value='lederboard'
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
    </PageLayout>
  );
}

// export const Component = SoloGameRoom;
