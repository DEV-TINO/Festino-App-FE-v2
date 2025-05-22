import { api } from '@/utils/api';
import { create } from 'zustand';
import { BoothInfo } from '@/types/Booth.types';
import { ReservationStore } from '@/types/Tabling.types';

export const useReservationStore = create<ReservationStore>((set, get) => {
  return {
    recentName: '',
    recentPhoneNum: '',
    reservationInfo: null,
    userName: '',
    nightBoothInfo: null,
    openNightBoothInfo: null,
    openNightBoothInfoLength: 0,
    selectedNightBoothInfo: null,
    prevReserveBoothName: '',
    reserveInfo: {
      userName: '',
      phoneNum: '',
      personCount: 0,
      boothId: '',
    },

    setUserName: (name: string) => set({ userName: name }),

    setRecentPhoneNum: (phone: string) => set({ recentPhoneNum: phone }),

    setRecentName: (name: string) => set({ recentName: name }),

    setSelectedNightBoothInfo: (booth) => {
      set({ selectedNightBoothInfo: booth ? { ...booth } : null });
    },

    saveReservation: async (payload, { openModal, closeModal, navigate }) => {
      openModal('loadingModal');
      try {
        const { data } = await api.post('/main/reservation', payload);
        closeModal();

        const msgStatus = data.messageStatus;
        if (msgStatus === 'PHONE_NUM_FAIL') openModal('messageFailModal');
        else if (msgStatus === 'SEND_SUCCESS') openModal('completeReserveModal');

        await get().getAllNightBooth();
      } catch {
        closeModal();
        navigate(`/error/main`);
        console.log('Error save reservation');
      }
    },

    getReservation: async (payload, { openModal }) => {
      try {
        const { data } = await api.get('/main/reservation', { params: payload });

        set({ reservationInfo: data });

        if (data.totalTeamCount === 1) {
          openModal('enterBoothModal');
        } else {
          openModal('searchReservationModal');
        }
      } catch {
        openModal('noReserveModal');
        return;
      }
    },

    getAllNightㅈBooth: async () => {
      try {
        const { data, success, message } = await api.get('/main/booth/night/reservation/all');

        if (!success) {
          console.error('getAllNightBooth 실패:', message);
          set({
            nightBoothInfo: [],
            openNightBoothInfo: [],
            openNightBoothInfoLength: 0,
          });
          return;
        }

        const boothList = data;
        const openList = boothList.filter((booth: BoothInfo) => booth.isOpen);

        set({
          nightBoothInfo: boothList,
          openNightBoothInfo: openList,
          openNightBoothInfoLength: openList.length,
        });
      } catch {
        console.error('Error fetching all night booth');
      }
    },

    checkDuplicateReserve: async (phoneNum, { openModal, closeModal, navigate }) => {
      try {
        const { data } = await api.get(`/main/reservation/duplication?phoneNum=${phoneNum}`);

        if (!data) {
          openModal('loadingModal');
          await get().saveReservation(get().reserveInfo, { openModal, closeModal, navigate });
          return;
        } else {
          set({ prevReserveBoothName: data });
          openModal('duplicateModal');
        }
      } catch {
        await get().saveReservation(get().reserveInfo, { openModal, closeModal, navigate });
      }
    },
  };
});
