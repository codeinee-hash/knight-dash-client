import leaderboardImg from '@/shared/assets/images/Leaderboard.svg';
import blitzMode from '@/shared/assets/images/blitz-mode.svg';
import bulletMode from '@/shared/assets/images/bullet-mode.svg';
import rapidMode from '@/shared/assets/images/rapid-mode.svg';

import { LeaderboardFilter } from '@/features/leaderboard-filter';
import { PageHeader } from '@/shared/ui/page-header';
import { PageLayout } from '@/widgets/page-layout';
import { MultiContainer } from '../../shared/ui/multi-container/MultiContainer';
import { LeaderBoard } from '../../widgets/leader-board';
import { useState } from 'react'

const LeaderBoards = () => {
  const [filter, setFilter] = useState('all');

  return (
    <PageLayout>
      <MultiContainer className='max-w-[970px]'>
        <div className='flex flex-col py-6!'>
          <PageHeader title='Leaderboard' img={leaderboardImg} />
          <LeaderboardFilter value={filter} onChange={setFilter} />
          {(filter === 'all' || filter === 'bullet') && (
            <LeaderBoard
              variant='page'
              boardLogo={bulletMode}
              boardTitle='Режим Пулька'
            />
          )}

          {(filter === 'all' || filter === 'blitz') && (
            <LeaderBoard
              variant='page'
              boardLogo={blitzMode}
              boardTitle='Режим Блиц'
            />
          )}

          {(filter === 'all' || filter === 'rapid') && (
            <LeaderBoard
              variant='page'
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
