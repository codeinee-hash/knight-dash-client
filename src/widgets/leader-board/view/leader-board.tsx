import playerLogo from '@/shared/assets/images/yellow-logo.svg';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/kit/table';
import { Spin } from '@/shared/ui/spiner/spin';
import { useGame } from '@/shared/utils/hooks/use-game';
import { useEffect } from 'react';
import { useLeaderBoard } from '../model/useLeaderBoard';

export function LeaderBoard({
  variant,
  boardLogo,
  boardTitle,
}: {
  variant: 'page' | 'game-room';
  boardLogo: string;
  boardTitle: string;
}) {
  const { data, getLeaderboards, isLoading, filterMode } = useLeaderBoard();
  const { gameMode } = useGame();
   
  useEffect(() => {
    getLeaderboards(variant === 'page' ? filterMode : gameMode);
  }, [filterMode, gameMode]);

  return (
    <div className='bg-[#393939] rounded-[8px] px-[150px]! pb-14! pt-5! mb-[50px]!'>
      <div className='flex flex-col items-center mb-5!'>
        <div>
          <img
            src={boardLogo}
            alt='bullet mode'
            className='w-[84px] h-[84px]'
          />
        </div>
        <h4 className='text-white font-bold text-[24px]'>{boardTitle}</h4>
      </div>
      {isLoading ? (
        <div className='h-[300px] w-full flex items-center justify-center'>
          <Spin />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className='bg-[#212121] border-none'>
              <TableHead className='w-[100px] p-2.5! text-white'>№</TableHead>
              <TableHead className='w-[360px] p-2.5! text-white'>
                Игрок
              </TableHead>
              <TableHead className='p-2.5! text-white'>Рекорд</TableHead>
              <TableHead className='p-2.5! text-white'>Выиграл</TableHead>
              <TableHead className='text-right p-2.5! text-white'>
                Проиграл
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((player, idx) => (
              <TableRow
                key={player._id}
                className='border-b! border-b-[#666666]! font-bold hover:bg-muted/10'
              >
                <TableCell className='font-medium p-2.5!'>{idx + 1}.</TableCell>
                <TableCell className='font-medium p-2.5! flex items-center gap-2.5'>
                  <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] flex items-center justify-center'>
                    <img
                      src={playerLogo}
                      alt={`logo ${player.login}`}
                      width={13.5}
                      height={18}
                    />
                  </div>
                  {player.login}
                </TableCell>
                <TableCell className='p-2.5! text-center'>
                  {player.score ?? 0}
                </TableCell>
                <TableCell className='p-2.5! text-center text-[#F5D91F]'>
                  {'0'}
                </TableCell>
                <TableCell className='text-right text-[#EE3535] p-2.5!'>
                  {'0'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
