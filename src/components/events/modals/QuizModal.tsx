import useBaseModal from "@/stores/baseModal";
import { useEffect, useState } from "react";
import { useEventStore } from "@/stores/events/eventStore";
import { useAuthStore } from "@/stores/auths/authStore";

const QuizModal: React.FC = () => {
  const { closeModal, openModal } = useBaseModal();
  const {
    getQuestion,
    getNextQuestion,
    setModalType,
    saveAnswer,
    checkJoin,
    startTime,
    endTime,
    questionInfo,
  } = useEventStore();
  const { isLogin, mainUserId } = useAuthStore();

  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("답변은 제출 시 변경할 수 없습니다!");

  useEffect(() => {
    const checkEvent = async () => {
      if (!startTime || !endTime) {
        await getNextQuestion();
        return;
      }
  
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);
  
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error("시간 파싱 실패:", startTime, endTime);
        return;
      }
  
      if (now >= start && now <= end) {
        if (!questionInfo) {
          await getQuestion();
        }
      } else {
        closeModal();
        setModalType("time");
        openModal("confirm");
      }
    };
  
    checkEvent();
  }, [startTime, endTime, questionInfo]);

  const handleSubmit = async () => {
    if (!isLogin()) {
      setMessage("로그인 이후 참여 가능합니다.");
      return;
    } else {
      const isJoined = await checkJoin(mainUserId);
      if (isJoined) {
        closeModal();
        setModalType("join");
        openModal("confirm");
        return;
      }
    }

    await saveAnswer(mainUserId, answer);
    closeModal();
  };

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex justify-between px-5">
          <div className="w-[20px] h-[20px]" />
          <div className="text-xs text-primary-700 rounded-full w-[80px] h-[22px] flex justify-center items-center border-2 border-primary font-medium">
            실시간 이벤트
          </div>
          <div
            className="w-[20px] h-[20px] bg-x-button bg-center bg-no-repeat bg-[length:20px_20px] cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <p className="text-secondary-700 text-xl font-semibold">
          {questionInfo?.question}
        </p>
        <div className="flex w-full gap-3 items-center">
          <div className="text-secondary-400">답:</div>
          <input
            className="w-full border p-2 rounded-xl"
            placeholder="답을 입력해주세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-danger text-xs">
            {message}
          </p>
          <button
            className="w-full h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl"
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizModal;