import DateSelector from "../commons/DateSelector";
import SeeMore from "./SeeMore";
import ShowPreview from "./ShowPreview";
import SlideBanner from "./SlideBanner";
import { useNavigate } from 'react-router-dom';
import { TABS } from "@/constants";
import { useNoticeStore } from "@/stores/homes/noticeStore";
import { useEffect } from "react";
import { getRelativeTime } from "@/utils/utils";

const HomeTab: React.FC = () => {
  const navigate = useNavigate();
  const {mainNoticeData, getMainNotice } = useNoticeStore();

  const handleClickNotice = () => {
    if (mainNoticeData) navigate(`/notices/${mainNoticeData.noticeId}`);
  };

  useEffect(() => {
    getMainNotice();
  }, []);

  return (
    <div>
      <DateSelector></DateSelector>
      <SeeMore componentName={TABS.TIME_TABLE} />
      <div className="px-5 pb-4">
        <ShowPreview />
      </div>
      <SeeMore componentName={TABS.NOTICE} />
      {mainNoticeData && (
        <div className="px-5">
          <div
            className="py-3 select-none px-4 rounded-2xl border-primary-700-light border-1 shadow-4xl flex justify-between items-center cursor-pointer"
            onClick={() => handleClickNotice()}
          >
            <div className="flex">
              <div className="w-[57px] text-secondary-700 text-xs font-medium">Festino</div>
              <div className="text-secondary-500 text-xs font-normal">
                {mainNoticeData.title}
              </div>
            </div>
            <div className="text-secondary-700 text-2xs font-normal">
              {getRelativeTime(mainNoticeData.updateAt)}
            </div>
          </div>
        </div>
      )}
      <div className="px-5 pt-5 pb-20">
        <SlideBanner />
      </div>
    </div>
  );
};

export default HomeTab;