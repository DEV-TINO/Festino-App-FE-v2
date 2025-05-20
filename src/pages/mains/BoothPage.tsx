import BoothItem from '@/components/booths/BoothItem';
import BoothMap from '@/components/booths/BoothMap';
import CategoryItem from '@/components/booths/CategoryItem';
import { BOOTH_CATEGORY, BOOTH_TYPE } from '@/constants';
import { getBoothImageProps } from '@/hooks/getBoothImageProps';
import { useBoothStore } from '@/stores/booths/boothStore';
import { Booth } from '@/types/Booth.types';
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const BoothPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    boothListAll,
    boothListNight,
    boothListDay,
    boothListFood,
    boothListFacility,
    getBoothList,
    getBoothDetail,
    selectBoothCategory,
    setSelectBoothCategory,
  } = useBoothStore();

  const boothLists = [boothListAll, boothListNight, boothListDay, boothListFood, boothListFacility];

  const currentBoothList = boothLists[selectBoothCategory];

  const handleScrollToSelectedCategory = useCallback(() => {
    const container = document.getElementById('category-container');
    const targetItem = document.getElementById(`category-item-${selectBoothCategory}`);

    if (container && targetItem) {
      const scrollLeft = targetItem.offsetLeft - container.clientWidth / 2 + targetItem.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectBoothCategory]);

  const handleClickBoothItem = (type: string, id: string) => {
    getBoothDetail(type, id);

    const boothType = BOOTH_TYPE.find((item) => {
      if (item.category === type) {
        return item.type;
      } else {
        return;
      }
    });

    navigate(`/booths/${boothType?.type}/${id}`);
  };

  useEffect(() => {
    getBoothList();
    handleScrollToSelectedCategory();
  }, [handleScrollToSelectedCategory]);

  return (
    <>
      {/* 배너 */}
      <div className="relative">
        <div className="w-full h-[220px] xs:h-[255px] sm:h-[295px] bg-booth-banner bg-no-repeat bg-cover z-1">
          <div className="absolute w-auto h-auto top-[60px] dynamic-padding sm:top-[72px]">
            <div className="bg-gradient-to-b text-white  drop-shadow-md bg-clip-text text-transparent font-jalnan2 text-md xs:text-md sm:text-[19px]">
              티노와 함께
            </div>
            <div className="bg-gradient-to-b text-white  drop-shadow-md bg-clip-text text-transparent font-jalnan2 text-2xl xs:text-2xl sm:text-3xl">
              축제 부스 알아보기
            </div>
          </div>
        </div>
        <div className="w-full h-5 bg-white rounded-t-3xl absolute z-2 bottom-[-2px]"></div>
      </div>

      {/* 부스 지도 */}
      <BoothMap />

      {/* 부스 카테고리 */}
      <div
        id="category-container"
        className="w-full overflow-x-auto flex scrollbar-hide booth-category-container-padding"
      >
        {BOOTH_CATEGORY.map((item) => (
          <CategoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            onClick={(id) => setSelectBoothCategory(id)}
            isSelected={selectBoothCategory === item.id}
          />
        ))}
      </div>

      {/* 부스 정보 목록 */}
      <div className="w-full pb-20 dynamic-padding">
        {!currentBoothList || currentBoothList.length === 0 ? (
          <div className="w-full h-[160px] bg-white shadow-4xl flex flex-col justify-between items-center rounded-2.5xl border border-primary-700">
            <div className="pt-5 font-semibold">부스 정보가 없습니다</div>
            <div className="w-[220px] h-[100px] bg-error-half bg-cover" />
          </div>
        ) : (
          currentBoothList.map((booth: Booth) => (
            <BoothItem
              key={booth.boothId}
              booth={booth}
              onClick={() => handleClickBoothItem(booth.adminCategory, booth.boothId)}
              getImageProps={getBoothImageProps}
            />
          ))
        )}
      </div>
    </>
  );
};

export default BoothPage;
