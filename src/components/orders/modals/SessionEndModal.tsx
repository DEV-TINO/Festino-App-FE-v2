import useBaseModal from '@/stores/baseModal';

const OrderInprocessModal: React.FC = () => {
    const { closeModal } = useBaseModal();
  

  return (
    <div>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">주문 시간 초과</p>
          <p className="text-secondary-500">주문 시간이 초과되어 QR 촬영 화면으로 이동합니다.</p>
        </div>
        <button
          className="w-full h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl"
          onClick={() => closeModal()}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default OrderInprocessModal;
