import { create } from 'zustand';
import { api } from '@/utils/api';
import { TimetableStore } from '@/types/ClubData.types';

export const useTimetableStore = create<TimetableStore>((set) => ({
  clubData: [],
  selectedClub: null,

  getClubTimetable: async (day) => {
    try {
      const { data, success, message } = await api.get(`/main/club/all/date/${day}`);

      if (!success) {
        console.error('getClubTimetable 실패:', message);
        set({ clubData: [] });
        return;
      }

      set({ clubData: data });
    } catch {
      console.log('Error fetching club time table');
    }
  },

  setSelectedClub: (club) => set({ selectedClub: club }),
}));
