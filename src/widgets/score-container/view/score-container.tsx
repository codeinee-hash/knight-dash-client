import { ScoreCoins } from '@/entities/score-coins';
import type { SoloGameSession } from '@/entities/solo-game';
import { useMediaQuery } from '@/shared/lib/hooks';
import { ScoreItem } from '@/shared/ui/score-item';

import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';

type Props = {
  gameSession: SoloGameSession | null;
  resData: SoloGameSession | null;
  isRunning: boolean;
  timer: number;
};

export function ScoreContainer({
  timer,
  isRunning,
  resData,
  gameSession,
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 1201px)');

  if (isDesktop) {
    return (
      <ScoreCoins
        timer={timer}
        isGameRoom
        isRunning={isRunning}
        gameSession={resData ?? gameSession!}
      />
    );
  }

  return (
    <div className='max-w-[480px] max-[510px]:max-w-[352px] max-[390px]:max-w-[288px] w-full mt-6!'>
      <div className='bg-[#393939] p-2.5! text-white mb-8! rounded-lg'>
        <div className=' w-full flex flex-col gap-1 text-white pb-[20px]! pt-3! px-2! border-b border-b-[#666666]'>
          <ScoreItem
            variant='single'
            nominal={150}
            coinCount={resData?.score150 as number}
            logo={logo150}
          />
          <ScoreItem
            variant='single'
            nominal={200}
            coinCount={resData?.score200 as number}
            logo={logo200}
          />
          <ScoreItem
            variant='single'
            nominal={250}
            coinCount={resData?.score250 as number}
            logo={logo250}
          />
          <ScoreItem
            variant='single'
            nominal={300}
            coinCount={resData?.score300 as number}
            logo={logo300}
          />
          <ScoreItem
            variant='single'
            nominal={350}
            coinCount={resData?.score350 as number}
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
            coinCount={resData?.score350 as number}
            nominal={350}
            totalScore={resData?.totalScore ?? gameSession?.totalScore}
          />
        </div>
      </div>
    </div>
  );
}
