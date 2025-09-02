import { useEffect } from 'react';
import { useNoticeStore } from '@/stores/homes/noticeStore';
import NoticeListItem from '@/components/homes/notices/NoticeListItem';
import NoticeHeader from '@/components/homes/notices/NoticeHeader';
import Header from '@/components/headers/Header';

const NoticePage: React.FC = () => {
  const { getAllNotice, pinNotices, notices } = useNoticeStore();

  useEffect(() => {
    getAllNotice();
  }, []);

  const isEmpty = !pinNotices?.length && !notices?.length;

  return (
    <div className="flex flex-col min-h-screen h-full items-center select-none pb-20 bg-primary-50">
      <Header />
      <NoticeHeader />
      {isEmpty ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-20">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-secondary-700 font-bold">등록된 공지사항이 없습니다.</span>
          </div>
          <div className="bg-error-full bg-cover bg-center bg-no-repeat w-[250px] aspect-[35/31] mx-auto shrink-0"></div>
        </div>
      ) : (
        <div className="px-4 flex flex-col gap-3 w-full max-w-[600px] mt-5">
          {pinNotices.map((notice) => (
            <NoticeListItem key={notice.noticeId} notice={notice} />
          ))}
          {notices.map((notice) => (
            <NoticeListItem key={notice.noticeId} notice={notice} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticePage;
