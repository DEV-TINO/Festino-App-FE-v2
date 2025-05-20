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
    <div onClick={closeModal} className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative dynamic-width h-auto bg-white rounded-2xl flex flex-col items-center select-none w-[80%] min-w-[330px] max-w-[500px] overflow-hidden"
      >
        {children}
      </div>
    </div>
  );

};

export default ModalBackground;
