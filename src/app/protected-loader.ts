import { useSession } from '@/shared/model/use-session';
import { ROUTES } from '@/shared/utils/consts';
import { redirect } from 'react-router-dom';

export const protectedLoader = async () => {
  const token = await useSession.getState().refresh();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
};
