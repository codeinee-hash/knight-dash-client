import blitzMode from '@/shared/assets/images/blitz-mode.svg';
import bulletMode from '@/shared/assets/images/bullet-mode.svg';
import rapidMode from '@/shared/assets/images/rapid-mode.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';

export function GameModeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select defaultValue='15' value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full bg-[#494949] border-[#393939] p-6! mb-4! text-white/60!'>
        <SelectValue placeholder='Выберите режим' />
      </SelectTrigger>
      <SelectContent className='w-full border-none bg-[#393939] text-white/60'>
        <div className='p-4!'>
          <SelectItem
            value='15'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={bulletMode} alt='bullet mode' width={26} height={26} />
            Пулька (15 сек)
          </SelectItem>
          <SelectItem
            value='30'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={blitzMode} alt='blitz mode' width={26} height={26} />
            Блиц (30 сек)
          </SelectItem>
          <SelectItem
            value='60'
            className='px-2! py-2! hover:bg-[#494949]! hover:text-white!'
          >
            <img src={rapidMode} alt='rapid mode' width={26} height={26} />
            Раппид (60 сек)
          </SelectItem>
        </div>
      </SelectContent>
    </Select>
  );
}
