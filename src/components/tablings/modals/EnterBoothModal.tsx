import useBaseModal from "@/stores/baseModal";
import { useReservationStore } from "@/stores/tablings/tablingStore";

const EnterBoothModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { reservationInfo } = useReservationStore();

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className="w-12 h-12 bg-primary-900-light-16 rounded-full grid place-items-center">
          <img src="/icons/commons/info.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center text-center">
          <p className="text-secondary-700 text-xl font-bold">입장안내</p>
          <p className="text-secondary-500 break-keep">
            앞에 대기 팀이 없어요!
            <br />
            <span className="font-bold text-primary-900">{reservationInfo?.adminName}</span>
            부스 앞에서 대기해주세요.
            <br />곧 입장 가능합니다.
          </p>
        </div>
        <button
          className="w-full h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl"
          onClick={() => closeModal()}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default EnterBoothModal;
