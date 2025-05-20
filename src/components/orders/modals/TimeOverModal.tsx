import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBaseModal from '@/stores/baseModal';

const TimeOverModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const navigate = useNavigate();

  const handleClick = () => {
    closeModal();
    navigate('/order/retry-qr'); // retry-qr 페이지로 이동
  };

  return (
    <div
      className="flex inset-0 justify-center relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex-col items-center px-14 py-8 gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
        <img src="/icons/commons/error.svg" />
      </div>
      <div className="w-full flex flex-col gap-3 items-center break-keep text-center whitespace-nowrap">
        <p className="text-secondary-700 text-xl font-bold">주문 시간 초과</p>
        <p className="text-secondary-500">
          주문 시간이 초과되었어요
          <br />
          QR 촬영 페이지로 이동합니다.
        </p>
      </div>
      <button className="w-full h-12 bg-primary-700 rounded-3xl text-white font-semibold text-xl" onClick={handleClick}>
        확인
      </button>
    </div>
  );
};

export default TimeOverModal;
