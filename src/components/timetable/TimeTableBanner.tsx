const TimeTableBanner: React.FC = () => {
  return (
    <div className="relative select-none">
      <div className="w-full h-full min-h-[251px] sm:min-h-[290px] bg-timetable-banner bg-cover bg-no-repeat bg-right-top relative">
        <div className="absolute top-[83px] right-3.5 flex flex-col items-end">
          <div className="font-jalnan2 text-xs text-white drop-shadow-md">한눈에 보는 축제 공연 정보!</div>
          <div className="font-jalnan2 text-3xl bg-gradient-to-t text-white  drop-shadow-md">공연 타임테이블</div>
        </div>
      </div>
      <div className="w-full rounded-t-3xl bg-white h-[34px] absolute top-[220px] sm:top-[256px]" />
    </div>
  );
};

export default TimeTableBanner;
