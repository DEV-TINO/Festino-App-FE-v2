import ClubDetail from './ClubDetail';
import TalentDetail from './TalentDetail';
import { openNewTap } from '@/utils/utils';
import { COUNCIL_URL } from '@/constants';
import { useTimetableStore } from '@/stores/homes/timetableStore';
import { useDateStore } from '@/stores/homes/dateStore';
import { useEffect, useMemo } from 'react';

const TimeTable: React.FC = () => {
  const { clubData, talentData, getClubTimetable, getTalentTimetable } = useTimetableStore();
  const { festivalDate } = useDateStore();

  const visibleFestivalDates = useMemo(() => {
    const now = new Date();

    if (now >= new Date('2025-05-28T00:00:00')) {
      return [1, 2, 3];
    } else if (now >= new Date('2025-05-27T00:00:00')) {
      return [1, 2];
    } else if (now >= new Date('2025-05-26T00:00:00')) {
      return [1];
    } else {
      return [];
    }
  }, []);

  useEffect(() => {
    getClubTimetable(festivalDate);
    getTalentTimetable(festivalDate);
  }, [festivalDate]);

  const clubs = clubData ?? [];
  const talents = talentData ?? [];

  const isEmpty = clubs.length === 0 && (!visibleFestivalDates.includes(festivalDate) || talents.length === 0);

  return (
    <div className="w-full select-none pb-20">
      <div className="flex flex-col items-center border-1 border-primary-900-light-16 rounded-3xl py-5 shadow-4xl">
        <div className="text-gray-400 text-2xs pb-4">* 주최측의 사정에 따라 일정이 달라질 수 있습니다.</div>
        <div className="px-5 pb-5">
          <div className="w-[300px] xs:w-[350px] sm:w-[390px] py-2 text-white bg-primary-700 rounded-full flex justify-center">
            DAY {festivalDate} 공연 타임테이블
          </div>
        </div>

        {clubData?.map((club, index) => (
          <div key={index} className="flex h-full w-full justify-center">
            <div className="flex flex-col items-center text-secondary-700 gap-[162px] pt-1 mt-[-9px]">
              <div className="text-secondary-700">
                {club.showStartTime} ~ {club.showEndTime}
              </div>
            </div>
            <div className="pt-3 pl-4 sm:pl-7 pr-3 xs:pr-4 sm:pr-7">
              <div className="border-2 border-primary-900-light-60 w-0 border-dashed flex flex-col items-center pb-40 mt-[-10px]">
                <div
                  className={`w-4 h-4 mt-[-5px] rounded-full flex items-center justify-center bg-primary-900-light-22`}
                >
                  <div className={`w-2 h-2 rounded-full bg-primary-900`} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <ClubDetail key={index} club={club} />
            </div>
          </div>
        ))}

        {visibleFestivalDates.includes(festivalDate) &&
          talentData.map((talent, index) => (
            <div key={index} className="flex h-full w-full justify-center">
              <div className="flex flex-col items-center text-secondary-700 gap-[162px] pt-1 mt-[-9px]">
                <div className="text-secondary-700 text-sm w-[90px]">
                  {talent.showStartTime} ~ {talent.showEndTime}
                </div>
              </div>
              <div className="pt-3 pl-4 sm:pl-7 pr-3 xs:pr-4 sm:pr-7">
                <div className="border-2 border-primary-900-light-60 w-0 border-dashed flex flex-col items-center pb-40 mt-[-10px]">
                  <div
                    className={`w-4 h-4 mt-[-5px] rounded-full flex items-center justify-center bg-primary-900-light-22`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-primary-900`} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <TalentDetail key={index} talent={talent} />
              </div>
            </div>
          ))}

        {isEmpty && (
          <div className="text-center w-full h-full flex flex-col gap-10 px-8 pt-5 items-center">
            <div className="flex flex-col">
              <span className="text-secondary-700 font-bold">현재 공연 정보가 없습니다.</span>
              <span className="text-secondary-500 font-normal text-xs">추후 업데이트 예정입니다.</span>
            </div>
            <div className="bg-error-full bg-cover bg-center bg-no-repeat w-[250px] aspect-[35/31] mx-auto shrink-0"></div>
          </div>
        )}

        {!isEmpty && (
          <div className="text-center flex flex-col gap-2 pt-4">
            <p className="text-primary-700 text-xs">자세한 공연 정보가 궁금하다면?</p>
            <button
              onClick={() => openNewTap(COUNCIL_URL)}
              className="text-white w-[240px] h-[30px] rounded-full bg-primary-700 text-sm"
            >
              동아리연합회 윤슬 인스타그램 바로가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;
