import { RegisterForm } from '@/features/auth';
import { ROUTES } from '@/shared/utils/consts/consts';
import { AuthLayout } from '@/widgets/auth-layout';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Register: FC = () => {
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
