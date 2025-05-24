import useBaseModal from "@/stores/baseModal";
import { useEffect, useState } from "react";
import { useEventStore } from "@/stores/events/eventStore";
import { useAuthStore } from "@/stores/auths/authStore";

const QuizModal: React.FC = () => {
  const { closeModal, openModal } = useBaseModal();
  const {
    getQuestion,
    setModalType,
    saveAnswer,
    checkJoin,
    setAnswer,
    questionInfo,
    answer,
  } = useEventStore();
  const { isLogin } = useAuthStore();

  const [message, setMessage] = useState("*답안은 제출 시 변경할 수 없습니다!");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getQuestion();
  }, []);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!answer) {
      alert("답을 입력해주세요");
      return;
    }

    setIsSubmitting(true);
    try {
      const mainUserId = localStorage.getItem("mainUserId");
      if (!isLogin()) {
        setMessage("*로그인 이후 참여 가능합니다.");
        return;
      }

      const isJoined = await checkJoin(mainUserId);
      if (isJoined) {
        closeModal();
        setModalType("join");
        openModal("confirm");
        return;
      }

      saveAnswer(mainUserId, answer);
      openModal("submit");
    } catch (error) {
      alert("제출 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex justify-between px-5">
        <div className="w-[20px] h-[20px]" />
        <div className="text-xs text-primary-900 rounded-full w-20 h-6 flex justify-center items-center border-2 border-primary-900-light-16 font-medium">
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
        <textarea
          className="w-full border border-secondary-400 p-6 rounded-xl h-32 resize-none"
          placeholder="답을 입력해주세요"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-danger text-sm">{message}</p>
        <button
          className={`w-48 h-12 rounded-3xl text-white font-semibold text-xl ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary-900"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default QuizModal;