import { ICON_URL_MAP } from "@/constants";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FloatingButton from "../events/FloatingButton";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedFooterIndex = React.useMemo(() => {
    if (pathname.includes('/notices')) {
      return 0;
    } 
    if (pathname.includes('/booths')) {
      return 2;
    }

    return ICON_URL_MAP.findIndex((item) => pathname === `/${item.router}`);
  }, [pathname]);

  const handleClickFooter = (index: number) => {
    navigate(`/${ICON_URL_MAP[index].router}`);
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
              className="flex flex-col items-center justify-center cursor-pointer"
              style={{ width: item.width }}
              onClick={() => handleClickFooter(index)}
            >
              <IconComponent isActive={isActive} />
              <div className={`text-2xs ${isActive ? 'text-primary-700' : 'text-secondary-100'}`}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Footer;