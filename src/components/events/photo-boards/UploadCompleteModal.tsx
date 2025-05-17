import useBaseModal from '@/stores/baseModal';

const UploadCompleteModal: React.FC = () => {
  const { closeModal } = useBaseModal();

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
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">이미지 업로드 성공!</p>
          <p className="text-secondary-500">
            이미지가 성공적으로 업로드 되었습니다.
            <br />
            사진 목록에서 이미지를 확인해보세요.
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

export default UploadCompleteModal;
