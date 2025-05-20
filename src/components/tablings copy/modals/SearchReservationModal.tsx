import { useReservationStore } from "@/stores/tablings/tablingStore";
import useBaseModal from "@/stores/baseModal";

const SearchReservationModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { reservationInfo, userName } = useReservationStore();

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-[21px] py-7 gap-7"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className="w-full h-[19px] text-secondary-700 font-semibold text-center">
          {reservationInfo?.adminName} 부스 예약
        </div>
        <div className="w-full h-[122px] flex flex-col gap-1 items-center justify-start leading-none mb-3">
          <div className="text-primary-900 font-bold relative h-[94px]">
            <div className="text-10xl relative">
              {reservationInfo?.totalTeamCount}
              <span className="text-xl absolute bottom-2 w-[35px]">번째</span>
            </div>
          </div>
          <div className="text-secondary-500 font-bold break-keep">
            <span>{userName}님 앞에 </span>
            <span className="text-secondary-700 text-xl">{(reservationInfo?.totalTeamCount ?? 1) - 1}</span>
            <span>팀이 대기중입니다.</span>
          </div>
        </div>
        <div className="flex flex-col w-full h-[78px] bg-primary-900-light-6 rounded-lg-xl gap-3 p-4 text-sm justify-center">
          <div className="flex flex-row justify-between">
            <div>예약번호</div>
            <div>{reservationInfo?.reservationNum}번</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>인원</div>
            <div>{reservationInfo?.personCount}명</div>
          </div>
        </div>
        <button
          className="w-full h-[43px] text-white font-bold rounded-10xl border-1 border-primary-900-light-68 shrink-0 bg-primary-900"
          onClick={() => closeModal()}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default SearchReservationModal;
