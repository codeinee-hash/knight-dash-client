import clsx from 'clsx';
import type { FC } from 'react';
import { memo } from 'react';
import type { Cell } from '../model/cell';
import classes from './cell.module.scss';

export const CellComponent: FC<{
  cell: Cell;
  selected: boolean;
  available: boolean;
  onClick: (cell: Cell) => void;
}> = memo(({ cell, selected, available, onClick }) => {
  return (
    <div
      className={clsx(
        classes[cell.color],
        classes.cell,
        selected && classes.selected,
        available && cell.coin && classes.takeFigure
      )}
      onClick={() => onClick(cell)}
    >
      {!cell.coin && available && <div className={classes.available} />}
      {cell.figure?.logo && (
        <img
          src={cell.figure.logo}
          alt={`${cell.figure.color}-${cell.figure.name}`}
          className={classes.figure}
        />
      )}
      {cell.coin?.logo && (
        <img
          src={cell.coin.logo}
          alt={`coin-${cell.coin.naminal}`}
          className={classes.coinLogo}
        />
      )}
    </div>
  );
});
