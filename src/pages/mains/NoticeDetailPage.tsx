import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNoticeStore } from "@/stores/homes/noticeStore";
import Notice from "@/components/homes/notices/Notice";
import Header from "@/components/headers/Header";
import NoticeHeader from "@/components/homes/notices/NoticeHeader";

const NoticeDetailPage: React.FC = () => {
  const { noticeId } = useParams<{ noticeId: string }>();
  const { getNotice, noticeData } = useNoticeStore();

  useEffect(() => {
    if (noticeId) {
      getNotice(noticeId);
    }
  }, [noticeId, getNotice]);

  if (!noticeData) {
    return <div>로딩중</div>;
  }

  return (
    <div className="flex flex-col min-h-screen h-full items-center bg-primary-50 select-none pb-16">
      <Header />
      <NoticeHeader />
      <Notice notice={noticeData} />
      <div className="py-30"></div>
    </div>
  );
};

export default NoticeDetailPage;