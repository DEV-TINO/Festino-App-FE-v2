import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Rating from 'react-rating';
import PersonalInfo from '../commons/PersonalInfo';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';
import { ReviewProps } from '@/types/Review.types';
import { submitReview } from '@/stores/events/reviewStore';

const Review: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [goodFunc, setGoodFunc] = useState<string[]>([]);
  const [badFunc, setBadFunc] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [reuse, setReuse] = useState('');
  const [feedback, setFeedBack] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [studentNum, setStudentNum] = useState('');

  const isAgreed = usePersonalInfoStore((state) => state.isAgreed);
  const setIsAgreed = usePersonalInfoStore((state) => state.setIsAgreed);

  const handleToggleSelection = (
    option: string,
    selectedList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (selectedList.includes(option)) {
      setter(selectedList.filter((item) => item !== option));
    } else {
      setter([...selectedList, option]);
    }
  };

  const handleSubmit = async () => {
    if (
      rating === 0 ||
      goodFunc.length === 0 ||
      badFunc.length === 0 ||
      reuse === '' ||
      name.trim() === '' ||
      phoneNum.trim() === '' ||
      studentNum.trim() === '' ||
      !isAgreed
    ) {
      Swal.fire({
        icon: 'warning',
        title: '필수 항목을 모두 입력해주세요!',
        confirmButtonText: '확인',
      });
      return;
    }

    const payload: ReviewProps = {
      rating,
      goodFunc,
      badFunc,
      reason,
      reuse,
      feedback,
      name,
      phoneNum,
      studentNum,
    };

    try {
      await submitReview(payload);
      resetReview();
      Swal.fire({
        title: 'Thank you for your review!',
        text: 'We will do our best to improve our service.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Fail submit review',
        text: 'Please resubmit your review',
        confirmButtonText: 'OK',
      });
    }
  };

  const resetReview = () => {
    setRating(0);
    setGoodFunc([]);
    setBadFunc([]);
    setReason('');
    setReuse('');
    setFeedBack('');
    setName('');
    setPhoneNum('');
    setStudentNum('');
    setIsAgreed(false);
  };

  const featureOptions = ['부스 위치 안내', '공연 정보 안내', '주문 기능', '예약 기능', '조회 기능', '없음'];

  const chunkArray = (arr: string[], size: number) =>
    arr.reduce((acc: string[][], _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-sm font-bold">Festino 서비스가 얼마나 만족스러웠나요?</div>
        <div className="flex items-center">
          <Rating
            fractions={1}
            initialRating={rating}
            onChange={(value) => {
              setRating((prev) => (prev === value ? 0 : value));
            }}
            fullSymbol={<img src="/icons/events/full-star.svg" className="w-6 mr-1.5" />}
            emptySymbol={<img src="/icons/events/empty-star.svg" className="w-6 mr-1.5" />}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-sm font-bold">Festino를 사용하면서 좋았던 기능은 무엇이었나요?</div>
        {chunkArray(featureOptions, 3).map((row, idx) => (
          <div className="flex gap-2" key={idx}>
            {row.map((feature) => (
              <button
                key={feature}
                onClick={() => handleToggleSelection(feature, goodFunc, setGoodFunc)}
                className={`w-full text-xs font-medium flex items-center justify-center m-0 px-2 py-2 rounded-full border-2 
                ${
                  goodFunc.includes(feature)
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-black border-primary-900-light-20'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-sm font-bold">Festino를 사용하면서 개선이 필요하다고 느낀 기능은 무엇이었나요?</div>
        {chunkArray(featureOptions, 3).map((row, idx) => (
          <div className="flex gap-2" key={idx}>
            {row.map((feature) => (
              <button
                key={feature}
                onClick={() => handleToggleSelection(feature, badFunc, setBadFunc)}
                className={`w-full text-xs font-medium flex items-center justify-center m-0 px-2 py-2 rounded-full border-2
                ${
                  badFunc.includes(feature)
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-black border-primary-900-light-20'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        ))}
      </div>

      {badFunc.some((v) => v !== '없음') && (
        <div className="flex flex-col gap-[0.5rem]">
          <div className="text-sm font-bold">왜 그렇게 생각하셨나요? (선택)</div>
          <textarea
            className="text-xs border border-primary-900-light-20 rounded-xl w-full h-[100px] px-4 py-4 resize-none focus:outline-none"
            placeholder="내용을 작성해주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-sm font-bold">Festino를 다시 사용하실 의향이 있으신가요?</div>
        <div className="flex gap-2">
          {['내년에도 사용하고 싶어요🥺', '없어도 괜찮아요😌'].map((option) => (
            <button
              key={option}
              onClick={() => {
                setReuse(reuse === option ? '' : option);
              }}
              className={`w-full text-xs font-bold flex items-center justify-center m-0 px-2 py-2 rounded-full border 
                ${
                  reuse === option
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-black border-primary-900-light-20'
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-sm font-bold">이 외에도 좋았던 점이나 불편했던 점을 작성해주세요! (선택)</div>
        <textarea
          className="text-xs border-2 border-primary-900-light-20 rounded-xl w-full h-[100px] px-4 py-4 resize-none focus:outline-none"
          placeholder="내용을 입력해주세요."
          value={feedback}
          onChange={(e) => setFeedBack(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-sm font-bold">이벤트 상품 수령에 필요한 개인정보를 입력해주세요!</p>
        <input
          className="w-36 h-10 text-xs border border-primary-900-light-20 rounded-xl px-4 py-4 resize-none focus:outline-none"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-36 h-10 text-xs border border-primary-900-light-20 rounded-xl px-4 py-4 resize-none focus:outline-none"
          placeholder="전화번호"
          inputMode="numeric"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />

        <input
          className="w-36 h-10 text-xs border border-primary-900-light-20 rounded-xl px-4 py-4 resize-none focus:outline-none"
          placeholder="학번"
          inputMode="numeric"
          value={studentNum}
          onChange={(e) => setStudentNum(e.target.value)}
        />
      </div>

      <PersonalInfo />

      <div className="flex gap-2">
        <button
          className="w-full text-primary-900 h-[45px] flex items-center justify-center rounded-full border-2 border-primary-900"
          onClick={() => handleSubmit()}
        >
          취소
        </button>
        <button
          className="w-full text-white bg-primary-900 h-[45px] flex items-center justify-center rounded-full"
          onClick={() => handleSubmit()}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Review;
