import useBaseModal from '@/stores/baseModal';
import { useOrderStore } from '@/stores/orders/orderStore';
import { useNavigate } from 'react-router-dom';

const ExitPaymentModal: React.FC = () => {
  console.log('🧩 ExitPaymentModal 렌더링됨');

  const { closeModal } = useBaseModal();
  const navigate = useNavigate();
  const { boothId, tableNum } = useOrderStore();

  return (
    <div
      className=" flex items-center  justify-center"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="relative col-start-2  row-start-2 bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5 w-[320px] max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">주문 퇴장</p>
          <p className="text-secondary-500">주문을 그만두시겠습니까?</p>
        </div>
        <div className="flex w-full gap-3 font-bold">
          <button
            className="w-full h-11 rounded-full border-2 border-primary-700 text-primary-700"
            onClick={() => closeModal()}
          >
            취소
          </button>
          <button
            className="w-full h-11 rounded-full text-white bg-primary-700"
            onClick={() => {
              closeModal();
              navigate(`/order/${boothId}/${tableNum}`);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitPaymentModal;
