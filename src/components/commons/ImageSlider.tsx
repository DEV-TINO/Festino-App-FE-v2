import { getBoothImageProps } from "@/hooks/getBoothImageProps";
import { ImageSliderProps } from "@/types/Booth.types";
import React, { useEffect, useRef, useState } from "react";

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = images.length > 0 ? images : [null];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slideWidth = container.clientWidth;
    container.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    if (currentIndex < imageList.length - 1) {
      setCurrentIndex((prev) => {
        const newIndex = prev + 1;
        scrollToSlide(newIndex);
        return newIndex;
      });
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => {
        const newIndex = prev - 1;
        scrollToSlide(newIndex);
        return newIndex;
      });
    }
  };

  // Touch 이벤트 처리
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      isDraggingRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const moveX = startXRef.current - e.touches[0].clientX;
      if (moveX > 50) {
        nextSlide();
        isDraggingRef.current = false;
      } else if (moveX < -50) {
        prevSlide();
        isDraggingRef.current = false;
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex]);

  return (
    <div className="relative">
      {images.length > 1 && (
        <div className="absolute right-6 top-6 flex justify-center items-center w-[72px] h-8 bg-white opacity-80 rounded-full text-base text-secondary-500 z-1">
          {currentIndex + 1} / {images.length}
        </div>
      )}
      <div
        ref={containerRef}
        className="snap-x snap-mandatory overflow-x-hidden w-full flex rounded-3xl outline outline-gray-200 outline-1"
      >
        {imageList.map((image, index) => {
          const { className, style } = getBoothImageProps(image);
          return (
            <div
              key={index}
              className={`snap-start min-w-full flex-shrink-0 aspect-square bg-contain bg-no-repeat bg-center ${className}`}
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;