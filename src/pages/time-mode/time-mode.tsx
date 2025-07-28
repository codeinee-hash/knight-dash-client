import { TimeModeItem } from '@/features/time-mode';
import timeModeImg from '@/shared/assets/images/Time-mode.svg';
import blitzModeImg from '@/shared/assets/images/blitz-mode.svg';
import bulletModeImg from '@/shared/assets/images/bullet-mode.svg';
import rapidModeImg from '@/shared/assets/images/rapid-mode.svg';
import { MultiContainer } from '@/shared/ui/multi-container/MultiContainer';
import { PageHeader } from '@/shared/ui/page-header';
import { PageLayout } from '@/widgets/page-layout';

const TimeMode = () => {
  return (
    <PageLayout>
      <MultiContainer className='max-w-[970px] max-xl:px-[80px]! max-lg:max-w-full max-sm:px-[15px]! py-6!'>
        <PageHeader title='Режимы времени' img={timeModeImg} />
        <div className='flex items-center gap-5 max-md:flex-col max-md:pb-[100px]!'>
          <TimeModeItem img={bulletModeImg} mode='Пуля' timer='15' />
          <TimeModeItem img={blitzModeImg} mode='Блиц' timer='30' />
          <TimeModeItem img={rapidModeImg} mode='Рапид' timer='60' />
        </div>
      </MultiContainer>
    </PageLayout>
  );
};

export const Component = TimeMode;
