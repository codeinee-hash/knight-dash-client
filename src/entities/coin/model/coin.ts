import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import { nanoid } from 'nanoid';

import type { Cell } from '@/features/cell/model/cell';
import { CoinNaminals } from '@/shared/utils/consts';

export class Coin {
  id: string;
  logo: string | null;
  cell: Cell;
  naminal: CoinNaminals;

  constructor(cell: Cell, naminal: CoinNaminals) {
    this.cell = cell;
    this.naminal = naminal;
    this.id = nanoid();

    switch (naminal) {
      case CoinNaminals.COIN150:
        this.logo = logo150;
        break;
      case CoinNaminals.COIN200:
        this.logo = logo200;
        break;
      case CoinNaminals.COIN250:
        this.logo = logo250;
        break;
      case CoinNaminals.COIN300:
        this.logo = logo300;
        break;
      case CoinNaminals.COIN350:
        this.logo = logo350;
        break;
    }

    if (cell) {
      cell.coin = this;
    }
  }
}
