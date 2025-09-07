import { ROUTES } from '@/shared/lib/consts';
import { useSession } from '@/shared/model/use-session';
import { redirect } from 'react-router-dom';

export const protectedLoader = async () => {
  const token = await useSession.getState().refresh();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
};
