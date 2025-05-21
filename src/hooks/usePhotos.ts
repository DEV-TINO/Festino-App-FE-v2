import { usePhotoStore } from '@/stores/events/BoardStore';
import { useState } from 'react';

const usePhotos = (mainUserId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAllPhotos, getMyPhotos, setAllPhotos, setMyPhotos, setSortType, sortType } = usePhotoStore();

  const getPhotos = async (type: 'new' | 'heart', useLoading = false) => {
    if (useLoading) setIsLoading(true);

    setSortType(type);

    const allPromise = getAllPhotos(type);
    const myPromise = mainUserId ? getMyPhotos(type) : null;

    const results = await Promise.allSettled([allPromise, ...(myPromise ? [myPromise] : [])]);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const data = result.value;
        if (index === 0) {
          setAllPhotos(data.photoList, data.photoTotalCount);
        } else {
          setMyPhotos(data.photoList, data.photoTotalCount);
        }
      }
    });

    if (useLoading) setIsLoading(false);
  };

  const initPhotos = () => {
    setAllPhotos([], 0);
    setMyPhotos([], 0);
  };

  return {
    isLoading,
    getPhotos,
    initPhotos,
    sortType,
  };
};

export default usePhotos;
