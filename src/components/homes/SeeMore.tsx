import { useNavigate } from 'react-router-dom';

interface SeeMoreProps {
  componentName: string;
}

const SeeMore: React.FC<SeeMoreProps> = ({ componentName }) => {
  const navigate = useNavigate();

  const handleClickMoreButton = (name: string) => {
    if (name === '타임테이블') {
      navigate('/timetable');
    } else if (name === '공지사항') {
      navigate('/notices');
    } else {
      return;
    }
  };

  return (
    <div className="flex justify-between items-center px-5 pt-4 pb-3 select-none">
      <div className="text-xl font-semibold">{componentName}</div>
      <div className="flex items-center gap-0.5 cursor-pointer" onClick={() => handleClickMoreButton(componentName)}>
        <div className="text-secondary-300 text-xs">더보기</div>
        <div className="w-[12px] h-[12px] bg-angle-bracket bg-center bg-no-repeat bg-[length:12px_12px]" />
      </div>
    </div>
  );
};

export default SeeMore;