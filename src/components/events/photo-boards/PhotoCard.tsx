import { PhotoPost } from '@/types/Board.types';
import useBaseModal from '@/stores/baseModal';
import { likePhoto, unlikePhoto, usePhotoModalStore, usePhotoStore } from '@/stores/events/BoardStore';
import { useState } from 'react';

interface PhotoCardProps {
  photo: PhotoPost;
  isUserPhoto: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isUserPhoto = false }) => {
  const [isLike, setIsLike] = useState(photo.heart);
  const [likeCount, setLikeCount] = useState(photo.heartCount);

  const { openModal } = useBaseModal();
  const { setSelectedPhoto } = usePhotoModalStore();
  const { updatePhotoHeart } = usePhotoStore();

  const handleClickDelete = () => {
    setSelectedPhoto(photo);
    openModal('deletePhotoModal');
  };

  const handleToggleLike = async () => {
    const mainUserId = localStorage.getItem('mainUserId');
    if (!mainUserId) return;

    try {
      if (isLike) {
        await unlikePhoto(photo.photoId, mainUserId);
        setIsLike(false);
        setLikeCount((prev) => {
          const newCount = prev - 1;
          updatePhotoHeart(photo.photoId, false, newCount);
          return newCount;
        });
      } else {
        await likePhoto(photo.photoId, mainUserId);
        setIsLike(true);
        setLikeCount((prev) => {
          const newCount = prev + 1;
          updatePhotoHeart(photo.photoId, true, newCount);
          return newCount;
        });
      }
    } catch (e) {
      console.error('좋아요 처리 실패:', e);
    }
  };

  return (
    <div
      key={photo.photoId}
      className="dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0"
      style={{ backgroundImage: `url(${photo.imageUrl})` }}
    >
      {isUserPhoto && (
        <button
          className="absolute top-4 right-4 z-20 w-6 h-6 bg-x-button bg-contain bg-no-repeat bg-center"
          onClick={() => {
            handleClickDelete();
          }}
        ></button>
      )}

      <div className="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-700 via-slate-500 opacity-50 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="font-bold mb-1 break-keep">{photo.mainUserName}</h2>

          <div className="flex items-center gap-1 text-2xs">
            <button
              onClick={isUserPhoto ? undefined : handleToggleLike}
              className={`w-4 h-4 ${isUserPhoto ? 'cursor-not-allowed' : ''}`}
              disabled={isUserPhoto}
            >
              <img
                src={isLike ? '/icons/events/full-heart.svg' : '/icons/events/empty-heart.svg'}
                alt="like"
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

export default PhotoCard;
