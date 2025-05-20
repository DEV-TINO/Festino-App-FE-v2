export interface Notice {
  noticeId: string;
  title: string;
  content: string;
  updateAt: string;
  isPin: boolean;
}

export interface NoticeStore {
  mainNoticeData: Notice | null;
  noticeData: Notice | null;
  pinNotices: Notice[];
  notices: Notice[];
  allNotices: Notice[];

  getMainNotice: () => Promise<void>;
  getNotice: (noticeId: string) => Promise<void>;
  getAllNotice: () => Promise<void>;
}

export interface NoticeDetail {
  noticeId: string;
  title: string;
  content: string;
  updateAt: string;
  isPin: boolean;
  imageUrl?: string[];
}

export interface NoticeProps {
  notice: NoticeDetail;
};

export interface NoticeListItemProps {
  notice: Notice;
}