import { create } from 'zustand';
import { IBaseModal } from '@/types/BaseModal.types';

const useBaseModal = create<IBaseModal>((set) => ({
  isModalOpen: false,
  modalType: '',
  orderCancelConfirmCallback: null,
  setOrderCancelConfirmCallback: (cb) => set({ orderCancelConfirmCallback: cb }),

  setModalType: (type) => set({ modalType: type }),
  openModal: (type) =>
    set({
      isModalOpen: true,
      modalType: type,
    }),
  closeModal: () => set({ isModalOpen: false, modalType: '' }),
}));

export default useBaseModal;
