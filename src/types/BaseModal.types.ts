export interface IBaseModal {
  isModalOpen: boolean;
  modalType: string;
  menuImageSrc: null | string,
  orderCancelConfirmCallback: (() => void) | null;
  exitConfirmCallback: (() => void) | null;

  setOrderCancelConfirmCallback: (cb: () => void) => void;
  setExitConfirmCallback: (cb: () => void) => void;
  setMenuImageSrc: (src: string) => void,

  setModalType: (type: string) => void;
  openModal: (type: string) => void;
  closeModal: () => void;
}