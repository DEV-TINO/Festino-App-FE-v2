const HomeBanner: React.FC = () => {
  return (
    <div className="relative select-none">
      <div className="w-full h-full min-h-[251px] sm:min-h-[290px] bg-home-banner bg-cover bg-no-repeat bg-right-top relative">
        <div className="absolute top-6 right-3.5 w-auto h-auto">
          <div className="font-jalnan2 text-xs text-white  drop-shadow-md">Festion와 함께하는 2025년</div>
          <div className="font-jalnan2 text-3xl text-white  drop-shadow-md text-transparent to-100% bg-clip-text text-right">
            한국공대2025 축제
          </div>
        </div>
      </div>
      <div className="w-full rounded-t-3xl bg-white h-[34px] absolute top-[220px] sm:top-[256px]" />
    </div>
  );
};

export default HomeBanner;
