import { RegisterForm } from '@/features/auth';
import { useSession } from '@/shared/model/use-session';
import { ROUTES } from '@/shared/utils/consts';
import { AuthLayout } from '@/widgets/auth-layout';
import type { FC } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Register: FC = () => {
  const session = useSession((state) => state.session);

  if (session) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <AuthLayout
      title='Регистрация'
      form={<RegisterForm />}
      footerText={
        <>
          У вас уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  );
};

export const Component = Register;
