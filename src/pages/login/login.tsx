import { LoginForm } from '@/features/auth';
import { ROUTES } from '@/shared/utils/consts/consts';
import { AuthLayout } from '@/widgets/auth-layout';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

const Login: FC = () => {
  return (
    <AuthLayout
      title='Вход'
      form={<LoginForm />}
      footerText={
        <>
          Впервые здесь?{' '}
          <Link to={ROUTES.REGISTER}>Зарегистрируйтесь бесплатно</Link>
        </>
      }
    />
  );
};

export const Component = Login;
