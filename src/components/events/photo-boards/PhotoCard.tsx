import { usePhotoStore, usePhotoModalStore } from '@/stores/events/BoardStore';
import useBaseModal from '@/stores/baseModal';
import { PhotoCardProps } from '@/types/Board.types';

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const { openModal } = useBaseModal();
  const { setSelectedPhoto } = usePhotoModalStore();
  const { myPhotos, likePhoto, unlikePhoto, updatePhotoHeart } = usePhotoStore();

  const mainUserId = localStorage.getItem('mainUserId');

  // 내 사진인지 판단 (photoId가 내 사진 목록에 존재하는가)
  const isUserPhoto = myPhotos.some((p) => p.photoId === photo.photoId);

  const handleClickDelete = () => {
    setSelectedPhoto(photo);
    openModal('deletePhotoModal');
  };

  const handleToggleLike = async () => {
    if (!mainUserId) {
      openModal('requireLoginModal');
      return;
    }
    if (isUserPhoto) {
      alert('자신의 게시물에는 좋아요를 할 수 없습니다!');
      return;
    }

    try {
      const newHeart = !photo.heart;
      const newHeartCount = newHeart ? photo.heartCount + 1 : photo.heartCount - 1;

      if (newHeart) {
        await likePhoto(photo.photoId, mainUserId);
      } else {
        await unlikePhoto(photo.photoId, mainUserId);
      }

      updatePhotoHeart(photo.photoId, newHeart, newHeartCount);
    } catch {
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      className="dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0 border-2"
      style={{ backgroundImage: `url(${photo.imageUrl})` }}
      onClick={() => {
        setSelectedPhoto(photo);
        openModal('extendPhotoModal');
      }}
    >
      {isUserPhoto && (
        <button
          className="absolute top-3 right-3 z-50 w-5 h-5 bg-delete bg-cover bg-no-repeat bg-center"
          onClick={(e) => {
            e.stopPropagation();
            handleClickDelete();
          }}
        ></button>
      )}

      <div className="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
        <div className="absolute bottom-[1px] left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-800 opacity-50 rounded-b-3xl"></div>
        <div className="relative z-10">
          <h2 className="font-bold mb-1 break-keep">{photo.mainUserName}</h2>

          <div className="flex items-center gap-1 text-2xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleLike();
              }}
              className={`w-4 h-4 ${isUserPhoto || !mainUserId ? 'cursor-not-allowed' : ''}`}
            >
              <img
                src={photo.heart ? '/icons/events/full-heart.svg' : '/icons/events/empty-heart.svg'}
                className="w-full h-full"
              />
            </button>
            <span>{photo.heartCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
