import useBaseModal from "@/stores/baseModal";
import useEventStore from "@/stores/events/eventStore";
import { truncateText } from "@/utils/utils";

const SubmitModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { answer } = useEventStore();

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
          <p className="text-secondary-700 text-xl font-bold">제출 완료</p>
          <p className="text-secondary-500">제출이 완료되었습니다</p>
        </div>
        <div className="flex gap-2 items-center">
          <p>제출 답안 :</p>
          <p className="text-secondary-500 line-break">{ truncateText(answer, 12) }</p>
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

export default SubmitModal;