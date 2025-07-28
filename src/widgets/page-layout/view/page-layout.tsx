import { MobileSidebar, Sidebar } from '@/widgets/sidebar';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <MobileSidebar />
      {children}
    </>
  );
}
