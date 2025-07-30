import { ScoreCoins } from '@/entities/score-coins';
import { Timer } from '@/entities/score-coins/view/timer/timer';
import { BoardComponent } from '@/features/board';
import { Board } from '@/features/board/model/board';
import playerLogo from '@/shared/assets/images/yellow-logo.svg';
import { useSession } from '@/shared/model/use-session';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import { PageLayout } from '@/widgets/page-layout';
import { useEffect, useState, type FC } from 'react';

const SoloGameRoom: FC = () => {
  const [board, setBoard] = useState(new Board());
  const [timerKey, setTimerKey] = useState(0);
  const isMobile = useMediaQuery('(max-width: 510px)');
  const isGameOver = useGame((state) => state.isGameOver);
  const session = useSession((state) => state.session);

  useEffect(() => {
    restart();
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

  function restart() {
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
        {isMobile ? (
          <>
            <Timer timerKey={timerKey} />
            <BoardComponent board={board} setBoard={setBoard} />
          </>
        ) : (
          <div className='flex pt-8! relative justify-center'>
            <div className='absolute left-1/2 -translate-x-1/2'>
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
              <BoardComponent board={board} setBoard={setBoard} />
            </div>
            <ScoreCoins
              timerKey={timerKey}
              coins={scoreBoardCoins}
              isGameRoom
            />
          </div>
        )}
      </div>
      {/* <Modal isOpen={isGameOver}>
        <ResultInfo coins={scoreBoardCoins} onRestart={restart} />
      </Modal> */}
    </PageLayout>
  );
};

export const Component = SoloGameRoom;
