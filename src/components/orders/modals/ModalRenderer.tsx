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

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => {
        console.log('[ModalRenderer] 배경 클릭됨 → closeModal 실행');
        closeModal();
      }}
    >
      <div
        className="relative z-[1000] w-fit"
        onClick={(e) => {
          console.log('[ModalRenderer] 내부 모달 클릭됨 → 전파 막음');
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
