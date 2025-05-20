import { create } from 'zustand';
import { api, tokenizedApi } from '@/utils/api';
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

  getAllPhotos: async (type: 'new' | 'heart'): Promise<PhotoInfo> => {
    const mainUserId = localStorage.getItem('mainUserId');
    const { data, message, success } = await api.get(`/main/event/photo/all/${type}`, {
      params: mainUserId ? { 'main-user-id': mainUserId } : {},
    });
    if (!success) {
      console.error('Error fetching all photos:', message);
      return {
        photoTotalCount: 0,
        photoList: [],
      };
    }
    return data as PhotoInfo;
  },

  getMyPhotos: async (type: 'new' | 'heart'): Promise<PhotoInfo> => {
    const mainUserId = localStorage.getItem('mainUserId');
    const { data, message, success } = await api.get(`/main/event/photo/my/${type}/user/${mainUserId}`);

    if (typeof data === 'string') {
      try {
        // 두 번째 JSON 시작 전까지 자르기 (두 번째 '{' 검색 기준)
        const firstBrace = data.indexOf('{');
        const secondBrace = data.indexOf('}{', firstBrace + 1);
        const sliceEnd = secondBrace === -1 ? data.length : secondBrace + 1;

        const jsonString = data.slice(firstBrace, sliceEnd);
        return JSON.parse(jsonString);
      } catch {
        console.log('Error parsing JSON');
      }
    }

    if (!success) {
      console.error('Error fetching my photos:', message);
      return {
        photoTotalCount: 0,
        photoList: [],
      };
    }
    return data as PhotoInfo;
  },

  uploadPhotoPost: async (imageUrl: string) => {
    const mainUserId = localStorage.getItem('mainUserId');

    const { data, message, success } = await tokenizedApi.post('/main/event/photo', {
      mainUserId,
      imageUrl,
    });

    if (!success) {
      console.error('Error posting photos:', message);
    }

    return data;
  },

  deletePhoto: async (photoId: string, mainUserId: string) => {
    const { data, message, success } = await tokenizedApi.delete('/main/event/photo', {
      data: { photoId, mainUserId },
    });

    if (!success) {
      console.error('Error delete photo:', message);
    }

    return data;
  },

  likePhoto: async (photoId: string, mainUserId: string) => {
    const { data, message, success } = await tokenizedApi.post('/main/event/photo/heart', {
      photoId,
      mainUserId,
    });

    if (!success) {
      console.error('Error fetching likes', message);
    }

    return data;
  },

  unlikePhoto: async (photoId: string, mainUserId: string) => {
    const { data, message, success } = await tokenizedApi.delete('/main/event/photo/heart', {
      data: { photoId, mainUserId },
    });

    if (!success) {
      console.error('Error fetching unlikes:', message);
    }

    return data;
  },
}));
