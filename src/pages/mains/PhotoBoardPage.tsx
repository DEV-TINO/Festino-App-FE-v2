import BoardTabs from '@/components/events/photo-boards/BoardTabs';
import Header from '@/components/headers/Header';

const PhotoBoardPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="max-w-[500px] w-full h-[60px] bg-white flex justify-center items-center px-6 shadow-xs z-50">
        <p className="font-medium text-xl">사진 업로드 이벤트</p>
      </div>
      <BoardTabs />
    </>
  );
};

export default PhotoBoardPage;
