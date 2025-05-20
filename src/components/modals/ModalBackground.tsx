import React, { useEffect, FC } from 'react';
import useBaseModal from '@/stores/baseModal';

interface IModalBackgroundProps {
  children: React.ReactNode;
}

const ModalBackground: FC<IModalBackgroundProps> = ({ children }) => {
  const { closeModal } = useBaseModal();

  const preventScroll = () => {
    document.documentElement.style.overflow = 'hidden';
  };

  const allowScroll = () => {
    document.documentElement.style.overflow = 'auto';
  };

  useEffect(() => {
    preventScroll();
    return () => {
      allowScroll();
    };
  }, []);

  return (
    <div onClick={closeModal} className="fixed inset-0 z-[500px] bg-black/60 flex overflow-hidden items-center justify-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full overflow-y-auto grid grid-cols-[auto_1fr_auto] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] place-items-center"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalBackground;
