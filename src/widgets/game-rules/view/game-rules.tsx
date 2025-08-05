import geeksLogo from '@/shared/assets/images/Logo.svg';
import { Button } from '@/shared/ui/kit/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/kit/dialog';
import { ROUTES, rules } from '@/shared/utils/consts/consts';
import { useNavigate } from 'react-router-dom';

export function GameRules() {
  const navigate = useNavigate();

  return (
    <DialogContent className='rounded-[12px] bg-[#393939] p-7! outline-none! border-none! text-white'>
      <DialogHeader>
        <DialogTitle className='text-[28px] font-bold text-center'>
          Правила игры
        </DialogTitle>
      </DialogHeader>
      <div className='flex items-center gap-8 mt-2!'>
        <div className='text-base font-medium max-sm:hidden'>
          GEEKS
          <img src={geeksLogo} alt='geeks' width={80} height={107} />
        </div>
        <div className='rounded-[12px] bg-[#EBEBEB] p-4! text-[#494949] text-base font-medium flex flex-col gap-1'>
          {rules.map((rule) => (
            <p key={rule.id}>
              {rule.id}. {rule.text}
            </p>
          ))}
        </div>
      </div>
      <Button
        type='button'
        onClick={() => navigate(ROUTES.SOLO_GAME)}
        className='w-full mt-2! h-[44px] cursor-pointer rounded-[10px] bg-[#f5d91f] text-[#2C2E35] font-medium text-base hover:bg-[#f0b700] transition-colors duration-200'
      >
        Играть
      </Button>
    </DialogContent>
  );
}
