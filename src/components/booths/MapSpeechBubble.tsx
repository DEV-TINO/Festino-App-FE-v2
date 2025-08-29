import React from 'react';
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

  const isFacility = booth.adminCategory === '편의시설';

  return (
    <div className="px-[18px] py-[11px] speech-bubble shadow-5xl flex flex-col justify-center">
      <div className={`text-primary-900 font-semibold text-[11px] pb-1`}>
        {isFacility || booth.adminName.includes('총학생회') ? booth.boothName : booth.adminName}
        {isFacility || (!booth.adminName.includes('총학생회') && ' 부스')}
      </div>
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
    </div>
  );
};
