import React from 'react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';
import { ReviewProps } from '@/types/Review.types';
import { submitReview } from '@/stores/events/reviewStore';
import { formatPhoneNum } from '@/utils/utils';
import EventPersonalInfo from '../commons/EventPersonalInfo';

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
  const [isSubmit, setIsSubmit] = useState(false);

  const isAgreed = usePersonalInfoStore((state) => state.isAgreed);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatPhoneNumber(rawValue);
    setPhoneNum(formatted);
  };

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filtered = e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣 ]/g, '');
    if (filtered.length > 5) {
      filtered = filtered.slice(0, 5);
    }
    setName(filtered);
  };

  const handleToggleSelection = (
    option: string,
    selectedList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const isNone = option === '없음';

    if (isNone) {
      setter(selectedList.includes('없음') ? [] : ['없음']);
    } else {
      const filteredList = selectedList.filter((item) => item !== '없음');
      if (selectedList.includes(option)) {
        setter(filteredList.filter((item) => item !== option));
      } else {
        setter([...filteredList, option]);
      }
    }
  };

  const handleSubmit = async () => {
    if (isSubmit) return;
    setIsSubmit(true);

    if (
      rating === 0 ||
      goodFunc.length === 0 ||
      badFunc.length === 0 ||
      reuse === '' ||
      !isAgreed
    ) {
      Swal.fire({
        icon: 'warning',
        title: '필수 항목을 모두 입력해주세요!',
        confirmButtonText: '확인',
      });
      setIsSubmit(false);
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
      phoneNum: formatPhoneNum(phoneNum),
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
    } finally {
      setIsSubmit(false);
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
  };

  const featureOptions = ['부스 위치 안내', '공연 정보 안내', '주문 기능', '예약 기능', '조회 기능', '없음'];

  const chunkArray = (arr: string[], size: number) =>
    arr.reduce((acc: string[][], _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userPhoneNum = localStorage.getItem('userPhoneNum');
    if (userName && userPhoneNum) {
      setName(userName);
      setPhoneNum(userPhoneNum);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-sm font-bold">Festino 서비스가 얼마나 만족스러웠나요?</div>
        <div className="flex items-center">
          <div className="flex">
            {stars.map((star) => (
              <img
                key={star}
                src={rating >= star ? '/icons/events/full-star.svg' : '/icons/events/empty-star.svg'}
                className="h-6 mr-1.5 cursor-pointer"
                onClick={() => setRating((prev) => (prev === star ? 0 : star))}
              />
            ))}
          </div>
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
            className="touch-action: manipulation text-xs border border-primary-900-light-20 rounded-xl w-full h-[100px] px-4 py-4 resize-none focus:outline-none"
            placeholder="내용을 작성해주세요."
            value={reason}
            maxLength={1000}
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
              className={`w-full text-xs flex items-center justify-center m-0 px-2 py-2 rounded-full border 
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
          className="touch-action: manipulation text-xs border-2 border-primary-900-light-20 rounded-xl w-full h-[100px] px-4 py-4 resize-none focus:outline-none"
          placeholder="내용을 입력해주세요."
          maxLength={1000}
          value={feedback}
          onChange={(e) => setFeedBack(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-sm font-bold">이벤트 상품 수령에 필요한 개인정보를 입력해주세요!</p>
        <div className="flex items-center">
          <label className="text-xs text-secondary-500 w-16">이름</label>
          <input
            className="touch-action: manipulation w-full h-10 text-xs border border-primary-900-light-20 rounded-xl px-4 py-4 resize-none focus:outline-none"
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
            maxLength={5}
          />
        </div>
        <div className="flex items-center">
          <label className="text-xs text-secondary-500 w-16">전화번호</label>
          <input
            className="touch-action: manipulation w-full h-10 text-xs border border-primary-900-light-20 rounded-xl px-4 py-4 resize-none focus:outline-none"
            placeholder="전화번호"
            inputMode="numeric"
            value={phoneNum}
            onChange={handlePhoneChange}
            maxLength={13}
          />
        </div>
        <div className="flex items-center">
          <label className="text-xs text-secondary-500 w-16">학번</label>
          <input
            className="touch-action: manipulation w-full h-10 text-xs border border-primary-900-light-20 rounded-xl px-4 py-4 resize-none focus:outline-none"
            placeholder="학번"
            inputMode="numeric"
            value={studentNum}
            onChange={(e) => setStudentNum(e.target.value)}
            maxLength={10}
          />
        </div>
      </div>

      <EventPersonalInfo />

      <button
        className="w-full text-white bg-primary-900 h-[45px] flex items-center justify-center rounded-full"
        onClick={() => handleSubmit()}
        disabled={isSubmit}
      >
        제출
      </button>
    </div>
  );
};

export default Review;
