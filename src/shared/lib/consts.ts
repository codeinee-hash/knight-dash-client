import sidebarItems2 from '@/shared/assets/images/Duel.svg';
import sidebarItems5 from '@/shared/assets/images/Game-rules.svg';
import sidebarItems4 from '@/shared/assets/images/Leaderboard.svg';
import sidebarItems1 from '@/shared/assets/images/Pictograms.svg';
import sidebarItems6 from '@/shared/assets/images/Settings.svg';
import sidebarItems3 from '@/shared/assets/images/Time-mode.svg';

export const ROUTES = {
  HOME: '/',
  REGISTER: '/sign-up',
  LOGIN: '/sign-in',
  SOLO_GAME: '/solo-game',
  SOLO_GAME_ROOM: '/solo-game/:gameId',
  GAME_DUEL: '/duel',
  DUEL_GAME_ROOM: '/duel/sdasd',
  INTRO: '/intro',
  LEADERBOARDS: '/leaderboards',
  TIME_MODE: '/time-mode',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
} as const;

export const CoinNaminals = {
  COIN150: 150,
  COIN200: 200,
  COIN250: 250,
  COIN300: 300,
  COIN350: 350,
} as const;

export const Colors = {
  WHITE: 'white',
  BLACK: 'black',
} as const;

export const FigureNames = {
  FIGURE: 'Фигура',
  KING: 'Король',
  QUEEN: 'Ферзь',
  KNIGHT: 'Конь',
  PAWN: 'Пешка',
  ROOK: 'Ладья',
  BISHOP: 'Слон',
} as const;

export const Tokens = {
  ACCESS: 'token_auth',
};

export const CurrentPlayer = 'CURRENT_PLAYER';

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
export type CoinNaminals = (typeof CoinNaminals)[keyof typeof CoinNaminals];
export type Colors = (typeof Colors)[keyof typeof Colors];
export type FigureNames = (typeof FigureNames)[keyof typeof FigureNames];

export const sidebarItems = [
  { icon: sidebarItems1, lable: 'Один игрок' },
  { icon: sidebarItems2, lable: 'Два игрока' },
  { icon: sidebarItems3, lable: 'Режимы времени' },
  { icon: sidebarItems4, lable: 'Таблица лидеров' },
  { icon: sidebarItems5, lable: 'Правила игры' },
  { icon: sidebarItems6, lable: 'Настройки' },
];
