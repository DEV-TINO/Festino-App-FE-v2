import { create } from 'zustand';
import { api } from "@/utils/api";

interface IEventStore {
  startTime: string;
  endTime: string;
  questionInfo: IQuestion | null;
  modalType: string;
  answer: string,
  setModalType: (type: string) => void;
  getQuestion: () => void;
  getNextQuestion: () => void;
  saveAnswer: (userId: string | null, answer: string) => void;
  checkJoin: (mainUserId: string | null) => Promise<boolean>;
  setAnswer: (answer: string) => void;
}

interface IQuestion {
  question: string;
  questionId: string;
}

export const useEventStore = create<IEventStore>((set, get) => ({
  answer: '',
  startTime: '',
  endTime: '',
  questionInfo: null,
  modalType: 'time',
  setAnswer: (answer) => { set({ answer })},
  setModalType: (type) => { set({ modalType: type })},
  getQuestion: async () => {
    try {
      const res = await api.get('/main/event/real/time/question');
      if (res.success) {
        const { realTimeQuestionId, question } = res.data;
        set({
          questionInfo: {
            questionId: realTimeQuestionId,
            question: question,
          },
        });
      } else {
        alert("문제를 받아오지 못했습니다.")
      }
    } catch (err) {
      console.error(err);
    }
  },
  getNextQuestion: async () => {
    try {
      const res = await api.get('/main/event/real/time/next/question');
      if (res.success) {
        const { startTime, endTime } = res.data;
        set({ startTime, endTime });
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  },
  saveAnswer: async (userId, answer) => {
    if (!userId) return;
    const { questionInfo } = get();
    try {
      const res = await api.post('/main/event/real/time/answer', {
        realTimeQuestionId: questionInfo?.questionId,
        mainUserId: userId,
        answer: answer,
      });
      if (!res.success) {
        alert("답변을 저장하지 못했습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  },
  checkJoin: async (mainUserId) => {
    if (!mainUserId) return true;
    const { questionInfo } = get();
    try {
      const res = await api.get(`/main/event/real/time/participated/mainUserId/${mainUserId}/realTimeQuestionId/${questionInfo?.questionId}`);
      return res.data;
    } catch (err) {
      console.error(err);
      return true;
    }
  },
}));

export default useEventStore;