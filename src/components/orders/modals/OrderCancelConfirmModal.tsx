import useBaseModal from '@/stores/baseModal';

const OrderCancelConfirmModal: React.FC = () => {
  const { closeModal, orderCancelConfirmCallback, setOrderCancelConfirmCallback } = useBaseModal();

  const handleConfirm = () => {
    console.log('✅ 예 버튼 클릭됨');
    orderCancelConfirmCallback?.();
    setOrderCancelConfirmCallback(() => null);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative col-start-2 row-start-2 bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5 w-[320px] max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">주문 취소 확인</p>
          <p className="text-secondary-500">
            다른 사용자가 주문 중입니다.
            <br />
            <span className="text-error font-medium text-red-600 ">메뉴를 수정하면 주문이 취소됩니다.</span>
            <br />
            계속하시겠습니까?
          </p>
        </div>
        <div className="flex w-full gap-3 font-bold">
          <button
            className="w-full h-11 rounded-full border-2 border-primary-700 text-primary-700"
            onClick={closeModal}
          >
            아니오
          </button>
          <button className="w-full h-11 rounded-full text-white bg-primary-700" onClick={handleConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelConfirmModal;
