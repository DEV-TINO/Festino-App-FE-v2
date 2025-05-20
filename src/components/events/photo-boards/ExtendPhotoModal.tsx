import useBaseModal from '@/stores/baseModal';
import { usePhotoModalStore, usePhotoStore } from '@/stores/events/BoardStore';
import { useEffect, useState } from 'react';

const ExtendPhotoModal: React.FC = () => {
  const { selectedPhoto } = usePhotoModalStore();
  const { closeModal, openModal } = useBaseModal();
  const { myPhotos, likePhoto, unlikePhoto } = usePhotoStore();

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const mainUserId = localStorage.getItem('mainUserId');

  useEffect(() => {
    if (selectedPhoto) {
      setIsLike(selectedPhoto.heart);
      setLikeCount(selectedPhoto.heartCount);
    }
  }, [selectedPhoto]);

  const isUserPhoto = selectedPhoto && myPhotos.some((p) => p.photoId === selectedPhoto.photoId);

  const handleToggleLike = async () => {
    if (!mainUserId) {
      openModal('requireLoginModal');
      return;
    }

    if (isUserPhoto) {
      alert('자신의 게시물에는 좋아요를 할 수 없습니다!');
      return;
    }

    if (!selectedPhoto) return null;

    try {
      if (isLike) {
        await unlikePhoto(selectedPhoto.photoId, mainUserId);
        setIsLike(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await likePhoto(selectedPhoto.photoId, mainUserId);
        setIsLike(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch {
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  if (!selectedPhoto) return null;

  return (
    <div className="absolute dynamic-padding w-full">
      {/* <div className="relative w-full h-4 bg-secondary-700 rounded-t-xl" /> */}

      <div className="relative w-full col-start-2 row-start-2 bg-white flex flex-col items-center">
        <img
          src={selectedPhoto.imageUrl}
          className="snap-start min-w-full h-[380px] flex-shrink-0 aspect-auto bg-no-repeat bg-center object-contain"
        />

        <button className="absolute top-5 right-5 w-[32px] h-[32px]" onClick={() => closeModal()}>
          <img src="/icons/events/close-button.svg" />
        </button>

        <div className="w-full px-6 py-4 bg-secondary-700 overflow-hidden text-white flex justify-between items-center">
          <h2 className="text-base font-semibold">{selectedPhoto.mainUserName}</h2>
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleLike();
              }}
              className={`w-4 h-4 ${isUserPhoto || !mainUserId ? 'cursor-not-allowed' : ''}`}
            >
              <img
                src={isLike ? '/icons/events/full-heart.svg' : '/icons/events/empty-heart.svg'}
                className="w-full h-full"
              />
            </button>
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendPhotoModal;
