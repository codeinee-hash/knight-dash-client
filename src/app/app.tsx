import { queryClient } from '@/shared/api/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='min-h-screen flex flex-col'>
        <Outlet />
        <Toaster richColors position='top-right' />
      </main>
    </QueryClientProvider>
  );
};
