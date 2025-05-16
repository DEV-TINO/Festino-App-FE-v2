import { useNavigate } from 'react-router-dom';
import useBaseModal from '@/stores/baseModal';
import useNavTapStore from '@/stores/headers/navTapStore';

const Header: React.FC = () => {
  const { openModal } = useBaseModal();
  const navigate = useNavigate();
  const { toggle } = useNavTapStore();

  const handleClickMainSymbol = () => {
    navigate('/', { replace: true });
  };

  const handleClickTinoSymbol = () => {
    openModal('loginModal');
  };

  return (
    <div className="w-full h-[58px] flex flex-row bg-white justify-between px-5 items-center">
      <div
        className="w-[22px] h-[22px] bg-header-navigation-bar bg-center bg-no-repeat bg-[length:22px_22px] cursor-pointer"
        onClick={toggle}
      />
      <div
        className="w-[68px] h-[36px] bg-header-festino-logo bg-center bg-no-repeat bg-[length:68px_36px] cursor-pointer"
        onClick={() => handleClickMainSymbol()}
      />
      <div
        className="w-[32px] h-[32px] bg-header-team-introduction bg-center bg-no-repeat bg-[length:32px_32px] cursor-pointer"
        onClick={() => handleClickTinoSymbol()}
      />
    </div>
  );
};

export default Header;
