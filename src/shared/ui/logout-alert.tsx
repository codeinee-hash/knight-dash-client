import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../model/use-session';
import { ROUTES } from '../utils/consts/consts';

export function LogoutAlert() {
  const logout = useSession((state) => state.logout);

  const navigate = useNavigate();

  return (
    <AlertDialogContent className='p-7! bg-[#393939] border-none text-white'>
      <AlertDialogHeader>
        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
        <AlertDialogDescription className='text-white/80'>
          Вы действительно хотите выйти? Вам нужно будет снова войти, чтобы
          продолжить.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel className='text-[#393939] px-3!'>
          Отмена
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            navigate(ROUTES.LOGIN);
            logout();
          }}
          className='text-[#F5D91F] px-3!'
        >
          Выйти
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
