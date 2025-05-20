import { create } from 'zustand';
import { api } from "@/utils/api";

interface IEventStore {
  startTime: string;
  endTime: string;
  questionInfo: IQuestion | null;
  modalType: string;
  setModalType: (type: string) => void;
  getQuestion: () => void;
  getNextQuestion: () => void;
  saveAnswer: (userId: string, answer: string) => void;
  checkJoin: (mainUserId: string) => Promise<boolean>;
}

interface IQuestion {
  question: string;
  questionId: string;
}

export const useEventStore = create<IEventStore>((set, get) => ({
  startTime: '',
  endTime: '',
  questionInfo: null,
  modalType: 'time',
  setModalType: (type) => { set({ modalType: type })},
  getQuestion: async () => {
    try {
      const res = await api.get('/main/event/real/time/question');
      if (res.data.success) {
        const { realTimeQuestionId, question } = res.data.responseRealTimeQuestionGetDTO;
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
      if (res.data.success) {
        const { startTime, endTime } = res.data.responseRealTimeQuestionNextTimeGetDTO;
        set({ startTime, endTime });
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  },
  saveAnswer: async (userId, answer) => {
    const { questionInfo } = get();
    try {
      const res = await api.post('/main/event/real/time/answer', {
        realTimeQuestionId: questionInfo?.questionId,
        mainUserId: userId,
        answer: answer,
      });
      if (res.data.success) {
        console.log(res.data.success)
      } else {
        alert("답변을 저장하지 못했습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  },
  checkJoin: async (mainUserId) => {
    const { questionInfo } = get();
    try {
      const res = await api.get(`/main/event/real/time/participated/mainUserId/${mainUserId}/realTimeQuestionId/${questionInfo?.questionId}`);
      return res.data.success;
    } catch (err) {
      console.error(err);
      return true;
    }
  },
}));

export default useEventStore;