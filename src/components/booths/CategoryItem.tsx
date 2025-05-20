import { CategoryItemProps } from "@/types/Booth.types";
import React from "react";

const CategoryItem: React.FC<CategoryItemProps> = ({ id, name, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick?.(id)}
      className={`min-w-[88px] h-[44px] mr-2 rounded-full flex justify-center items-center cursor-pointer
        ${isSelected
          ? 'is-category-select-true'
          : 'is-category-select-false'}
      `}
      tabIndex={0}
      id={`category-item-${id}`}
    >
      {name}
    </div>
  );
};

export default CategoryItem;