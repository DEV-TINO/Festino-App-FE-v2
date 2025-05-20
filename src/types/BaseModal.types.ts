export interface IBaseModal {
  isModalOpen: boolean;
  modalType: string;
  setModalType: (type: string) => void;
  openModal: (type: string) => void;
  closeModal: () => void;

  orderCancelConfirmCallback: (() => void) | null;
  setOrderCancelConfirmCallback: (cb: () => void) => void;
}
