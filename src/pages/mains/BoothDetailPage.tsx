import { useNavigate, useParams } from 'react-router-dom';
import BoothMap from '@/components/booths/BoothMap';
import MenuItem from '@/components/booths/MenuItem';
import ImageSlider from '@/components/commons/ImageSlider';
import { useBoothStore } from '@/stores/booths/boothStore';
import { useEffect } from 'react';
import { BOOTH_TYPE, SLOGAN_MAP } from '@/constants';

const BoothDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { type, boothId } = useParams();
  const { boothDetail, getBoothDetail } = useBoothStore();

  // 부스 카테고리 받아오기
  const boothCategory = BOOTH_TYPE.find((item) => {
    if (item.type === type) {
      return item.category;
    } else {
      return;
    }
  });

  // 메인메뉴 필터링
  const getMainMenu = () => {
    const menuList = boothDetail?.menuList ?? [];

    const mainMenus = menuList.filter((item) => item.menuType === 0).map((item) => item.menuName);

    return mainMenus.join(', ');
  };

  // 서브메뉴 필터링
  const getSubMenu = () => {
    const menuList = boothDetail?.menuList ?? [];

    const mainMenus = menuList.filter((item) => item.menuType === 1).map((item) => item.menuName);

    return mainMenus.join(', ');
  };

  // 부스 페이지로 돌아가기
  const handleClickBoothDetailBack = () => {
    navigate('/booths');
  };

  // 슬로건 받아오기
  const getSlogan = () => SLOGAN_MAP[boothDetail?.adminCategory || ''] || '';

  // 부스 상세 정보 유지
  useEffect(() => {
    if (boothCategory && boothId) {
      getBoothDetail(boothCategory?.category, boothId);
    }
  }, []);

  // 부스 정보 없을 때
  if (!boothDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mt-4 text-center text-sm text-gray-600">부스 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 인스타그램으로 이동
  const handleClickInstagram = () => {
    if (boothDetail.instagram) {
      window.open(`https://www.instagram.com/${boothDetail.instagram}/`, '_blank');
    }
  };

  // 예약하기 페이지로 이동
  const handleRouterToReserve = () => {
    navigate(`/reserve/${boothDetail.boothId}`);
  };

  return (
    <div className="dynamic-bottom">
      {/* 배너 */}
      <div className="relative">
        <div className="w-full h-[220px] xs:h-[255px] sm:h-[295px] bg-booth-detail-banner bg-cover">
          <div
            onClick={handleClickBoothDetailBack}
            className="z-4 bg-arrow-back-white w-6 h-6 bg-no-repeat text-xl absolute top-[24px] left-[24px] bg-cover pointer-events-auto cursor-pointer"
          />
          {/* 슬로건 + 운영진 */}
          <div className="absolute w-auto h-auto dynamic-top dynamic-padding">
            <div className=" text-white drop-shadow-md bg-clip-text text-transparent font-jalnan2 text-md xs:text-md sm:text-[19px]">
              {getSlogan()}
            </div>
            <div className="font-jalnan2 text-2xl text-white drop-shadow-lg bg-clip-text text-transparent sm:text-3xl">
              {boothDetail.adminName ?? boothDetail.boothName}
            </div>
          </div>
        </div>
        <div className="w-full h-5 bg-white rounded-t-3xl absolute z-2 bottom-[-2px]"></div>
      </div>

      {/* 탭 정보 */}
      <div className="flex dynamic-padding items-center mt-4 pb-2">
        <div className="text-secondary-300 text-sm font-light">{boothDetail.adminCategory}</div>
        <div className="text-secondary-300 bg-arrow-forward bg-cover w-[14px] h-[14px] mx-2"></div>
        <div className="text-secondary-300 text-sm font-light">
          {boothDetail.adminName ? `${boothDetail.adminName} 부스` : boothDetail.boothName}
        </div>
      </div>

      {/* 지도 */}
      <BoothMap />

      {/* 위치, 운영시간 */}
      <div className="dynamic-padding py-4">
        <div className="w-full h-auto bg-tag rounded-2xl p-4">
          <div className="flex items-center pb-3">
            <div className="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">
              위치
            </div>
            <div className="pl-4 text-secondary-500 font-light text-xs">
              {boothDetail.location ?? boothDetail.adminCategory}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">
              운영시간
            </div>
            <div className="pl-4 text-secondary-500 font-light text-xs">
              {boothDetail.openTime} ~ {boothDetail.closeTime}
            </div>
          </div>
        </div>
      </div>

      {boothDetail.boothImage && (
        <>
          {/* 구분선 */}
          <div className="w-full h-3 bg-tag" />

          {/* 이미지 슬라이더 */}
          <div className="relative pt-[4.65%] px-[4.65%] pb-9">
            <ImageSlider images={boothDetail?.boothImage} />

            {/* 인스타그램 버튼 */}
            {boothDetail.instagram && (
              <div
                onClick={() => handleClickInstagram()}
                className="text-xs text-secondary-500 rounded-full w-fit h-[26px] flex items-center justify-center bg-tag gap-1 mt-6 px-3 cursor-pointer"
              >
                <div className="min-w-[16px] h-[16px] bg-instagram bg-center bg-no-repeat bg-[length:16px_16px]" />
                <div>{boothDetail.instagram}</div>
              </div>
            )}

            {/* 부스 소개글 */}
            <div className="pt-5 text-secondary-500 font-light break-words px-1 whitespace-pre-wrap">
              {boothDetail.boothIntro}
            </div>
          </div>
        </>
      )}

      {boothDetail.menuList?.length !== 0 && boothDetail.menuList && (
        <>
          {/* 구분선 */}
          <div className="w-full h-3 bg-tag" />

          {/* 메뉴 요약 */}
          <div className="dynamic-padding py-4">
            <div className="w-full h-auto bg-tag rounded-2xl p-4">
              <div className="flex items-center pb-3">
                <div className="min-w-[72px] w-[72px] h-[26px] flex justify-center items-center rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">
                  메인메뉴
                </div>
                <div className="pl-4 text-secondary-500 font-light text-xs">{getMainMenu()}</div>
              </div>
              <div className="flex items-center">
                <div className="min-w-[72px] w-[72px] h-[26px] flex justify-center items-center rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">
                  서브메뉴
                </div>
                <div className="pl-4 text-secondary-500 font-light text-xs">{getSubMenu()}</div>
              </div>
            </div>
          </div>

          {/* 메뉴 상세 목록 */}
          {boothDetail.menuList?.map((menu) => <MenuItem key={menu.menuId} menu={menu} />)}
        </>
      )}

      {boothDetail.isReservation && (
        <>
          {/* 구분선 */}
          <div className="w-full h-3 bg-tag" />

          {/* 예약  */}
          <div className="dynamic-padding">
            <div className="text-2xl font-semibold pb-3 pt-7">현재 대기중</div>
            <div className="border border-primary-100 mb-5 relative aspect-auto w-full h-[155px] xs:h-[171.3px] sm:h-[207px] bg-reservation-status bg-no-repeat bg-cover rounded-3xl">
              <div className="absolute right-8 xs:right-10 top-6 xs:top-8 sm:top-12 flex flex-col items-center">
                <div className="px-4 py-1 mb-2 w-fit h-fit rounded-full bg-white text-primary-700 font-bold">
                  대기중인 팀
                </div>
                <div className="flex items-end">
                  <div className="font-bold text-7xl text-white">{boothDetail.totalReservationNum ?? 0}</div>
                  <div className="pb-2 font-semibold text-xl text-white">팀</div>
                </div>
              </div>
            </div>
            <button
              onClick={handleRouterToReserve}
              className="w-full h-auto py-4 mb-3 shadow-3xl border-1 border-primary-700 rounded-full text-primary-700 text-base active:text-white active:bg-primary-700"
            >
              예약하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BoothDetailPage;
