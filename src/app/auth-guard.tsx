import { useSession } from '@/shared/model/use-session';
import { ROUTES } from '@/shared/utils/consts/consts';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthorizationGuard: FC = () => {
  const session = useSession((s) => s.session);

  return session ? <Outlet /> : <Navigate to={ROUTES.HOME} replace />;
};
