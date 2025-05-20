import React from 'react';
import OrderModal from './OrderModal';
import OrderConfirmModal from './OrderConfirmModal';
import OrderCompleteModal from './OrderCompletemodal';
import useBaseModal from '@/stores/baseModal';
import OneMinuteModal from './OneMinuteModal';
import TimeOverModal from './TimeOverModal';
import OrderInprocessModal from './OrderInprocessModal';
import ExitPaymentModal from './ExitPayment';
import OverrideOrderModal from './OverrideOrderModal';
import OrderCancelConfirmModal from './OrderCancelConfirmModal';

const ModalRenderer: React.FC = () => {
  const { isModalOpen, modalType, closeModal } = useBaseModal();

  if (!isModalOpen) return null;
  console.log('🔍 모달 렌더링 중:', modalType);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center "
      onClick={() => {
        closeModal();
      }}
    >
      <div
        className="relative z-[600] w-full max-w-[346px] mx-auto px-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {modalType === 'orderModal' && <OrderModal />}
        {modalType === 'orderConfirmModal' && <OrderConfirmModal />}
        {modalType === 'orderCompleteModal' && <OrderCompleteModal />}
        {modalType === 'oneMinuteModal' && <OneMinuteModal />}
        {modalType === 'timeOverModal' && <TimeOverModal />}
        {modalType === 'orderInProgressModal' && <OrderInprocessModal />}
        {modalType === 'exitPaymentModal' && <ExitPaymentModal />}
        {modalType === 'overrideOrderModal' && <OverrideOrderModal />}
        {modalType === 'orderCancelConfirmModal' && <OrderCancelConfirmModal />}
      </div>
    </div>
  );
};

export default ModalRenderer;
