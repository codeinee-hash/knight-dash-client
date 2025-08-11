import { cn } from '@/shared/lib/utils';
import type { FC } from 'react';
import { memo } from 'react';
import type { Cell } from '../model/cell';

export const CellComponent: FC<{
  cell: Cell;
  selected: boolean;
  available: boolean;
  onClick: (cell: Cell) => void;
}> = memo(({ cell, selected, available, onClick }) => {
  const COLORS = {
    black: 'bg-gradient-to-b from-[#868686] to-[#000000]',
    white: 'bg-gradient-to-b from-[#ffffff] to-[#d2d2d2]',
  };

  return (
    <div
      className={cn(
        COLORS[cell.color],
        'w-[60px] h-[60px] flex items-center justify-center rounded-[3px] cursor-pointer max-[510px]:w-[44px] max-[510px]:h-[44px] max-[390px]:w-[36px] max-[390px]:h-[36px]',
        selected && 'border-2 border-[#f5d91f]',
        available &&
          cell.coin &&
          'border-2 border-[#f5d91f] bg-gradient-to-b from-[#ffffff] to-[#fffdad]'
      )}
      onClick={() => onClick(cell)}
    >
      {!cell.coin && available && (
        <div className='w-[24px] h-[24px] rounded-full bg-[#fff193] max-[510px]:w-[14px] max-[510px]:h-[14px]' />
      )}
      {cell.figure?.logo && (
        <img
          src={cell.figure.logo}
          alt={`${cell.figure.color}-${cell.figure.name}`}
          className='w-[56px] h-[56px] relative max-[510px]:w-[38px] max-[510px]:h-[38px]'
        />
      )}
      {cell.coin?.logo && (
        <img
          src={cell.coin.logo}
          alt={`coin-${cell.coin.naminal}`}
          className='w-[40px] h-[40px] max-[510px]:w-[26px] max-[510px]:h-[26px]'
        />
      )}
    </div>
  );
});
