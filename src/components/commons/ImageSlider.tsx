import { getBoothImageProps } from "@/hooks/getBoothImageProps";
import { ImageSliderProps } from "@/types/Booth.types";
import { useState } from "react";

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = images.length > 0 ? images : [null];

  return (
    <div className="relative">
      {images.length > 1 && (
        <div className="absolute right-6 top-6 flex justify-center items-center w-[72px] h-8 bg-white opacity-80 rounded-full text-base text-secondary-500 z-1">
          {currentIndex + 1} / {images.length}
        </div>
      )}
      <div
        className="snap-x snap-mandatory overflow-x-scroll w-full flex rounded-3xl outline outline-gray-200 outline-1 scroll-smooth"
        onScroll={(e) => {
          const container = e.currentTarget;
          const newIdx = Math.round(container.scrollLeft / container.clientWidth);
          setCurrentIndex(newIdx);
        }}
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