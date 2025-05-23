import React from 'react';
import { openNewTap } from '@/utils/utils';
import { MapSpeechBubbleProps } from '@/types/Booth.types';

export const MapSpeechBubble: React.FC<MapSpeechBubbleProps> = ({ booth }) => {
  if (!booth?.boothId) {
    return (
      <div className="px-[18px] py-[11px] speech-bubble shadow-5xl flex flex-col justify-center items-center">
        <div className="text-primary-800 font-semibold text-[11px]">부스 정보 미등록</div>
        <div className="bg-tino-error-half bg-cover w-[75px] h-[40px]"></div>
      </div>
    );
  }

  const isStudentCouncil = booth.boothName.includes('총학생회');
  const isFacility = booth.adminCategory === '편의시설';
  const isBoothCategory = booth.adminCategory.includes('부스');

  return (
    <div className="px-[18px] py-[11px] speech-bubble shadow-5xl flex flex-col justify-center">
      <div
        className={`text-primary-700 font-semibold text-[11px] pb-1 ${
          isStudentCouncil ? 'flex justify-center items-center' : ''
        }`}
      >
        {isFacility ? booth.boothName : booth.adminName}
        {isBoothCategory && ' 부스'}
      </div>

      {isStudentCouncil ? (
        <div 
          className="w-full flex justify-center items-center"
          onClick={() => openNewTap("https://www.instagram.com/tukorea_drama/")}
        >
          <div className="text-[8px] text-secondary-500 rounded-full w-fit h-fit px-4 py-[1px] flex items-center justify-center bg-instagram-bg gap-1">
            @tukorea_drama
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div className="w-[10px] h-[10px] bg-[url('/icons/booths/location_on.svg')]" />
            <div className="text-[8px] pl-[2px] text-secondary-500">{booth.location ?? '교내'}</div>
          </div>
          <div className="flex items-center">
            <div className="w-[10px] h-[10px] bg-[url('/icons/booths/alarm.svg')]" />
            <div className="text-[8px] pl-[2px] text-secondary-500">
              {booth.openTime} ~ {booth.closeTime}
            </div>
          </div>
        </>
      )}
    </div>
  );
};