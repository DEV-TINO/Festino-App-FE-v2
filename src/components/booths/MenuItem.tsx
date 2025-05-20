import React from 'react';
import StateLabel from '@/components/booths/StateLabel';
import { MenuItemProps } from '@/types/Booth.types';
import { priceToString } from '@/utils/utils';
import { useLocation } from 'react-router-dom';
import { getBoothImageProps } from '@/hooks/getBoothImageProps';

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
  const defaultOption = 0;
  const { pathname } = useLocation();

  const { className, style } = getBoothImageProps(menu.menuImage);

  return (
    <div key={menu.menuId} className="dynamic-padding">
      <div
        className={`w-full h-[120px] p-[13px] rounded-3xl shadow-4xl flex mb-[10px] ${
          menu.isSoldOut ? 'bg-gray-200 border border-gray-300' : 'bg-white border border-primary-700-light'
        }`}
      >
        {/* 이미지 영역 */}
        <div
          className={`min-w-[94px] max-w-[94px] h-full rounded-3xl border bg-cover bg-center bg-no-repeat ${className} ${
            menu.isSoldOut ? 'brightness-[0.95]' : ''
          }`}
          style={style}
        />

        {/* 텍스트 영역 */}
        <div className="w-[359px] h-full py-1">
          <div className="pl-[12px] h-full flex flex-col justify-between">
            <div className="pb-2">
              <div className="flex justify-between pb-1">
                <div className="text-[14px] font-semibold text-secondary-700">{menu.menuName}</div>
                <div className="flex flex-shrink-0">
                  {pathname.includes('night') && (
                    <div className="mr-1 flex items-center px-2 py-1 w-fit h-fit bg-secondary-50 text-secondary-500 text-3xs rounded-full">
                      {menu.menuType === defaultOption ? '메인 메뉴' : '서브 메뉴'}
                    </div>
                  )}
                  <StateLabel isState={!menu.isSoldOut}>{!menu.isSoldOut ? '판매중' : '준비중'}</StateLabel>
                </div>
              </div>
              <div className="w-full text-[10px] text-secondary-500 whitespace-pre-line">{menu.menuDescription}</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-secondary-700 text-[14px] font-semibold">{priceToString(menu.menuPrice)}</div>
                <div className="text-secondary-500 text-[14px]">원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
