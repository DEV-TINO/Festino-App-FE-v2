import TimeTableBanner from './TimeTableBanner';
import TimeTable from './TimeTable';
import DateSelector from '../commons/DateSelector';

const TimeTableTab: React.FC = () => {
  return (
    <div className="flex flex-col">
      <TimeTableBanner />
      <DateSelector />
      <div className="py-1 px-4 pt-6">
        <TimeTable />
      </div>
    </div>
  );
};

export default TimeTableTab;