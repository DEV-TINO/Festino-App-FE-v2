import { useNavigate, useLocation } from 'react-router-dom';

const NoticeHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickBackArrow = () => {
    const currentPath = location.pathname;

    if (currentPath.startsWith('/notices/')) {
      navigate('/notices');
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="flex flex-row w-full h-[48px] text-secondary-700 bg-white justify-center items-center font-medium text-xl relative">
      <div
        className="w-[18px] h-[17px] bg-arrow-back-black bg-cover bg-no-repeat absolute left-[24px] cursor-pointer"
        onClick={handleClickBackArrow}
      ></div>
      <div>공지사항</div>
    </div>
  );
};

export default NoticeHeader;