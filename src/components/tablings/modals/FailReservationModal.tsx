import useBaseModal from "@/stores/baseModal";

const FailReservationModal: React.FC = () => {
  const { closeModal } = useBaseModal();

  const getIsOpenDay = () => {
    const today = new Date();
    today.setHours(today.getHours() + 9);
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    if (year === 2025 && month === 5 && date >= 26 && date <= 28) {
      return true;
    }
    return false;
  };

  const isOpenDay = getIsOpenDay();

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
          <p className="text-secondary-700 text-xl font-bold">예약실패</p>
          {isOpenDay ? (
            <p className="text-secondary-500">이미 예약이 존재합니다.</p>
          ) : (
            <p className="text-secondary-500">5월 26일부터 예약이 가능합니다.</p>
          )}
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

export default FailReservationModal;
