// 이미지 유무에 따라 스타일 변환
export const getBoothImageProps = (boothImage: string | null) => {
  if (!boothImage) {
    return {
      className: "bg-default",
      style: {},
    };
  }
  return {
    className: "",
    style: { backgroundImage: `url(${boothImage})` },
  };
};