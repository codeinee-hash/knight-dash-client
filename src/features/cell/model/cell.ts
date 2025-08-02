import type { Coin } from '@/entities/coin/model/coin';
import { CoinNaminals, Colors } from '@/shared/utils/consts/consts';
import { nanoid } from 'nanoid';
import type { Board } from '../../board/model/board';
import type { Figure } from '../../figures/model/figure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  coin: Coin | null;
  board: Board;
  id: string;
  available: boolean; // can you move

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null,
    coin: Coin | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.coin = coin;
    this.board = board;
    this.available = false;
    this.id = nanoid();
  }

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }

    return false;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  addLostCoin(coinNaminal: CoinNaminals | undefined) {
    switch (coinNaminal) {
      case CoinNaminals.COIN150:
        this.board.lostCoint150.push(coinNaminal);
        break;
      case CoinNaminals.COIN200:
        this.board.lostCoint200.push(coinNaminal);
        break;
      case CoinNaminals.COIN250:
        this.board.lostCoint250.push(coinNaminal);
        break;
      case CoinNaminals.COIN300:
        this.board.lostCoint300.push(coinNaminal);
        break;
      case CoinNaminals.COIN350:
        this.board.lostCoint350.push(coinNaminal);
        break;
    }
  }

  // moveFigure(target: Cell) {
  //   if (this.figure && this.figure?.canMove(target)) {
  //     this.figure.moveFigure(target);

  //     if (target.coin) {
  //       this.addLostCoin(target.coin.naminal);
  //     }

  //     target.setFigure(this.figure);
  //     this.figure = null;
  //   }
  // }
}
