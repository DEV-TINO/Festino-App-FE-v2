import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 최상단 이동
  }, [pathname]); // pathname이 바뀔 때마다 실행

  return null;
};

export default ScrollToTop;