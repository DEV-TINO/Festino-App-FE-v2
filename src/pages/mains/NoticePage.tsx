import { useEffect } from "react";
import { useNoticeStore } from "@/stores/homes/noticeStore";
import NoticeListItem from "@/components/homes/notices/NoticeListItem";
import NoticeHeader from "@/components/homes/notices/NoticeHeader";
import Header from "@/components/headers/Header";

const NoticePage: React.FC = () => {
  const { getAllNotice, pinNotices, notices } = useNoticeStore();

  useEffect(() => {
    getAllNotice();
  }, []);

  return (
    <div className="flex flex-col min-h-screen h-full items-center bg-primary-50 select-none pb-20">
      <Header />
      <NoticeHeader />
      <div className="px-4 flex flex-col gap-3 w-full max-w-[600px] mt-5">
        {pinNotices.map((notice) => (
          <NoticeListItem key={notice.noticeId} notice={notice} />
        ))}
        {notices.map((notice) => (
          <NoticeListItem key={notice.noticeId} notice={notice} />
        ))}
      </div>
    </div>
  );
};

export default NoticePage;