import { socketApi } from '@/entities/solo-game/api/socket-api';
import type { FC } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CellComponent } from '../../cell';
import type { Cell } from '../../cell/model/cell';
import { Board } from '../model/board';

export const BoardComponent: FC<{
  board: Board;
  setBoard: (board: Board) => void;
}> = React.memo(({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [availableCells, setAvailableCells] = useState<[number, number][]>([]);
  // const { submitScore } = useSubmitScore();

  const params = useParams();

  const highlightCells = useCallback(() => {
    board.clearHighlights();

    if (selectedCell?.figure) {
      const newAvailableCells: [number, number][] = [];
      for (let i = 0; i < board.cells.length; i++) {
        for (let j = 0; j < board.cells[i].length; j++) {
          const target = board.cells[i][j];
          if (selectedCell.figure.canMove(target)) {
            newAvailableCells.push([target.x, target.y]);
          }
        }
      }
      setAvailableCells(newAvailableCells);
    } else {
      setAvailableCells([]);
    }
  }, [board, selectedCell]);

  const updateBoard = useCallback(() => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }, [board, setBoard]);

  useEffect(() => {
    highlightCells();
  }, [selectedCell, highlightCells]);

  const onClick = useCallback(
    (cell: Cell) => {
      if (selectedCell === cell) {
        setSelectedCell(null);
        setAvailableCells([]);
        board.clearHighlights();
        return;
      }

      if (
        selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell)
      ) {
        const hadCoin = !!cell.coin;
        const coinNaminal = cell.coin?.naminal;
        board.moveFigure(selectedCell, cell);
        setSelectedCell(null);
        setAvailableCells([]);
        board.clearHighlights();
        updateBoard();

        if (hadCoin && coinNaminal) {
          const score = coinNaminal;
          socketApi.socket?.emit('client-submit-score-path', {
            gameId: String(params.gameId),
            score,
          });
          // submitScore({ gameId: String(params.gameId), score });
        }

        return;
      }

      if (cell.figure) {
        setSelectedCell(cell);
        highlightCells();
      }
    },
    [
      selectedCell,
      board,
      highlightCells,
      updateBoard,
      // submitScore,
      params.gameId,
    ]
  );

  return (
    <div className='flex flex-col justify-center items-center gap-[15px]'>
      <div className='w-[480px] h-[480px] flex flex-wrap max-[510px]:w-[352px] max-[510px]:h-[352px] max-[390px]:w-[288px] max-[390px]:h-[288px]'>
        {board.cells.map((row, idx) => (
          <React.Fragment key={idx}>
            {row.map((cell) => (
              <CellComponent
                key={cell.id}
                cell={cell}
                onClick={onClick}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
                available={availableCells.some(
                  ([x, y]) => x === cell.x && y === cell.y
                )}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});
