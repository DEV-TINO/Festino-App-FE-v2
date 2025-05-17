import { create } from 'zustand';
import { baseApi, tokenizedApi } from '@/utils/api';
import { PhotoInfo, PhotoModalState, PhotoStore } from '@/types/Board.types';

export const usePhotoModalStore = create<PhotoModalState>((set) => ({
  selectedPhoto: null,
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  clearSelectedPhoto: () => set({ selectedPhoto: null }),
}));

export const usePhotoStore = create<PhotoStore>()((set) => ({
  myPhotos: [],
  allPhotos: [],
  myPhotoCount: 0,
  allPhotoCount: 0,
  setMyPhotos: (photos, count) => set({ myPhotos: photos, myPhotoCount: count }),
  setAllPhotos: (photos, count) => set({ allPhotos: photos, allPhotoCount: count }),
  updatePhotoHeart: (photoId: string, heart: boolean, heartCount: number) =>
    set((state) => ({
      myPhotos: state.myPhotos.map((p) => (p.photoId === photoId ? { ...p, heart, heartCount } : p)),
      allPhotos: state.allPhotos.map((p) => (p.photoId === photoId ? { ...p, heart, heartCount } : p)),
    })),
}));

export const uploadPhotoPost = async (imageUrl: string) => {
  const mainUserId = localStorage.getItem('mainUserId');

  const response = await tokenizedApi.post('/main/event/photo', {
    mainUserId,
    imageUrl,
  });

  return response.data;
};

export const getAllPhotos = async (type: 'new' | 'heart') => {
  const mainUserId = localStorage.getItem('mainUserId');

  const response = await baseApi.get(`/main/event/photo/all/${type}/user/${mainUserId}`);

  if (!response.data.success) throw new Error('사진 게시물 조회 실패');

  return response.data.photoInfo;
};

export const getMyPhotos = async (type: 'new' | 'heart'): Promise<PhotoInfo> => {
  const mainUserId = localStorage.getItem('mainUserId');

  const response = await tokenizedApi.get(`/main/event/photo/my/${type}/user/${mainUserId}`);

  if (!response.data.success) throw new Error('사진 게시물 조회 실패');

  return response.data.photoInfo;
};

export const deletePhoto = async (photoId: string, mainUserId: string) => {
  const response = await tokenizedApi.delete('/main/event/photo', {
    data: { photoId, mainUserId },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || '삭제 실패');
  }

  return response.data;
};

export const likePhoto = async (photoId: string, mainUserId: string) => {
  const response = await tokenizedApi.post('/main/event/photo/heart', {
    photoId,
    mainUserId,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || '좋아요 실패');
  }

  return response.data;
};

export const unlikePhoto = async (photoId: string, mainUserId: string) => {
  const response = await tokenizedApi.delete('/main/event/photo/heart', {
    data: { photoId, mainUserId },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || '좋아요 취소 실패');
  }

  return response.data;
};
