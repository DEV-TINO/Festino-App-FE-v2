import useBaseModal from "@/stores/baseModal";

const MessageFailModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center text-center">
          <p className="text-secondary-700 text-xl font-bold">메세지 전송 실패</p>
          <p className="text-secondary-500">
            예약 조회를 통해
            <br />
            예약 여부를 확인해주세요.
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

export default MessageFailModal;
