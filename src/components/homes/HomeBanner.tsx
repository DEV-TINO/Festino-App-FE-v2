const HomeBanner: React.FC = () => {
  return (
    <div className="relative select-none">
      <div className="w-full h-full min-h-[251px] sm:min-h-[290px] bg-home-banner bg-cover bg-no-repeat bg-right-top relative">
        <div className="absolute top-10 right-3.5 w-auto h-auto">
          <div className="flex flex-col items-end">
            <div className="font-blackhansans text-xs text-white  drop-shadow-banner-text whitespace-pre">
              Festion와 함께하는 2025년{'  '}
            </div>
            <div className="leading-tight font-blackhansans text-3xl text-white  drop-shadow-banner-text text-transparent to-100% bg-clip-text text-right">
              한국공대 동아리 홍보전
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-t-3xl bg-white h-[34px] absolute top-[220px] sm:top-[256px]" />
    </div>
  );
};

export default HomeBanner;
