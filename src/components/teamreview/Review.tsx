import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';

const Review: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [goodFunc, setGoodFunc] = useState('');
  const [badFunc, setBadFunc] = useState('');
  const [reason, setReason] = useState('');
  const [reuse, setReuse] = useState('');
  const [feedback, setFeedBack] = useState('');

  const handleRating = (rate: number) => {
    setRating(Math.round(rate * 2) / 2);
  };

  const handleSubmit = () => {
    resetReview();

    Swal.fire({
      title: 'Thank you for your review!',
      text: 'We will do our best to improve our service.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const resetReview = () => {
    setRating(0);
    setGoodFunc('');
    setBadFunc('');
    setReason('');
    setReuse('');
    setFeedBack('');
  };

  const featureOptions = ['부스 위치 안내', '공연 정보 안내', '주문 기능', '예약 기능', '없음'];

  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-[0.95rem] font-bold">1. Festino 서비스가 얼마나 만족스러웠나요?</div>
        <div className="flex items-center">
          <Rating
            onClick={handleRating}
            initialValue={rating}
            transition
            size={35}
            fillColor="#0073F0"
            emptyColor="rgba(0, 115, 240, 0.3)"
            SVGstyle={{ display: 'inline-block' }}
            className="flex"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-[0.95rem] font-bold">2. Festino를 사용하면서 좋았던 기능은 무엇이었나요?</div>
        <div className="flex gap-[10px]">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              onClick={() => setGoodFunc(feature)}
              className={`text-[11px] font-bold flex items-center justify-center m-0 px-2 py-2 rounded-2.5xl border 
                ${
                  goodFunc === feature
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-primary-900 border-primary-900'
                }`}
              style={{ backgroundColor: goodFunc === feature ? '#ddd' : '#fff' }}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-[0.95rem] font-bold">
          3. Festino를 사용하면서 개선이 필요하다고 느낀 기능은 무엇이었나요?
        </div>
        <div className="flex gap-[10px]">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              onClick={() => setBadFunc(feature)}
              className={`text-[11px] font-bold flex items-center justify-center m-0 px-2 py-2 rounded-2.5xl border 
                ${
                  badFunc === feature
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-primary-900 border-primary-900'
                }`}
              style={{ backgroundColor: badFunc === feature ? '#ddd' : '#fff' }}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      {badFunc !== '없음' && badFunc !== '' && (
        <div className="flex flex-col gap-[0.5rem]">
          <div className="text-[0.95rem] font-bold">3-1. 왜 그렇게 생각하셨나요?</div>
          <textarea
            className="text-xs border border-gray-200 rounded-lg w-full px-4 py-4 resize-none"
            placeholder="내용을 작성해주세요."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-[0.95rem] font-bold">4. Festino를 다시 사용하실 의향이 있으신가요?</div>
        <div className="flex gap-[10px]">
          {['네! 내년에도 사용하고 싶어요🥺', '없어도 괜찮아요😌'].map((option) => (
            <button
              key={option}
              onClick={() => setReuse(option)}
              className={`text-xs font-bold flex items-center justify-center m-0 px-2 py-2 rounded-2.5xl border 
                ${
                  reuse === option
                    ? 'bg-primary-900 text-white border-primary-900'
                    : 'bg-white text-primary-900 border-primary-900'
                }`}
              style={{ backgroundColor: reuse === option ? '#ddd' : '#fff' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <div className="text-[0.95rem] font-bold">5. 이 외에도 좋았던 점이나 불편했던 점을 작성해주세요!</div>
        <textarea
          className="text-xs border border-gray-200 rounded-lg w-full px-4 py-4 h-[200px] resize-none"
          placeholder="내용을 작성해주세요."
          value={feedback}
          onChange={(e) => setFeedBack(e.target.value)}
        />

        <button
          className="text-primary-900 w-[112px] h-[33px] flex items-center justify-center rounded-lg border border-gray-200 gap-2 py-4"
          onClick={() => handleSubmit()}
        >
          <img src="/images/teamreview/send.svg" /> 보내기
        </button>
      </div>
    </div>
  );
};

export default Review;
