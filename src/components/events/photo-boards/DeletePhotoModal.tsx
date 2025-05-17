import useBaseModal from '@/stores/baseModal';
import { deletePhoto, getMyPhotos, usePhotoModalStore, usePhotoStore } from '@/stores/events/BoardStore';
import { useEffect } from 'react';

const DeletePhotoModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { selectedPhoto, clearSelectedPhoto } = usePhotoModalStore();
  const { setMyPhotos } = usePhotoStore();

  const handleDelete = async () => {
    const mainUserId = localStorage.getItem('mainUserId');
    if (!selectedPhoto || !mainUserId) return;

    try {
      await deletePhoto(selectedPhoto.photoId, mainUserId);

      clearSelectedPhoto();
      closeModal();
    } catch (e) {
      console.error('삭제 실패:', e);
    }
  };

  useEffect(() => {
    if (selectedPhoto !== null) return;

    const refreshMyPhotos = async () => {
      try {
        const { photoList, photoTotalCount } = await getMyPhotos('new');
        setMyPhotos(photoList, photoTotalCount);
      } catch (e) {
        console.error('사진 목록 리패치 실패:', e);
      }
    };

    refreshMyPhotos();
  }, [selectedPhoto, setMyPhotos]);

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">정말로 이미지를 삭제하시겠습니까?</p>
          <p className="text-secondary-500">삭제한 사진은 다시 복구할 수 없습니다.</p>
        </div>
        <div className="flex w-full gap-2">
          <button
            className="w-1/2 h-12 bg-white border-1 border-primary-900 rounded-3xl text-primary-900 font-semibold text-xl"
            onClick={() => closeModal()}
          >
            돌아가기
          </button>
          <button
            className="w-1/2 h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl"
            onClick={() => handleDelete()}
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePhotoModal;
