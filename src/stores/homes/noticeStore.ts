import { create } from 'zustand';
import { api } from '@/utils/api';
import { Notice, NoticeStore } from '@/types/Notice.types';

export const useNoticeStore = create<NoticeStore>((set) => ({
  mainNoticeData: null,
  noticeData: null,
  pinNotices: [],
  notices: [],
  allNotices: [],

  getMainNotice: async () => {
    try {
      const { data, success, message } = await api.get('/main/notice');

      if (!success) {
        console.error('getMainNotice 실패:', message);
        set({ mainNoticeData: null });
        return;
      }

      set({ mainNoticeData: data });
    } catch {
      console.log('Error ferching main notice');
    }
  },

  getNotice: async (noticeId: string) => {
    try {
      const { data, success, message } = await api.get(`/main/notice/${noticeId}`);

      if (!success) {
        console.error('getNotice 실패:', message);
        set({ noticeData: null });
        return;
      }

      set({ noticeData: data });
    } catch {
      console.log('Error ferching notice');
    }
  },

  getAllNotice: async () => {
    try {
      const { data, success, message } = await api.get('/main/notice/all');

      if (!success) {
        console.error('getAllNotice 실패:', message);
        set({
          allNotices: [],
          pinNotices: [],
          notices: [],
        });
        return;
      }

      set({
        allNotices: data,
        pinNotices: data.filter((n: Notice) => n.isPin),
        notices: data.filter((n: Notice) => !n.isPin),
      });
    } catch {
      console.log('Error ferching all notice');
    }
  },
}));
