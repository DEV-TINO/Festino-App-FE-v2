import ImageSlider from "@/components/commons/ImageSlider";
import { formatDateTime } from "@/utils/utils";
import { NoticeProps } from "@/types/Notice.types";

const Notice: React.FC<NoticeProps> = ({ notice }) => {
  return (
    <div className="flex flex-col py-5 gap-2 px-4 justify-center w-full">
      <div className="flex items-center justify-between px-2">
        <div className="font-medium break-words text-secondary-500">
          {notice.title}
        </div>
        <div className="text-xs text-secondary-300">{formatDateTime(notice.updateAt)}</div>
      </div>
      <div className="w-full flex flex-col rounded-3xl border-primary-900-light-16 border justify-center items-center p-5 select-none">
        <div className="relative w-full">
        {notice.imageUrl && notice.imageUrl[0] ? (
          <div className="pb-5">
            <ImageSlider images={notice.imageUrl} />
          </div>
        ) : null}
        </div>
        <div className="w-full text-xs break-words px-1 whitespace-pre-wrap">
          {notice.content}
        </div>
      </div>
    </div>
  );
};

export default Notice;