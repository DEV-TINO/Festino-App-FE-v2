import useBaseModal from '@/stores/baseModal';
import ModalBackground from '@/components/modals/ModalBackground';
import TimetableModal from '@/components/homes/TimetableModal';
import NoReserveModal from '@/components/tablings/modals/NoReserveModal';
import LoadingModal from '@/components/tablings/modals/LoadingModal';
import FailReservationModal from '@/components/tablings/modals/FailReservationModal';
import EnterBoothModal from '@/components/tablings/modals/EnterBoothModal';
import SearchReservationModal from '@/components/tablings/modals/SearchReservationModal';
import DuplicateModal from '@/components/tablings/modals/DuplicateModal';
import ReservationModal from '@/components/tablings/modals/ReservationModal';
import CompleteReserveModal from '@/components/tablings/modals/CompleteReserveModal';
import MessageFailModal from '@/components/tablings/modals/MessageFailModal';
import OrderModal from '@/components/orders/modals/OrderModal';
import LoginModal from '@/components/auths/LoginModal';
import UploadCompleteModal from '@/components/events/photo-boards/UploadCompleteModal';
import UploadFailModal from '@/components/events/photo-boards/UploadFailModal';
import DeletePhotoModal from '@/components/events/photo-boards/DeletePhotoModal';
import LogoutModal from '@/components/auths/LogoutModal';
import QuizModal from '@/components/events/modals/QuizModal';
import ConfirmModal from '@/components/events/modals/ConfirmModal';
import LoginFailModal from '@/components/auths/LoginFailModal';
import RequireLoginModal from '@/components/events/RequrieLoginModal';
import ExtendPhotoModal from '@/components/events/photo-boards/ExtendPhotoModal';
import OrderConfirmModal from '@/components/orders/modals/OrderConfirmModal';
import OrderCompleteModal from '@/components/orders/modals/OrderCompletemodal';
import OneMinuteModal from '@/components/orders/modals/OneMinuteModal';
import TimeOverModal from '@/components/orders/modals/TimeOverModal';
import OrderInprocessModal from '@/components/orders/modals/OrderInprocessModal';
import ExitPaymentModal from '@/components/orders/modals/ExitPayment';
import OverrideOrderModal from '@/components/orders/modals/OverrideOrderModal';
import OrderCancelConfirmModal from '@/components/orders/modals/OrderCancelConfirmModal';
import NonCloseModalBackground from '@/components/modals/NonCloseModalBackground';

const ModalPage = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  if (modalType === 'extendPhotoModal') {
    return (
      <NonCloseModalBackground>
        <ExtendPhotoModal />
      </NonCloseModalBackground>
    );
  }

  return (
    <ModalBackground>
      {modalType === 'timetable' && <TimetableModal />}
      {modalType === 'loadingModal' && <LoadingModal />}
      {modalType === 'enterBoothModal' && <EnterBoothModal />}
      {modalType === 'searchReservationModal' && <SearchReservationModal />}
      {modalType === 'noReserveModal' && <NoReserveModal />}
      {modalType === 'duplicateModal' && <DuplicateModal />}
      {modalType === 'reservationModal' && <ReservationModal />}
      {modalType === 'failReservationModal' && <FailReservationModal />}
      {modalType === 'completeReserveModal' && <CompleteReserveModal />}
      {modalType === 'loginModal' && <LoginModal />}
      {modalType === 'uploadCompleteModal' && <UploadCompleteModal />}
      {modalType === 'uploadFailModal' && <UploadFailModal />}
      {modalType === 'deletePhotoModal' && <DeletePhotoModal />}
      {modalType === 'logoutModal' && <LogoutModal />}
      {modalType === 'quizModal' && <QuizModal />}
      {modalType === 'confirm' && <ConfirmModal />}
      {modalType === 'loginFailModal' && <LoginFailModal />}
      {modalType === 'requireLoginModal' && <RequireLoginModal />}
      {modalType === 'extendPhotoModal' && <ExtendPhotoModal />}
      {modalType === 'messageFailModal' && <MessageFailModal />}
      {modalType === 'orderModal' && <OrderModal />}
      {modalType === 'orderConfirmModal' && <OrderConfirmModal />}
      {modalType === 'orderCompleteModal' && <OrderCompleteModal />}
      {modalType === 'oneMinuteModal' && <OneMinuteModal />}
      {modalType === 'timeOverModal' && <TimeOverModal />}
      {modalType === 'orderInProgressModal' && <OrderInprocessModal />}
      {modalType === 'exitPaymentModal' && <ExitPaymentModal />}
      {modalType === 'overrideOrderModal' && <OverrideOrderModal />}
      {modalType === 'orderCancelConfirmModal' && <OrderCancelConfirmModal />}
    </ModalBackground>
  );
};

export default ModalPage;
