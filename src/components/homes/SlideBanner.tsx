import IconPolygon from '@/icons/homes/IconPolygon';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SlideBanner: React.FC = () => {
  const navigate = useNavigate();
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 2;

  let startX = 0;
  let isDragging = false;

  const handleClickMoveBooth = () => {
    navigate('/booths');
  };

  // const handleClickMoveTabling = () => {
  //   navigate('/reserve');
  // };

  const handleClickMoveTimeTable = () => {
    navigate('/timetable');
  };

  const handleTouchStart = (event: TouchEvent) => {
    startX = event.touches[0].clientX;
    isDragging = true;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging) return;
    const touchX = event.touches[0].clientX;
    const moveX = startX - touchX;

    if (moveX > 50) {
      nextSlide();
      isDragging = false;
    } else if (moveX < -50) {
      prevSlide();
      isDragging = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const slider = sliderContainerRef.current;
    if (!slider) return;

    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      className="relative select-none rounded-3xl overflow-hidden w-full h-[178px] border-primary-900-light-16 border-1"
      ref={sliderContainerRef}
    >
      <div
        className="flex transition-transform duration-500 ease"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div
          className="min-w-full min-h-[178px] bg-slide-banner-1 bg-cover bg-no-repeat bg-left-top relative cursor-pointer"
          onClick={handleClickMoveTimeTable}
        >
          <div className="absolute top-6 right-4">
            <div className="text-right pt-1 px-0.5 font-blackhansans text-lg text-white drop-shadow-banner-text leading-none">
              한눈에 보는 축제 공연 정보
              <br />
              동아리 공연 타임테이블
            </div>
          </div>
          <div className="absolute top-[72px] right-4">
            <div className="flex gap-2 px-[10px] py-1 items-center justify-center text-banner font-pretendard font-bold text-[10px] bg-white rounded-full border-white border-2 cursor-pointer leading-none">
              <IconPolygon />
              <span>타임테이블 탭으로 이동</span>
            </div>
          </div>
        </div>

        <div
          className="min-w-full min-h-[178px] bg-slide-banner-2 bg-cover bg-no-repeat bg-left-top relative cursor-pointer"
          onClick={handleClickMoveBooth}
        >
          <div className="absolute top-6 right-4">
            <div className="text-right pt-1 px-0.5 font-blackhansans text-lg text-white drop-shadow-banner-text leading-none">
              티노가 알려줄게 !
              <br />
              가을맞이 동아리 홍보 부스
            </div>
          </div>
          <div className="absolute top-[72px] right-4">
            <div className="flex gap-2 px-[10px] py-1 items-center justify-center text-banner font-pretendard font-bold text-[10px] bg-white rounded-full border-white border-2 cursor-pointer leading-none">
              <IconPolygon />
              <span>부스 탭으로 이동</span>
            </div>
          </div>
        </div>

        {/* <div
          className="min-w-full min-h-[178px] bg-slide-banner-3 bg-cover bg-no-repeat bg-center relative cursor-pointer"
          onClick={handleClickMoveTimeTable}
        >
          <div className="absolute top-5 left-4 flex flex-col items-start">
            <div className="px-[18px] py-0.5 font-pretendard text-xs text-primary-700 font-bold bg-white rounded-full">
              축제의 꽃! 다양한 공연
            </div>
            <div className="pt-1 px-0.5 font-pretendard text-base text-white">한눈에 보는 축제 공연 정보!</div>
            <div className="px-0.5 leading-none font-bold font-pretendard text-base text-white">'공연 타임테이블'</div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="text-white font-pretendard font-bold text-xs px-4 py-1.5 rounded-full border-white border-2 cursor-pointer">
              타임테이블 탭으로 이동 -&gt;
            </div>
          </div>
        </div> */}
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`w-1.5 h-1.5 rounded-full border-1 ${
              currentIndex === index ? 'bg-primary-700 border-white' : 'bg-white border-primary-700'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlideBanner;
