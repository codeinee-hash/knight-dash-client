import { cn } from '@/shared/lib/utils';
import { type ReactNode } from 'react';

export function MultiContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
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
}
