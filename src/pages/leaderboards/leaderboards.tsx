import leaderboardImg from '@/shared/assets/images/Leaderboard.svg';
import blitzMode from '@/shared/assets/images/blitz-mode.svg';
import bulletMode from '@/shared/assets/images/bullet-mode.svg';
import rapidMode from '@/shared/assets/images/rapid-mode.svg';

import { LeaderboardFilter } from '@/features/leaderboard-filter';
import { MultiContainer } from '@/shared/ui/multi-container/MultiContainer';
import { PageHeader } from '@/shared/ui/page-header';
import { LeaderBoard } from '@/widgets/leader-board';
import { PageLayout } from '@/widgets/page-layout';
import { useState } from 'react';

const LeaderBoards = () => {
  const [filter, setFilter] = useState('all');

  return (
    <PageLayout>
      <MultiContainer className='max-w-[970px] max-xl:max-w-full max-xl:px-[50px]! max-sm:px-0!'>
        <div className='flex flex-col py-6! max-xl:px-[40px]! max-sm:px-[15px]!'>
          <PageHeader title='Leaderboard' img={leaderboardImg} />
          <LeaderboardFilter value={filter} onChange={setFilter} />
          {(filter === 'all' || filter === 'bullet') && (
            <LeaderBoard
              mode='15'
              boardLogo={bulletMode}
              boardTitle='Режим Пулька'
            />
          )}

          {(filter === 'all' || filter === 'blitz') && (
            <LeaderBoard
              mode='30'
              boardLogo={blitzMode}
              boardTitle='Режим Блиц'
            />
          )}

          {(filter === 'all' || filter === 'rapid') && (
            <LeaderBoard
              mode='60'
              boardLogo={rapidMode}
              boardTitle='Режим Раппид'
            />
          )}
        </div>
      </MultiContainer>
    </PageLayout>
  );
};

export const Component = LeaderBoards;
