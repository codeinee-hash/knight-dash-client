import { useGetSessionStatus } from '@/entities/solo-game';
import { Spin } from '@/shared/ui/spin';
import { PageLayout } from '@/widgets/page-layout';
import { SoloGame } from '@/widgets/solo-game';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';

const SoloGameRoom: FC = () => {
  const params = useParams();
  const { gameSession, isPending } = useGetSessionStatus(String(params.gameId));

  if (isPending) {
    return (
      <div className='w-full h-screen flex justify-center pt-[200px]!'>
        <Spin />
      </div>
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
      <SoloGame gameSession={gameSession} />
    </PageLayout>
  );
};

export const Component = SoloGameRoom;
