import { ROUTES } from '@/shared/utils/consts/consts';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './app';
import { AuthorizationGuard } from './auth-guard';
import { protectedLoader } from './protected-loader'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        loader: protectedLoader,
        element: <AuthorizationGuard />,
        children: [
          {
            path: ROUTES.SOLO_GAME,
            lazy: () => import('@/pages/solo-game/main-solo-game'),
          },
          {
            path: ROUTES.SOLO_GAME_ROOM,
            lazy: () => import('@/pages/solo-game/solo-game-room'),
          },
          // {
          //   path: ROUTES.GAME_DUEL,
          //   lazy: () => import('@/pages/duel-game/main-duel-game'),
          // },
          // {
          //   path: ROUTES.DUEL_GAME_ROOM,
          //   lazy: () => import('@/pages/duel-game/duel-game-room'),
          // },
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
        loader: () => redirect(ROUTES.SOLO_GAME),
      },
    ],
  },
]);
