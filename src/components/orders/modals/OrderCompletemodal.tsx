import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import useBaseModal from '@/stores/baseModal';

const OrderCompleteModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const navigate = useNavigate();
  const { boothId, tableNum } = useOrderStore();

  const handleClose = () => {
    closeModal();
    navigate(`/order/${boothId}/${tableNum}`);
  };

  return (
    <div className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5">
      <h2 className="text-xl text-secondary-700 font-semibold">주문 확인 안내</h2>
      <div className="text-xs text-secondary-500 text-center break-keep whitespace-nowrap">
        주문이 완료되었습니다.
        <br />
        주문 확인서는 주문 조회에서 다시 확인 가능합니다.
        <br />
        입금 미확인시 주문이 취소될 수 있습니다.
      </div>

      <button onClick={handleClose} className="w-full h-11 bg-primary-700 rounded-3xl text-white font-semibold text-xl">
        닫기
      </button>
    </div>
  );
};

export default OrderCompleteModal;
