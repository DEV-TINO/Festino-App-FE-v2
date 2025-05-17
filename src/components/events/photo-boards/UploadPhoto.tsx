import useBaseModal from '@/stores/baseModal';
import { uploadPhotoPost } from '@/stores/events/BoardStore';
import { useRef, useState } from 'react';

const UploadPhoto: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const { openModal } = useBaseModal();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadPhotoPost('');
      openModal('uploadCompleteModal');
    } catch {
      openModal('uploadFailModal');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-screen max-w-[500px] min-w-[375px] mx-auto">
      <div className="w-full flex flex-col pt-20 px-4">
        <p className="text-center text-base font-medium leading-relaxed whitespace-pre-line mb-8">
          내가 찍은 축제 사진을 올려주세요!
          {'\n'}(2025년 5월 26일 ~ 5월 29일 간)
          {'\n'}좋아요를 가장 많이 받은 사람에게 경품을 드립니다!
        </p>

        <div
          className="w-full aspect-[3/2] border border-dashed border-secondary-400 rounded-2xl flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center text-secondary-400">
            <img src="/icons/events/photo.svg" alt="사진 추가" className="w-8 h-8 mb-2" />
            <p className="text-base font-medium">{uploading ? '업로드 중...' : '사진 업로드'}</p>
          </div>
        </div>

        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
};

export default UploadPhoto;
