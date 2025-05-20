import { useEffect } from 'react';
import { usePhotoStore } from '@/stores/events/BoardStore';
import { PhotoPost } from '@/types/Board.types';
import PhotoCard from './PhotoCard';
import usePhotos from '@/hooks/usePhotos';
import useBaseModal from '@/stores/baseModal';

const SearchPhoto: React.FC = () => {
  const { myPhotos, myPhotoCount, allPhotos, allPhotoCount } = usePhotoStore();
  const mainUserId = localStorage.getItem('mainUserId');
  const { openModal } = useBaseModal();

  const { getPhotos, initPhotos } = usePhotos(mainUserId);

  useEffect(() => {
    initPhotos();
    getPhotos('new', true);
  }, [mainUserId]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPhotos('new');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-screen max-w-[500px] min-w-[375px] z-0">
        <div className="pt-5 dynamic-bottom flex flex-col gap-5 dynamic-left-padding w-full justify-start">
          <p className="text-xl font-bold pl-2">내 사진</p>
          <div
            id="user-photo"
            className="w-full flex overflow-x-scroll overflow-y-hidden scroll-smooth"
            onTouchStart={(e) => e.stopPropagation()}
          >
            {mainUserId ? (
              myPhotoCount === 0 ? (
                // 로그인 상태, 내 게시물이 존재하지 않을 때
                <div className="w-full text-center text-primary-900">사진을 업로드 해보세요!</div>
              ) : (
                // 로그인 상태, 내 게시물 존재
                <>
                  <div
                    className={`gap-2 ${
                      myPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-rows-1 grid-flow-col'
                    }`}
                  >
                    {myPhotos
                      .filter((photo) => photo.imageUrl) // imageUrl이 존재하는 경우만 필터링
                      .map((photo: PhotoPost) => (
                        <PhotoCard key={photo.photoId} photo={photo} />
                      ))}
                  </div>
                </>
              )
            ) : (
              // 로그아웃 상태
              <div className="w-full text-center text-primary-900" onClick={() => openModal('requireLoginModal')}>
                로그인 후 이벤트에 참여하세요!
              </div>
            )}
          </div>

          <hr className="border-gray-300" />

          <p className="text-xl font-bold pl-2">모든 사진</p>
          {allPhotoCount === 0 ? (
            // 게시물이 존재하지 않을 때
            <div className="w-full text-center text-primary-700">첫 번째 이벤트 참가자가 되어보세요!</div>
          ) : (
            // 게시물 존재
            <div id="all-photo" className="w-full" onTouchStart={(e) => e.stopPropagation()}>
              <div
                className={`gap-x-2 gap-y-4 ${
                  allPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-cols-2 grid-flow-row'
                }`}
              >
                {allPhotos
                  .filter((photo) => photo.imageUrl) // imageUrl이 존재하는 경우만 필터링
                  .map((photo: PhotoPost) => (
                    <PhotoCard key={photo.photoId} photo={photo} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPhoto;
