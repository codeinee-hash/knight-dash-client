import { create } from 'zustand';

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
