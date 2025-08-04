import knightLogo from '@/shared/assets/images/white-knight.svg';
import { Colors, FigureNames } from '@/shared/utils/consts/consts';
import type { Cell } from '../../cell/model/cell';
import { Figure } from './figure';

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);

    this.logo = knightLogo;
    this.name = FigureNames.KNIGHT;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    const canMove = (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    return canMove;
  }
}
