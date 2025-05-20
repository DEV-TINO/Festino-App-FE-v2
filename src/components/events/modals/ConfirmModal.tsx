import useBaseModal from "@/stores/baseModal";
import useEventStore from "@/stores/events/eventStore";

const ConfirmModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { modalType, startTime } = useEventStore();

  const getMessage = () => {
    if (modalType === 'time') {
      return '이벤트 기간이 아닙니다'
    } else return '이미 참여 완료한 이벤트입니다'
  };

  const getEventTime = () => {
    const [datePart, timePart] = startTime.split("T");
    const [month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");

    return `${parseInt(month)}월 ${parseInt(day)}일 ${hour}:${minute} ~`;
  };

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className="w-12 h-12 rounded-full bg-primary-900-light-16 grid place-items-center">
          <img src="/icons/commons/info.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          <p className="text-secondary-700 text-xl font-bold">참여 불가</p>
          <p className="text-secondary-500">{getMessage()}</p>
        </div>
        {(modalType === 'time' && 
          <div className="flex flex-col items-center">
            <p>다음 이벤트</p>
            <p className="text-secondary-500">{getEventTime()}</p>
          </div>
        )}
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

export default ConfirmModal;