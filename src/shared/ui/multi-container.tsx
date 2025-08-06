import { cn } from '@/shared/lib/utils';
import { type FC, type ReactNode } from 'react';

export type TMultiContainerProps = {
  children: ReactNode;
  className?: string;
};

export const MultiContainer: FC<TMultiContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-[1440px] mx-auto! my-0! max-[1480px]:w-[1300px] max-[510px]:p-0!',
        className
      )}
    >
      {children}
    </div>
  );
};
