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
        const { data, success, message } = await api.post('/main/reservation', payload);
        closeModal();

        if (!success) {
          console.error('saveReservation 실패:', message);
          openModal('failReservationModal');
          return;
        }

        const msgStatus = data.messageStatus;
        if (msgStatus === 'SEND_FAIL') openModal('messageFailModal');
        else if (msgStatus === 'SEND_SUCCESS') openModal('completeReserveModal');

        await get().getAllNightBooth();
      } catch {
        closeModal();
        navigate(`/error/main`);
        console.log('Error save reservation');
      }
    },

    getReservation: async (payload, { openModal, closeModal, navigate }) => {
      try {
        const { data, success, message } = await api.get('/main/reservation', { params: payload });

        if (!success) {
          console.log('getReservation 실패:', message);
          openModal('noReserveModal');
          return;
        }

        set({ reservationInfo: data });

        if (data.totalTeamCount === 1) {
          openModal('enterBoothModal');
        } else {
          openModal('searchReservationModal');
        }
      } catch {
        closeModal();
        navigate(`/error/main`);
        console.log('Error fetching reservation');
      }
    },

    getAllNightBooth: async () => {
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
        const { data, success, message } = await api.get(`/main/reservation/duplication?phoneNum=${phoneNum}`);

        if (!success) {
          console.error('checkDuplicateReserve 실패:', message);
          openModal('loadingModal');
          await get().saveReservation(get().reserveInfo, { openModal, closeModal, navigate });
          return;
        }

        set({ prevReserveBoothName: data });
        openModal('duplicateModal');
      } catch {
        closeModal();
        navigate(`/error/main`);
        console.error('Error checking duplicate');
      }
    },
  };
});
