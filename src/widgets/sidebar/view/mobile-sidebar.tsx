import type { SoloGameSession } from '@/entities/score-coins';
import { useDeleteGame } from '@/entities/score-coins';
import geeksLogo from '@/shared/assets/images/geeks 2.png';
import playerLogo from '@/shared/assets/images/yellow-logo.svg';
import { ROUTES, sidebarItems } from '@/shared/lib/consts';
import { useSession } from '@/shared/model/use-session';
import { AlertDialog } from '@/shared/ui/kit/alert-dialog';
import { Button } from '@/shared/ui/kit/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/kit/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/kit/popover';
import { LogoutAlert } from '@/shared/ui/logout-alert';
import { GameRules } from '@/widgets/game-rules';
import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function MobileSidebar({
  soloGameSession,
}: {
  soloGameSession: SoloGameSession;
}) {
  const [open, setOpen] = useState(false);
  const [isGameRulesOpen, setIsGameRulesOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [isDuelDevModal, setIsDuelDevModal] = useState(false);
  const [isGameProccess, setIsGameProccess] = useState(false);

  const session = useSession((state) => state.session);

  const removeGameSession = useDeleteGame();

  const navigate = useNavigate();

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className='fixed top-4 right-4 z-50 hidden max-md:block'>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className='text-yellow-400 bg-[#212121] p-2! rounded-md shadow'
            >
              <Menu className='w-6 h-6' />
            </button>
          </div>
        </PopoverTrigger>

        <PopoverContent
          side='bottom'
          className='w-[300px] p-4! mr-4! mt-2! bg-[#393939] border-none text-white'
        >
          <div className='flex justify-center mt-2!'>
            <img src={geeksLogo} alt='geeks' width={140} height={37} />
          </div>

          <div className='rounded bg-[#212121] p-2! my-4! flex items-center gap-2.5'>
            <div className='w-[28px] h-[28px] bg-white rounded-full border border-[#F5D91F] py-[5px]! pl-[6.75px]! pr-[7.75px]!'>
              <img
                src={playerLogo}
                alt='player logo'
                width={13.5}
                height={18}
              />
            </div>
            {session?.login}
          </div>

          <div className='flex flex-col bg-[#393939]'>
            {sidebarItems.map((item, idx) => (
              <div
                key={idx}
                className='w-full py-3! px-6! rounded text-base font-medium flex items-center gap-2.5 cursor-pointer hover:bg-[#494949]'
                onClick={() => {
                  if (soloGameSession && !soloGameSession.finished) {
                    setOpen(false);
                    setIsGameProccess(true);
                    return;
                  }

                  if (item.lable === 'Правила игры') {
                    setIsGameRulesOpen(true);
                  } else if (item.lable === 'Таблица лидеров') {
                    navigate(ROUTES.LEADERBOARDS);
                  } else if (item.lable === 'Режимы времени') {
                    navigate(ROUTES.TIME_MODE);
                  } else if (item.lable === 'Настройки') {
                    navigate(ROUTES.SETTINGS);
                  } else if (item.lable === 'Один игрок') {
                    navigate(ROUTES.SOLO_GAME);
                  } else if (item.lable === 'Два игрока') {
                    // navigate(ROUTES.GAME_DUEL);
                    setIsDuelDevModal(true);
                  }

                  setOpen(false);
                }}
              >
                <img src={item.icon} alt={item.lable} width={26} height={26} />
                {item.lable}
              </div>
            ))}

            <div
              onClick={() => setIsExitDialogOpen(true)}
              className='w-full py-3! px-6! rounded text-base font-medium flex items-center gap-2 text-white cursor-pointer hover:bg-[#494949] mt-5!'
            >
              <LogOut />
              Выйти
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isGameRulesOpen} onOpenChange={setIsGameRulesOpen}>
        <GameRules />
      </Dialog>

      <Dialog open={isGameProccess} onOpenChange={setIsGameProccess}>
        <DialogContent className='rounded-[12px] bg-[#393939] p-7! outline-none! border-none! text-white'>
          <DialogHeader>
            <DialogTitle className='text-[28px] font-bold text-center'>
              Внимание
            </DialogTitle>
            <DialogDescription>
              Вы покидаете игру. Весь текущий прогресс будет утерян. Продолжить?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='flex flex-row! justify-center'>
            <Button
              type='button'
              onClick={() => setIsGameProccess(false)}
              className='px-4! mt-2! h-[44px] cursor-pointer rounded-[10px] bg-[#202020] text-white/70 font-medium text-base'
            >
              Отмена
            </Button>
            <Button
              type='button'
              onClick={() => {
                removeGameSession.deleteGame(soloGameSession.gameId, {
                  onSuccess() {
                    navigate(ROUTES.SOLO_GAME, { replace: true });
                  },
                });
              }}
              disabled={removeGameSession.isPending}
              className='px-4! mt-2! h-[44px] cursor-pointer rounded-[10px] bg-[#202020] text-[#f5d91f] font-medium text-base'
            >
              {removeGameSession.isPending ? 'Загрузка...' : 'Продолжить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDuelDevModal} onOpenChange={setIsDuelDevModal}>
        <DialogContent className='rounded-[12px] bg-[#393939] p-7! outline-none! border-none! text-white'>
          <DialogHeader>
            <DialogTitle className='text-[24px] font-bold text-center'>
              Режим недоступен
            </DialogTitle>
          </DialogHeader>
          <div className='flex items-center gap-8 mt-2! text-center text-white/70'>
            Функция игры в формате 2 игроков пока находится в разработке.
          </div>
          <Button
            type='button'
            onClick={() => setIsDuelDevModal(false)}
            className='w-full mt-2! h-[44px] cursor-pointer rounded-[10px] bg-[#f5d91f] text-[#2C2E35] font-medium text-base hover:bg-[#f0b700] transition-colors duration-200'
          >
            Ок
          </Button>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isExitDialogOpen} onOpenChange={setIsExitDialogOpen}>
        <LogoutAlert />
      </AlertDialog>
    </>
  );
}
