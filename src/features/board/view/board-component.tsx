import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { CellComponent } from '../../cell';
import type { Cell } from '../../cell/model/cell';
import { Board } from '../model/board';
import classes from './board.module.scss';

export const BoardComponent: FC<{
  board: Board;
  setBoard: (board: Board) => void;
}> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const onClick = (cell: Cell) => {
    if (selectedCell === cell) {
      setSelectedCell(null);
      board.clearHighlights();
      updateBoard();
      return;
    }

    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      board.moveFigure(selectedCell, cell);
      setSelectedCell(null);
      board.clearHighlights();
      updateBoard();
      return;
    }

    if (cell.figure) {
      setSelectedCell(cell);
    }
  };

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.board}>
        {board.cells.map((row, idx) => (
          <React.Fragment key={idx}>
            {row.map((cell) => (
              <CellComponent
                key={cell.id}
                cell={cell}
                onClick={onClick}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
