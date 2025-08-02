import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { CellComponent } from '../../cell';
import type { Cell } from '../../cell/model/cell';
import { Board } from '../model/board';
import classes from './board.module.scss';

export const BoardComponent: FC<{
  board: Board;
  setBoard: (board: Board) => void;
}> = React.memo(({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [availableCells, setAvailableCells] = useState<[number, number][]>([]);

  const highlightCells = useCallback(() => {
    console.log('Calling highlightCells with selectedCell:', selectedCell);
    // Очищаем предыдущие подсветки
    board.clearHighlights();
    
    if (selectedCell?.figure) {
      const newAvailableCells: [number, number][] = [];
      for (let i = 0; i < board.cells.length; i++) {
        for (let j = 0; j < board.cells[i].length; j++) {
          const target = board.cells[i][j];
          if (selectedCell.figure.canMove(target)) {
            newAvailableCells.push([target.x, target.y]);
            console.log(`Cell (${target.x}, ${target.y}) is available`);
          }
        }
      }
      setAvailableCells(newAvailableCells);
    } else {
      setAvailableCells([]);
    }
  }, [board, selectedCell]);

  const updateBoard = useCallback(() => {
    console.log('Updating board state');
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }, [board, setBoard]);

  useEffect(() => {
    highlightCells();
  }, [selectedCell, highlightCells]);

  const onClick = useCallback(
    (cell: Cell) => {
      console.log(`Clicked cell (${cell.x}, ${cell.y}), has figure:`, !!cell.figure);
      if (selectedCell === cell) {
        setSelectedCell(null);
        setAvailableCells([]); // Очищаем подсветку
        board.clearHighlights();
        return;
      }

      if (
        selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell)
      ) {
        board.moveFigure(selectedCell, cell);
        setSelectedCell(null);
        setAvailableCells([]); // Очищаем подсветку
        board.clearHighlights();
        updateBoard(); // Обновляем после перемещения
        return;
      }

      if (cell.figure) {
        setSelectedCell(cell);
        highlightCells(); // Подсвечиваем клетки
      }
    },
    [selectedCell, board, highlightCells, updateBoard]
  );

  console.log('Rendering BoardComponent with selectedCell:', selectedCell);

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
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                available={availableCells.some(([x, y]) => x === cell.x && y === cell.y)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});