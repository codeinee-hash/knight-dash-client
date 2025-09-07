import geeksLogo from '@/shared/assets/images/Logo.svg';
import { Button } from '@/shared/ui/kit/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/kit/dialog';
import { ROUTES } from '@/shared/utils/consts';
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
        <div className='rounded-[12px] bg-[#494949] p-4! text-white/70 text-base font-medium flex flex-col gap-1'>
          <p>
            <span className='text-[#f5d91f]'>1.</span> Управляйте шахматным
            конём и собирайте GeekCoin на игровом поле!
          </p>
          <p>
            <span className='text-[#f5d91f]'>2.</span> Делайте ходы конём только
            по правилам шахмат (буквой "Г").
          </p>
          <p>
            <span className='text-[#f5d91f]'>3.</span> Ваша цель — набрать
            максимум очков, собирая GeekCoin за отведённое время.
          </p>
          <p>
            <span className='text-[#f5d91f]'>4.</span> Выберите режим игры:{' '}
            <br />
            <span className='font-bold'>Пулька:</span> 15 секунд на максимальный
            результат.
            <br />
            <span className='font-bold'>Блиц:</span> 30 секунд для интенсивной
            игры.
            <br />
            <span className='font-bold'>Раппид:</span> 60 секунд, чтобы показать
            мастерство!
          </p>
          <p>
            <span className='text-[#f5d91f]'>5.</span> Чем больше GeekCoin
            соберёте, тем выше ваш рекорд в таблице лидеров!
          </p>
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
