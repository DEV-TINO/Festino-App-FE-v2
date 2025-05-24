import React from 'react';
import useBaseModal from '@/stores/baseModal';

const MenuImageModal: React.FC = () => {
  const { menuImageSrc } = useBaseModal();

  if (!menuImageSrc) return null;

  return (
    <div className="relative col-start-2 row-start-2 h-full dynamic-width rounded-3xl flex flex-col items-center px-10 py-8 gap-5">
      <img
        src={menuImageSrc || '/images/booth/booth-default-image.png'}
        alt="menu"
        className="rounded-xl shadow-xl"
      />
    </div>
  );
};

export default MenuImageModal;