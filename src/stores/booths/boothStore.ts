import { create } from 'zustand';
import { api } from '@/utils/api';
import { BoothStore } from '@/types/Booth.types';
import { BOOTH_TYPE_MAP } from '@/constants';

export const useBoothStore = create<BoothStore>((set) => ({
  boothListAll: [],
  boothListNight: [],
  boothListDay: [],
  boothListFood: [],
  boothListFacility: [],
  boothDetail: null,
  selectBoothCategory: 0,
  isTicketBooth: false,

  init: () => {
    set({
      selectBoothCategory: 0,
      isTicketBooth: false,
    });
  },

  setSelectBoothCategory: (index: number | undefined) => {
    if (index === undefined) {
      set({
        selectBoothCategory: 4,
        isTicketBooth: true,
      });
    } else {
      set({
        selectBoothCategory: index,
        isTicketBooth: false,
      });
    }
  },

  getBoothList: async () => {
    try {
      const urls = [
        '/main/booth/all',
        '/main/booth/night/all',
        '/main/booth/day/all',
        '/main/booth/food/all',
        '/main/facility/all',
      ];

      const results = await Promise.allSettled(urls.map((url) => api.get(url)));

      const getData = (index: number) => {
        const result = results[index];
        if (result.status === 'fulfilled' && result.value.success) {
          return result.value.data;
        } else {
          return [];
        }
      };

      set({
        boothListAll: getData(0),
        boothListNight: getData(1),
        boothListDay: getData(2),
        boothListFood: getData(3),
        boothListFacility: getData(4),
      });

      results.forEach((result, idx) => {
        if (result.status === 'rejected' || !result.value.success) {
          console.error(`Request failed at index ${idx}:`, result);
        }
      });
    } catch (error) {
      console.log(`Unexpected error during booth list fetch:`, error);
    }
  },

  getBoothDetail: async (type: string, id: string) => {
    const urlType = BOOTH_TYPE_MAP[type];

    if (!urlType) return;

    try {
      const endpoint = urlType === 'facility' ? `/main/${urlType}/${id}` : `/main/booth/${urlType}/${id}`;

      const { data, success, message } = await api.get(endpoint);

      if (!success) {
        console.error('getBoothDetail 실패:', message);
        return;
      }

      set({ boothDetail: data });
      return data;
    } catch {
      console.log(`Error fetching booth detail ${type}`);
      return;
    }
  },
}));
