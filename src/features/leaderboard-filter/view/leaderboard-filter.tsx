import blitzMode from '@/shared/assets/images/blitz-mode.svg';
import bulletMode from '@/shared/assets/images/bullet-mode.svg';
import allMode from '@/shared/assets/images/Leaderboard.svg';
import rapidMode from '@/shared/assets/images/rapid-mode.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';

export function LeaderboardFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select defaultValue='all' value={value} onValueChange={onChange}>
      <SelectTrigger className='w-[440px] bg-[#393939] border-[#393939] p-6! mb-6! text-white/60!'>
        <SelectValue placeholder='Все' />
      </SelectTrigger>
      <SelectContent className='w-[440px] border-none bg-[#393939] text-white/60'>
        <div className='p-4!'>
          <SelectItem
            value='all'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={allMode} alt='bullet mode' width={26} height={26} />
            Все
          </SelectItem>
          <SelectItem
            value='bullet'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={bulletMode} alt='bullet mode' width={26} height={26} />
            Пулька
          </SelectItem>
          <SelectItem
            value='blitz'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={blitzMode} alt='blitz mode' width={26} height={26} />
            Блиц
          </SelectItem>
          <SelectItem
            value='rapid'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={rapidMode} alt='rapid mode' width={26} height={26} />
            Раппид
          </SelectItem>
        </div>
      </SelectContent>
    </Select>
  );
}
