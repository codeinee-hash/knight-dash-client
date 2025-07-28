import { ROUTES } from '@/shared/utils/consts/consts';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './app';
import { AuthorizationGuard, protectedLoader } from './auth-guard';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        loader: protectedLoader,
        element: <AuthorizationGuard />,
        children: [
          {
            path: ROUTES.INTRO,
            lazy: () => import('@/pages/intro/intro-page'),
          },
          {
            path: ROUTES.GAME_ROOM,
            lazy: () => import('@/pages/game-room/game-room'),
          },
          {
            path: ROUTES.LEADERBOARDS,
            lazy: () => import('@/pages/leaderboards/leaderboards'),
          },
          {
            path: ROUTES.TIME_MODE,
            lazy: () => import('@/pages/time-mode/time-mode'),
          },
          {
            path: ROUTES.SETTINGS,
            lazy: () => import('@/pages/settings/settings'),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/pages/login/login'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/pages/register/register'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.INTRO),
      },
    ],
  },
]);
