import { ScoreCoins } from '@/entities/score-coins';
import { BoardComponent } from '@/features/board';
import { Board } from '@/features/board/model/board';
import playerLogo from '@/shared/assets/images/yellow-logo.svg';
import { useSession } from '@/shared/model/use-session';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import { PageLayout } from '@/widgets/page-layout';
import { useEffect, useState, type FC } from 'react';

const SoloGameRoom: FC = () => {
  const [board, setBoard] = useState(new Board());
  const isDesktop = useMediaQuery('(min-width: 1201px)');
  const session = useSession((state) => state.session);

  useEffect(() => {
    init();
  }, []);

  function init() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
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
        <div className='flex pt-8! relative justify-center'>
          <div className='absolute left-1/2 -translate-x-1/2'>
            <div className='rounded bg-[#212121] px-3! py-2! inline-flex items-center gap-2.5 mb-6! text-white font-medium'>
              <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] py-[5px]! pl-[6.75px]! pr-[7.75px]! max-md:hidden'>
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

          {isDesktop && (
            <ScoreCoins
              timerKey={0}
              coins={scoreBoardCoins}
              isGameRoom={false}
            />
          )}
        </div>
        {!isDesktop && <div className='text-center'>tab bar</div>}
      </div>
    </PageLayout>
  );
};

export const Component = SoloGameRoom;
