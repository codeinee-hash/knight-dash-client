import logo150 from '@/shared/assets/images/geekcoin 150.svg';
import logo200 from '@/shared/assets/images/geekcoin 200.svg';
import logo250 from '@/shared/assets/images/geekcoin 250.svg';
import logo300 from '@/shared/assets/images/geekcoin 300.svg';
import logo350 from '@/shared/assets/images/geekcoin 350.svg';
import totalGeekCoins from '@/shared/assets/images/total-coins.png';
import { cn } from '@/shared/lib/utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/kit/alert-dialog';
import { Button } from '@/shared/ui/kit/button';
import { ProgresLoader } from '@/shared/ui/progress-loader/progress-loader';
import { ScoreItem } from '@/shared/ui/score-item/score-item';
import { useMediaQuery } from '@/shared/utils/hooks/use-media-query';
import type { IScoreCoins } from '@/shared/utils/types';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameModeSelect } from '../game-mode-select';
import { Timer } from '../timer/timer';
import classes from './score-coins.module.scss';

export const ScoreCoins: FC<{
  coins: IScoreCoins;
  timerKey: number;
  isGameRoom: boolean;
}> = ({ coins, timerKey, isGameRoom }) => {
  const [filter, setFilter] = useState('bullet');
  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 510px)');

  const navigate = useNavigate();

  return (
    <>
      <div className={classes.lost}>
        {isDesktop && <Timer timerKey={timerKey} />}

        {!isGameRoom && (
          <div className='mt-5! mb-8!'>
            <GameModeSelect value={filter} onChange={setFilter} />
            <Button
              onClick={() => setIsCreatingGame(true)}
              className='w-full h-[44px] rounded-[8px] bg-[#f5d91f] text-[#2C2E35] font-medium text-base hover:bg-[#f0b700] transition-colors duration-200'
            >
              Начать игру
            </Button>
          </div>
        )}

        <h3
          className={cn(
            'text-white mb-5! max-[510px]:hidden',
            isGameRoom && 'mt-5!'
          )}
        >
          {'РЕЗУЛЬТАТЫ:'}
        </h3>
        <div className={classes.lostList}>
          <ScoreItem
            variant='single'
            nominal={150}
            coins={coins.lotCoin150}
            logo={logo150}
          />
          <ScoreItem
            variant='single'
            nominal={200}
            coins={coins.lotCoin200}
            logo={logo200}
          />
          <ScoreItem
            variant='single'
            nominal={250}
            coins={coins.lotCoin250}
            logo={logo250}
          />
          <ScoreItem
            variant='single'
            nominal={300}
            coins={coins.lotCoin300}
            logo={logo300}
          />
          <ScoreItem
            variant='single'
            nominal={350}
            coins={coins.lotCoin350}
            logo={logo350}
          />
        </div>

        <div className={classes.total}>
          <h4>Общий:</h4>
          <ScoreItem
            variant='total'
            logo={totalGeekCoins}
            coins={coins.lotCoin350}
            nominal={350}
            totalScore={coins.totalScore}
          />
        </div>
      </div>
      <AlertDialog open={isCreatingGame} onOpenChange={setIsCreatingGame}>
        <AlertDialogContent className='p-7! bg-[#393939] border-none text-white'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>Создание игровой сессии</AlertDialogTitle>
            <AlertDialogDescription className='text-white/80 flex flex-col items-center gap-6'>
              Подключаем вас к комнате.
              <div className='self-center'>
                <ProgresLoader />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='text-[#393939] px-3! mt-2!'>
              Отмена
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
