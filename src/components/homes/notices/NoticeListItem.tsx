import { useNavigate } from "react-router-dom";
import { getRelativeTime } from "@/utils/utils";
import { NoticeListItemProps } from "@/types/Notice.types";
import PinIcon from "@/icons/homes/IconPin";

const NoticeListItem: React.FC<NoticeListItemProps> = ({ notice }) => {
  const navigate = useNavigate();

  const handleClickNotice = () => {
    navigate(`/notices/${notice.noticeId}`);
  };

  return (
    <div
      className="w-full h-auto flex flex-row bg-white rounded-2xl border-primary-900-light-16 border justify-between items-center cursor-pointer select-none shadow-4xl"
      onClick={handleClickNotice}
    >
      {notice.isPin ? (
        <div className="flex pl-4 items-center py-3 gap-[12px]">
          <PinIcon />
          <div className="py-1 text-base text-primary-700 leading-tight">
            {notice.title}
          </div>
        </div>
      ) : (
        <div className="flex flex-col pl-4 items-start py-3">
          <div className="py-1 text-base text-secondary-500 leading-tight">
            {notice.title}
          </div>
        </div>
      )}
      <div className="flex justify-end pr-4 text-xs text-secondary-500 w-[90px]">
        {getRelativeTime(notice.updateAt)}
      </div>
    </div>
  );
};

export default NoticeListItem;