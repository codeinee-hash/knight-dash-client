import { useEffect, useState } from 'react';
import { create } from 'zustand';

export const useDisableScroll = (bool: boolean) => {
  useEffect(() => {
    if (bool) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [bool]);
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

type TUseGameProps = {
  isGameOver: boolean;
  setIsGameOver: (bool: boolean) => void;
};

export const useGame = create<TUseGameProps>()((set) => {
  return {
    isGameOver: false,

    setIsGameOver: (value: boolean) => set({ isGameOver: value }),
  };
});
