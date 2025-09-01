import { ICON_URL_MAP } from '@/constants';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FloatingButton from '../events/FloatingButton';
import useBaseModal from '@/stores/baseModal';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openModal } = useBaseModal();

  const selectedFooterIndex = React.useMemo(() => {
    if (pathname.includes('/notices')) {
      return 0;
    } else if (pathname.includes('/booths')) {
      return 2;
    } else if (pathname.includes('/reserve')) {
      return 3;
    }

    return ICON_URL_MAP.findIndex((item) => pathname === `/${item.router}`);
  }, [pathname]);

  const handleClickFooter = (index: number) => {
    const target = ICON_URL_MAP[index];
    if (!target) return;
    
    if (target.router === 'reserve') {
      // ModalPage에 등록해 둔 modalType과 반드시 동일해야 함
      openModal('tablingUnavailableModal');
      return;
    }

    // 동일 경로로의 불필요한 이동 방지(선택)
    const nextPath = `/${target.router}`;
    if (pathname !== nextPath) {
      navigate(nextPath);
    }
  };

  return (
    <>
      <div className="w-full h-[60px] bg-white flex items-center justify-around fixed bottom-0 border-t-secondary-100 border-t-1 limit-width">
        <FloatingButton />
        {ICON_URL_MAP.map((item, index) => {
          const IconComponent = item.component;
          const isActive = index === selectedFooterIndex;

          return (
            <div
              key={index}
              className="w-1/4 h-full flex flex-col items-center justify-center cursor-pointer"
              style={{ width: item.width }}
              onClick={() => handleClickFooter(index)}
            >
              <IconComponent isActive={isActive} />
              <div className={`text-2xs ${isActive ? 'text-primary-900' : 'text-secondary-100'}`}>{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Footer;
