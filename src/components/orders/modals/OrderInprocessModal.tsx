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
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center whitespace-nowrap">
          <p className="text-secondary-700 text-xl font-bold">주문 진행 중</p>
          <p className="text-secondary-500">
            다른 사용자가 주문 진행 중입니다.
            <br />
            주문 완료 전까지 메뉴 수정이 불가합니다.
          </p>
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
