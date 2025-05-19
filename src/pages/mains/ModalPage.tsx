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

const ModalPage = () => {
  
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

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
      {modalType === 'messageFailModal' && <MessageFailModal />}
      {modalType === 'orderModal' && <OrderModal />}
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
    </ModalBackground>
  );
};

export default ModalPage;