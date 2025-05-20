import { create } from 'zustand';

interface NavTapStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useNavTapStore = create<NavTapStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNavTapStore;
