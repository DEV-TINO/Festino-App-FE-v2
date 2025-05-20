import React from 'react';
import { truncateText } from '@/utils/utils';
import StateLabel from '@/components/booths/StateLabel';
import { BoothItemProps } from '@/types/Booth.types';

const BoothItem: React.FC<BoothItemProps> = ({ booth, onClick, getImageProps }) => {
  const boothImageProps = getImageProps(booth.boothImage);

  return (
    <div className="pb-2 cursor-pointer" onClick={() => onClick(booth.adminCategory, booth.boothId)}>
      <div className="w-full h-[160px] bg-white shadow-4xl flex flex-row justify-between items-center rounded-2.5xl border border-primary-700-light px-4 py-3">
        <div className="w-[222px] h-full flex flex-col justify-between pr-1">
          <div>
            <div className="px-2 py-1 w-fit flex justify-center text-center rounded-full border border-primary-700 text-primary-700 text-3xs font-semibold">
              #{booth.adminCategory}
            </div>
            <div>
              <div className="py-1.5 text-[15px] font-semibold">{booth.boothName}</div>
              <div className="pb-2 text-2xs text-secondary-500">{truncateText(booth.boothIntro, 50)}</div>
            </div>
          </div>
          <div className="flex flex-row">
            <StateLabel isState={booth.isOpen}>{booth.isOpen ? '운영중' : '준비중'}</StateLabel>
            <div className="ml-1 px-2 py-1 w-fit flex justify-center text-center items-center text-3xs text-secondary-500 bg-tag rounded-full">
              <img className="mr-1 w-2 h-2 flex justify-center" src="/icons/booths/clock.svg" alt="clock" />
              <div>
                {booth.openTime} ~ {booth.closeTime}
              </div>
            </div>
          </div>
        </div>
        <div className="w-32 min-w-[128px] h-32 flex justify-center items-center">
          <div
            className={`w-full h-full rounded-2.5xl border bg-cover bg-center ${boothImageProps.className}`}
            style={boothImageProps.style}
          />
        </div>
      </div>
    </div>
  );
};

export default BoothItem;
