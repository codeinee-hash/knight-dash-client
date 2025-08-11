import settingsImg from '@/shared/assets/images/Settings.svg';
import { MultiContainer } from '@/shared/ui/multi-container';
import { PageHeader } from '@/shared/ui/page-header';
import { PageLayout } from '@/widgets/page-layout';

const Settings = () => {
  return (
    <PageLayout>
      <MultiContainer className='max-w-[970px] max-xl:px-[80px]! max-lg:max-w-full max-sm:px-[15px]! py-6!'>
        <PageHeader title='Настройки' img={settingsImg} />
        <div className='flex items-center gap-5 max-md:flex-col max-md:pb-[100px]!'>
          <div className='w-full bg-[#393939] rounded-[8px] p-8! mt-4!'>
            <h1 className='text-white/80 text-[30px] font-medium'>
              В разработке
            </h1>
            <p className='text-base text-white/80 mt-2!'>
              Раздел "Настройки" появится в ближайшее время.
            </p>
          </div>
        </div>
      </MultiContainer>
    </PageLayout>
  );
};

export const Component = Settings;
