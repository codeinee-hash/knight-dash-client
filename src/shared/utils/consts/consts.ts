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
  GAME_ROOM: '/game',
  INTRO: '/intro',
  LEADERBOARDS: '/leaderboards',
  NOT_FOUND: '*',
} as const;

export const baseURL = import.meta.env.VITE_API_URL;

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

export const GAME_TIMER = 60;

export const GAME_MODE = {
  RAPID: 60,
  BLITZ: 30,
  BULLET: 15,
} as const;

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
export type CoinNaminals = (typeof CoinNaminals)[keyof typeof CoinNaminals];
export type Colors = (typeof Colors)[keyof typeof Colors];
export type FigureNames = (typeof FigureNames)[keyof typeof FigureNames];
export type GAME_MODE = (typeof GAME_MODE)[keyof typeof GAME_MODE];

export const rules = [
  { id: 1, text: 'Игрок управляет только конем' },
  { id: 2, text: 'На поле появляются GeekCoin' },
  {
    id: 3,
    text: 'Задача: Собрать как можно больше GeekCoin за ограниченное число времени',
  },
  { id: 4, text: 'Только допустимые ходы коня (буквой “Г”)' },
];

export const sidebarItems = [
  { icon: sidebarItems1, lable: 'Один игрок', href: '#' },
  { icon: sidebarItems2, lable: 'Два игрока', href: '#' },
  { icon: sidebarItems3, lable: 'Режим времени', href: '#' },
  { icon: sidebarItems4, lable: 'Таблица лидеров', href: '#' },
  { icon: sidebarItems5, lable: 'Правила игры', href: '#' },
  { icon: sidebarItems6, lable: 'Настройки', href: '#' },
];
