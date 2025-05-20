import { FLOATING_SIZE, HIDE_PATHS } from '@/constants';
import useBaseModal from '@/stores/baseModal';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Corner = 'bottom-left' | 'bottom-right';

const FloatingButton: React.FC = () => {
  const translateHeights = ['translate-y-sub-btn-1', 'translate-y-sub-btn-2', 'translate-y-sub-btn-3'];

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const offset = useRef({ x: 0, y: 0 });
  const dragHistory = useRef(false);

  const { isModalOpen, openModal } = useBaseModal();

  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;

  const handleClickReviewEvent = () => {
    navigate('/review');
  };

  const handleClickUploadEvent = () => {
    navigate('/photo-board');
  };

  const handleClickQuizEvent = () => {
    openModal('quizModal');
  };

  const subButtons = [
    {
      icon: '/icons/events/review.svg',
      label: '리뷰 이벤트',
      onClick: () => handleClickReviewEvent(),
    },
    {
      icon: '/icons/events/eventphoto.svg',
      label: '사진 이벤트',
      onClick: () => handleClickUploadEvent(),
    },
    {
      icon: '/icons/events/quiz.svg',
      label: '실시간 퀴즈',
      onClick: () => handleClickQuizEvent(),
    },
  ];

  const H_MARGIN = 70;
  const W_MARGIN = 20;

  const handleClick = () => {
    if (dragHistory.current) return;
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setPosition({
      x: screenWidth - FLOATING_SIZE - W_MARGIN,
      y: 0,
    });
  }, []);

  const handleStart = useCallback(
    (clientX: number) => {
      setIsDrag(true);
      dragHistory.current = false;
      offset.current = {
        x: clientX - position.x,
        y: 0,
      };
    },
    [position],
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDrag) return;
      const dx = clientX - offset.current.x;
      const dy = clientY - offset.current.y;
      const distance = Math.hypot(dx - position.x, dy - position.y);
      if (distance > 5) {
        dragHistory.current = true;
      }
      setPosition({ x: dx, y: dy });
    },
    [isDrag, position],
  );

  const handleEnd = useCallback(() => {
    setIsDrag(false);

    const corners: Record<Corner, { x: number; y: number }> = {
      'bottom-left': { x: W_MARGIN, y: screenHeight - FLOATING_SIZE - H_MARGIN },
      'bottom-right': { x: screenWidth - FLOATING_SIZE - W_MARGIN, y: screenHeight - FLOATING_SIZE - H_MARGIN },
    };

    const closestCornerKey = (Object.entries(corners) as [Corner, { x: number; y: number }][]).reduce(
      (closestKey, [key, pos]) => {
        const currentDist = Math.hypot(position.x - pos.x, position.y - pos.y);
        const closestPos = corners[closestKey];
        const closestDist = Math.hypot(position.x - closestPos.x, position.y - closestPos.y);
        return currentDist < closestDist ? key : closestKey;
      },
      'bottom-right' as Corner,
    );

    setPosition(corners[closestCornerKey]);
  }, [position]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const mouseUp = () => handleEnd();

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [handleMove, handleEnd]);

  useEffect(() => {
    const touchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const touchEnd = () => handleEnd();

    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchend', touchEnd);
    return () => {
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
    };
  }, [handleMove, handleEnd]);

  useEffect(() => {
    const handleReposition = () => {
      handleEnd();
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition);
    };
  }, [handleEnd]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const floatingRoot = document.getElementById('floating-button-wrapper');

      if (floatingRoot && !floatingRoot.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (HIDE_PATHS.some((path) => location.pathname.startsWith(path))) return null;

  return (
    <div
      id="floating-button-wrapper"
      className={`absolute ${isModalOpen ? 'z-30' : 'z-40'}`}
      style={{ left: position.x, bottom: 80 }}
    >
      {subButtons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={`
    absolute left-1/2 -translate-x-1/2
    w-[58px] h-[58px] rounded-full
    bg-primary-700 text-white text-2xs font-bold
    flex flex-col items-center justify-center shadow-white-md
    transition-all duration-300 text-center overflow-hidden
    ${isOpen ? `opacity-100 ${translateHeights[idx]}` : 'opacity-0 translate-y-0'}
    ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
  `}
        >
          <img src={btn.icon} alt="icon" className="w-full h-full absolute top-0 left-0 object-cover z-0" />
          <span className="z-10 whitespace-nowrap translate-y-[-10px]">{btn.label}</span>
        </button>
      ))}

      <div
        onClick={handleClick}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        className={`
          relative
          flex items-center justify-center
          w-[60px] h-[60px] 
          rounded-full text-xs font-bold cursor-grab
          select-none touch-none
        `}
      >
        <img src='/icons/events/eventbutton.svg' alt="icon" className="w-full h-full absolute top-0 left-0 object-cover z-0" />
        EVENT
      </div>
    </div>
  );
};

export default FloatingButton;
