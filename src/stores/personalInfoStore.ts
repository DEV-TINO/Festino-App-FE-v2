import { create } from 'zustand';
import { PersonalInfoState } from '@/types/Tabling.types';

export const usePersonalInfoStore = create<PersonalInfoState>((set) => ({
  isAgreed: false,

  setIsAgreed: (value) => set({ isAgreed: value }),

  toggleIsAgreed: () => set((state) => ({ isAgreed: !state.isAgreed })),
}));
