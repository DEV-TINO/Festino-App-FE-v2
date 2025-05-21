import useBaseModal from '@/stores/baseModal';

const OneMinuteModal: React.FC = () => {
  const { closeModal } = useBaseModal();

  return (
    <div
      className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5 "
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-12 h-12 bg-error rounded-full grid place-items-center ">
        <img src="/icons/commons/error.svg" />
      </div>
      <div className="w-full flex flex-col gap-3 items-center break-keep text-center whitespace-nowrap ">
        <p className="text-secondary-700 text-xl font-bold">제한 시간 1분 전 ⏰</p>
        <p className="text-secondary-500">
          1분 뒤 세션이 종료됩니다.
          <br />
          주문을 서둘러 주세요.
        </p>
      </div>
      <button
        className="w-full h-12 bg-primary-700 rounded-3xl text-white font-semibold text-xl"
        onClick={() => closeModal()}
      >
        확인
      </button>
    </div>
  );
};

export default OneMinuteModal;
