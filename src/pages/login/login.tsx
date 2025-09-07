import { LoginForm } from '@/features/auth';
import { ROUTES } from '@/shared/lib/consts';
import { useSession } from '@/shared/model/use-session';
import { AuthLayout } from '@/widgets/auth-layout';
import { type FC } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Login: FC = () => {
  const session = useSession((state) => state.session);

  if (session) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <AuthLayout
      title='Вход'
      form={<LoginForm />}
      footerText={
        <>
          Впервые здесь? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
        </>
      }
    />
  );
};

export const Component = Login;
