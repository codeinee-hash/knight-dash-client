import { useGetSessionStatus } from '@/entities/score-coins/model/use-get-session-status';
import { ROUTES } from '@/shared/utils/consts/consts';
import { Navigate, useParams } from 'react-router-dom';

export function SoloGameRoomGuard({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const { gameSession } = useGetSessionStatus(String(params.gameId));

  if (!params.gameId) return <Navigate to={ROUTES.HOME} />;

  if (gameSession?.finished) return <Navigate to={ROUTES.HOME} />;

  return <>{children}</>;
}
