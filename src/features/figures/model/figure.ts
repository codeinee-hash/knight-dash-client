import knightLogo from '@/shared/assets/images/white-knight.svg';
import { nanoid } from 'nanoid';

import { FigureNames, type Colors } from '@/shared/utils/consts/consts';
import type { Cell } from '../../cell/model/cell';

export class Figure {
  id: string;
  color: Colors;
  logo: typeof knightLogo | null;
  cell: Cell;
  name: FigureNames;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.QUEEN;
    this.id = nanoid();
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }

    return true;
  }

  moveFigure(target: Cell) {
    this.cell.figure = null;

    if (target.coin) {
      target.addLostCoin(target.coin.naminal);
      target.coin = null;
    }

    target.figure = this;
    this.cell = target;

    console.log('moved');
  }
}
