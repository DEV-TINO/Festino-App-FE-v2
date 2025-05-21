import React, { useRef, useState } from 'react';
import SearchPhoto from './SearchPhoto';
import UploadPhoto from './UploadPhoto';
import { TabType } from '@/types/Board.types';

const SLIDE_LIMIT = 100;

const BoardTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('사진 목록');
  const sliderContainer = useRef<HTMLDivElement>(null);

  const tabs: TabType[] = ['사진 목록', '사진 업로드'];

  const toggleTab = (type: TabType) => {
    setActiveTab(type);
    const percentage = type === '사진 목록' ? 0 : -SLIDE_LIMIT;
    moveSlider(percentage);
  };

  const moveSlider = (percentage: number) => {
    if (sliderContainer.current) {
      sliderContainer.current.style.transition = 'transform 0.5s ease';
      sliderContainer.current.style.transform = `translateX(${percentage}%)`;
    }
  };

  return (
    <div className="relative select-none">
      <div className="dynamic-padding h-auto w-full bg-white z-10 mt-2">
        <div className="flex gap-[30px]">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="w-[100px] h-[32px] flex flex-col items-center justify-between cursor-pointer relative"
              onClick={() => toggleTab(tab)}
            >
              <div className={`text-xl ${activeTab === tab ? 'font-bold' : 'text-secondary-300'}`}>{tab}</div>
              {activeTab === tab && <div className="w-[100px] h-1 rounded-full bg-primary-900 absolute top-8"></div>}
            </div>
          ))}
        </div>
      </div>

      <div ref={sliderContainer} className="w-full">
        <div className="flex flex-row w-[200%]">
          <SearchPhoto />
          <UploadPhoto />
        </div>
      </div>
    </div>
  );
};

export default BoardTabs;
