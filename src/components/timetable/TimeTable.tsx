import TimeTableDetail from './TimeTableDetail';
import { openNewTap } from '@/utils/utils';
import { COUNCIL_URL } from '@/constants';
import { useTimetableStore } from '@/stores/homes/timetableStore';
import { useDateStore } from '@/stores/homes/dateStore';
import { useEffect } from 'react';

const TimeTable: React.FC = () => {
  const { clubData, getClubTimetable } = useTimetableStore();
  const { festivalDate } = useDateStore();
  const isShowing = true;

  useEffect(() => {
    getClubTimetable(festivalDate);
  }, [festivalDate]);

  const isShowingTime = () => (isShowing ? 'text-secondary-700' : 'text-secondary-100');

  const isShowingPin = () => (isShowing ? 'bg-primary-700' : 'bg-secondary-100');

  const isShowingBgPin = () => (isShowing ? 'bg-primary-700-light' : 'bg-secondary-50');

  return (
    <div className="w-full select-none pb-20">
      <div className="flex flex-col items-center border-1 border-primary-700-light rounded-3xl py-5 shadow-4xl">
        <div className="text-gray-400 text-2xs">* 주최측의 사정에 따라 일정이 달라질 수 있습니다.</div>
        <div className="px-5 pb-5">
          <div className="w-[300px] xs:w-[350px] sm:w-[390px] py-2 text-white bg-primary-700 rounded-full flex justify-center">
            DAY {festivalDate} 공연 타임테이블
          </div>
        </div>

        {clubData.map((club, index) => (
          <div key={index} className="flex h-full w-full justify-center">
            <div className="flex flex-col items-center text-secondary-700 gap-[162px] pt-1 mt-[-9px]">
              <div className={isShowingTime()}>
                {club.showStartTime} ~ {club.showEndTime}
              </div>
            </div>
            <div className="pt-3 pl-4 sm:pl-7 pr-3 xs:pr-4 sm:pr-7">
              <div className="border-2 border-primary-700 w-0 border-dashed flex flex-col items-center pb-40 mt-[-10px]">
                <div className={`w-4 h-4 mt-[-5px] rounded-full flex items-center justify-center ${isShowingBgPin()}`}>
                  <div className={`w-2 h-2 rounded-full ${isShowingPin()}`} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <TimeTableDetail key={index} club={club} />
            </div>
          </div>
        ))}

        <div className="text-center flex flex-col gap-2 pt-4">
          <p className="text-primary-700 text-xs">자세한 공연 정보가 궁금하다면?</p>
          <button
            onClick={() => openNewTap(COUNCIL_URL)}
            className="text-white w-[232px] h-[30px] rounded-full bg-primary-700 text-sm"
          >
            총학생회 drama 인스타그램 바로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
