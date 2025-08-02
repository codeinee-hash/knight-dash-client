import { Coin } from '@/entities/coin/model/coin';
import { playSound } from '@/shared/utils/audio/sound';
import { CoinNaminals, Colors } from '@/shared/utils/consts/consts';
import { Cell } from '../../cell/model/cell';
import { Knight } from '../../figures/model/knight';

export class Board {
  private coinLevel = 1;
  cells: Cell[][] = [];
  lostCoint150: CoinNaminals[] = [];
  lostCoint200: CoinNaminals[] = [];
  lostCoint250: CoinNaminals[] = [];
  lostCoint300: CoinNaminals[] = [];
  lostCoint350: CoinNaminals[] = [];

  private getRandomEmptyCell(): Cell | null {
    const flatCells = this.cells.flat();
    const emptyCells = flatCells.filter((cell) => !cell.figure && !cell.coin);

    if (emptyCells.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  private getRandomNaminal(): CoinNaminals {
    const random = Math.random() * 100;
    let result: CoinNaminals;

    if (this.coinLevel >= 5) {
      if (random < 40) result = CoinNaminals.COIN250;
      else if (random < 75) result = CoinNaminals.COIN300;
      else result = CoinNaminals.COIN350;
    } else if (this.coinLevel >= 4) {
      if (random < 15) result = CoinNaminals.COIN150;
      else if (random < 35) result = CoinNaminals.COIN200;
      else if (random < 60) result = CoinNaminals.COIN250;
      else if (random < 85) result = CoinNaminals.COIN300;
      else result = CoinNaminals.COIN350;
    } else if (this.coinLevel >= 3) {
      if (random < 25) result = CoinNaminals.COIN150;
      else if (random < 45) result = CoinNaminals.COIN200;
      else if (random < 70) result = CoinNaminals.COIN250;
      else if (random < 90) result = CoinNaminals.COIN300;
      else result = CoinNaminals.COIN350;
    } else if (this.coinLevel >= 2) {
      if (random < 40) result = CoinNaminals.COIN150;
      else if (random < 65) result = CoinNaminals.COIN200;
      else if (random < 85) result = CoinNaminals.COIN250;
      else result = CoinNaminals.COIN300;
    } else if (this.coinLevel >= 1) {
      if (random < 60) result = CoinNaminals.COIN150;
      else if (random < 85) result = CoinNaminals.COIN200;
      else result = CoinNaminals.COIN250;
    } else {
      result = CoinNaminals.COIN150;
    }

    return result;
  }

  public addCoins(count = 10) {
    for (let i = 0; i < count; i++) {
      const cell = this.getRandomEmptyCell();
      if (!cell) break;

      const coin = new Coin(cell, this.getRandomNaminal());
      cell.coin = coin;
    }
  }

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null, null));
        }
      }

      this.cells.push(row);
    }
  }

  public setCoinLevel(level: number) {
    this.coinLevel = Math.min(level, 5);
  }

  public getCoinLevel(): number {
    return this.coinLevel;
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;

    newBoard.lostCoint150 = this.lostCoint150;
    newBoard.lostCoint200 = this.lostCoint200;
    newBoard.lostCoint250 = this.lostCoint250;
    newBoard.lostCoint300 = this.lostCoint300;
    newBoard.lostCoint350 = this.lostCoint350;

    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];

      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  clearHighlights() {
    this.cells.forEach((row) =>
      row.forEach((cell) => {
        cell.available = false;
      })
    );
  }

  public moveFigure(from: Cell, to: Cell) {
    if (from.figure && from.figure.canMove(to)) {
      const hadCoin = !!to.coin;

      to.setFigure(from.figure);
      if (hadCoin && to.coin) {
        to.addLostCoin(to.coin.naminal);
        to.coin = null;
      }
      from.figure = null;

      playSound(hadCoin ? 'capture' : 'move');

      if (hadCoin) {
        const newCell = this.getRandomEmptyCell();
        if (newCell) {
          const newCoin = new Coin(newCell, this.getRandomNaminal());
          newCell.coin = newCoin;
        }
      }
    }
  }

  get totalScore(): number {
    return (
      this.lostCoint150.length * 150 +
      this.lostCoint200.length * 200 +
      this.lostCoint250.length * 250 +
      this.lostCoint300.length * 300 +
      this.lostCoint350.length * 350
    );
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(0, 7));
  }

  public addFigures() {
    this.addKnights();
    // ..
  }
}
