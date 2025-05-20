export type TabType = '사진 목록' | '사진 업로드';

export interface PhotoPost {
  photoId: string;
  imageUrl: string;
  mainUserName: string;
  heartCount: number;
  heart: boolean;
  createAt: string;
}

export interface PhotoInfo {
  photoTotalCount: number;
  photoList: PhotoPost[];
}

export interface PhotoStore {
  myPhotos: PhotoPost[];
  allPhotos: PhotoPost[];
  myPhotoCount: number;
  allPhotoCount: number;
  setMyPhotos: (photos: PhotoPost[], count: number) => void;
  setAllPhotos: (photos: PhotoPost[], count: number) => void;
  updatePhotoHeart: (photoId: string, heart: boolean, heartCount: number) => void;
  getAllPhotos: (type: 'new' | 'heart') => Promise<PhotoInfo>;
  getMyPhotos: (type: 'new' | 'heart') => Promise<PhotoInfo>;
  uploadPhotoPost: (photoId: string) => void;
  deletePhoto: (photoId: string, mainUserId: string) => void;
  likePhoto: (photoId: string, mainUserId: string) => void;
  unlikePhoto: (photoId: string, mainUserId: string) => void;
}

export interface PhotoCardProps {
  photo: PhotoPost;
}

export interface PhotoModalState {
  selectedPhoto: PhotoPost | null;
  setSelectedPhoto: (photo: PhotoPost) => void;
  clearSelectedPhoto: () => void;
}
