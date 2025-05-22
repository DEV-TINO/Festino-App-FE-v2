export interface IBaseModal {
  isModalOpen: boolean;
  modalType: string;
  orderCancelConfirmCallback: (() => void) | null;
  exitConfirmCallback: (() => void) | null;

  setOrderCancelConfirmCallback: (cb: () => void) => void;
  setExitConfirmCallback: (cb: () => void) => void;

  setModalType: (type: string) => void;
  openModal: (type: string) => void;
  closeModal: () => void;
}