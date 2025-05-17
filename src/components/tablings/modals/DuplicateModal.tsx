import useBaseModal from '@/stores/baseModal';
import { useReservationStore } from '@/stores/tablings/tablingStore';
import { useNavigate } from 'react-router-dom';

const DuplicateModal: React.FC = () => {
  const { saveReservation, reserveInfo, prevReserveBoothName } = useReservationStore();
  const { openModal, closeModal } = useBaseModal();
  const navigate = useNavigate();

  const handleClickReserveButton = () => {
    saveReservation(reserveInfo, {
      openModal,
      closeModal,
      navigate,
    });
  };

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-12 h-12 bg-primary-900-light-16 rounded-full grid place-items-center">
          <img src="/icons/commons/info.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center text-center">
          <p className="text-secondary-700 text-xl font-bold">예약 안내</p>
          <p className="text-secondary-500 break-keep">
            <span className="font-bold text-primary-900"> {prevReserveBoothName} </span>에 이미 예약이 존재합니다.
            <br />
            지금 예약하면 이전 예약이 취소됩니다.
            <br />
            예약하시겠습니까?
          </p>
        </div>
        <div className="flex w-full gap-[10px] font-bold">
          <button
            className="w-full h-11 grow rounded-full border-2 border-primary-900-light-68 text-primary-900"
            onClick={() => closeModal()}
          >
            취소
          </button>
          <button
            className="w-full h-11 grow rounded-full text-white bg-primary-900"
            onClick={() => handleClickReserveButton()}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default DuplicateModal;
