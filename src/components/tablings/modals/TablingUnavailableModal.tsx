import React from 'react';
import useBaseModal from '@/stores/baseModal';

const TablingUnavailableModal: React.FC = () => {
  const { closeModal } = useBaseModal();

  return (
    <div
      className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="w-12 h-12 rounded-full bg-primary-900-light-16 grid place-items-center">
        <img src="/icons/commons/info.svg" alt="info" />
      </div>

      <div className="w-full flex flex-col gap-3 items-center">
        <p className="text-secondary-700 text-xl font-bold">이용 불가</p>
        <p className="text-secondary-500 text-center">
          테이블링 기능은 현재 사용할 수 없습니다.
          <br />
        </p>
      </div>

      <button className="w-full h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl" onClick={closeModal}>
        확인
      </button>
    </div>
  );
};

export default TablingUnavailableModal;
