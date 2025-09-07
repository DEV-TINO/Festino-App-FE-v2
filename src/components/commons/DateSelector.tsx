import useDateStore from '@/stores/homes/dateStore';

const DateSelector: React.FC = () => {
  const { festivalDate, setDate } = useDateStore();

  return (
    <div className="flex px-5 pt-1 z-20 select-none w-full gap-2">
      {[2].map((date) => {
        const day = String(date + 8).padStart(2, '0');
        return (
          <div key={date} className="flex-1">
            <div
              className={`flex justify-center gap-2 xs:gap-4 sm:gap-5  py-2.5 px-0.5 rounded-full shadow-4xl text-xs items-center cursor-pointer ${
                festivalDate === date
                  ? 'bg-primary-700 text-white font-bold'
                  : 'text-primary-900-light-40 border-primary-700-light-16 border-2'
              }`}
              onClick={() => setDate(date)}
            >
              <div>DAY {date}</div>
              <div>25.09.{day}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
