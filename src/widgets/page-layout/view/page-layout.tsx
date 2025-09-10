import type { SoloGameSession } from '@/entities/solo-game';
import { MobileSidebar, Sidebar } from '@/widgets/sidebar';

export function PageLayout({
  children,
  soloGameSession,
}: {
  children: React.ReactNode;
  soloGameSession?: SoloGameSession;
}) {
  return (
    <>
      <Sidebar soloGameSession={soloGameSession as SoloGameSession} />
      <MobileSidebar soloGameSession={soloGameSession as SoloGameSession} />
      {children}
    </>
  );
}
