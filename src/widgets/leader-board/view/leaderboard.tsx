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
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLeaderBoard } from '../model/useLeaderBoard';

const ITEMS_PER_PAGE = 5;

export function LeaderBoard({
  mode,
  boardLogo,
  boardTitle,
}: {
  mode: '15' | '30' | '60';
  boardLogo: string;
  boardTitle: string;
}) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { data, isLoading } = useLeaderBoard();

  const visibleData = data?.slice(0, visibleCount);

  return (
    <div className='w-full bg-[#393939] rounded-[8px] px-[150px]! pb-14! pt-5! mb-[50px]! max-xl:px-[50px]! max-sm:px-[15px]! max-sm:pb-[20px]!'>
      <div className='flex flex-col items-center mb-5!'>
        <div>
          <img
            src={boardLogo}
            alt='bullet mode'
            className='w-[84px] h-[84px] max-sm:w-[54px] max-sm:h-[54px]'
          />
        </div>
        <h4 className='text-white font-bold text-[24px] max-sm:text-[20px]'>
          {boardTitle}
        </h4>
      </div>
      {isLoading ? (
        <div className='h-[300px] w-full flex items-center justify-center'>
          <Spin />
        </div>
      ) : (
        <div className='w-full'>
          <Table className='max-md:max-w-[600px]'>
            <TableHeader>
              <TableRow className='bg-[#212121] border-none'>
                <TableHead className='min-w-[30px] p-2.5! text-white max-sm:w-[40px]'>
                  №
                </TableHead>
                <TableHead className='min-w-[100px] p-2.5! text-white max-sm:w-[100px]!'>
                  Игрок
                </TableHead>
                <TableHead className='min-w-[100px] p-2.5! text-white max-sm:w-[80px]'>
                  Рекорд
                </TableHead>
                <TableHead className='min-w-[100px] p-2.5! text-white hidden lg:table-cell'>
                  Выиграл
                </TableHead>
                <TableHead className='min-w-[100px] text-right p-2.5! text-white hidden lg:table-cell'>
                  Проиграл
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-white'>
              <AnimatePresence initial={false}>
                {visibleData?.map((player, idx) => (
                  <motion.tr
                    key={player._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='border-b border-b-[#666666] font-bold hover:bg-muted/10'
                  >
                    <TableCell className='font-medium p-2.5!'>
                      {idx + 1}.
                    </TableCell>
                    <TableCell className='font-medium p-2.5! flex items-center gap-2.5'>
                      <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] flex items-center justify-center'>
                        <img
                          src={playerLogo}
                          alt={player.login}
                          width={13.5}
                          height={18}
                        />
                      </div>
                      <span className='truncate whitespace-nowrap overflow-hidden max-w-[100px]'>
                        {player.login}
                      </span>
                    </TableCell>
                    <TableCell className='p-2.5!'>
                      {player[`score${mode}`] ?? 0}
                    </TableCell>
                    <TableCell className='p-2.5! text-[#F5D91F] hidden lg:table-cell'>
                      0
                    </TableCell>
                    <TableCell className='text-right text-[#EE3535] p-2.5! hidden lg:table-cell'>
                      0
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
          {data && visibleCount < data.length && (
            <div className='mt-6! flex justify-center'>
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className='text-[#F5D91F] transition-all outline-none border-none bg-none flex items-center gap-2 font-medium max-sm:text-[14px] cursor-pointer'
              >
                Смотреть больше <ChevronRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
