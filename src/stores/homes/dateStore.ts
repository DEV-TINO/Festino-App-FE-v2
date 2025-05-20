import { create } from "zustand"; 

interface IDateStore {
  festivalDate: number;
  setDate: (festivalDate: number) => void;
}

export const useDateStore = create<IDateStore>((set) => ({
  festivalDate: 1,
  setDate: (festivalDate) => set({ festivalDate }),
}));

export default useDateStore;