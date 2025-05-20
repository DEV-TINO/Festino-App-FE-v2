import useDateStore from '@/stores/homes/dateStore';

const DateSelector: React.FC = () => {
  const { festivalDate, setDate } = useDateStore();

  return (
    <div className="flex px-5 pt-1 justify-between z-20 select-none ">
      {[1, 2, 3].map((date) => (
        <div key={date}>
          <div
            className={`flex justify-center gap-2 w-[105px] xs:gap-4 xs:w-[122px] sm:gap-5 sm:w-[140px] py-2.5 px-0.5 rounded-full shadow-4xl text-xs items-center cursor-pointer ${
              festivalDate === date
                ? 'bg-primary-700 text-white font-bold'
                : 'text-primary-700 font-normal border-primary-700-light border-1'
            }`}
            onClick={() => setDate(date)}
          >
            <div>DAY {date}</div>
            <div>25.05.{date + 25}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
