import { CategoryItemProps } from '@/types/Booth.types';
import React from 'react';
import { sendGAEvent } from '@/utils/utils';

const GA_EVENTS = {
  // '야간부스': { eventName: 'click_night_booth', label: '야간부스' },
  주간부스: { eventName: 'click_day_booth', label: '주간부스' },
  푸드트럭: { eventName: 'click_food_truck', label: '푸드트럭' },
  편의시설: { eventName: 'click_facilities', label: '편의시설' },
} as const;

type CategoryName = keyof typeof GA_EVENTS;

const CategoryItem: React.FC<CategoryItemProps> = ({ id, name, onClick, isSelected }) => {
  const handleClick = () => {
    const gaEvent = GA_EVENTS[name as CategoryName];
    if (gaEvent) {
      sendGAEvent(gaEvent.eventName, gaEvent.label);
    }
    onClick?.(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`min-w-[88px] h-[44px] mr-3 rounded-full flex justify-center items-center cursor-pointer
        ${isSelected ? 'is-category-select-true' : 'is-category-select-false'}
      `}
      tabIndex={0}
      id={`category-item-${id}`}
    >
      {name}
    </div>
  );
};

export default CategoryItem;
