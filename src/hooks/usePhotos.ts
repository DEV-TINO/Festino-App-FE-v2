import { usePhotoStore } from '@/stores/events/BoardStore';
import { useState } from 'react';

const usePhotos = (mainUserId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);

  const photoStore = usePhotoStore();

  const getPhotos = async (type: 'new' | 'heart', useLoading = false) => {
    if (useLoading) setIsLoading(true);

    const allPromise = photoStore.getAllPhotos(type);
    const myPromise = mainUserId ? photoStore.getMyPhotos(type) : null;

    const results = await Promise.allSettled([allPromise, ...(myPromise ? [myPromise] : [])]);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const data = result.value;
        if (index === 0) {
          photoStore.setAllPhotos(data.photoList, data.photoTotalCount);
        } else {
          photoStore.setMyPhotos(data.photoList, data.photoTotalCount);
        }
      }
    });

    if (useLoading) setIsLoading(false);
  };

  const initPhotos = () => {
    photoStore.setMyPhotos([], 0);
    photoStore.setAllPhotos([], 0);
  };

  return {
    isLoading,
    getPhotos,
    initPhotos,
  };
};

export default usePhotos;
