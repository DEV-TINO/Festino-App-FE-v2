import IconCD from '@/icons/homes/IconCD';
import useBaseModal from '@/stores/baseModal';
import { useTimetableStore } from '@/stores/homes/timetableStore';
import { openNewTap } from '@/utils/utils';

const TimetableModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { selectedClub } = useTimetableStore();

  const handleClickInstagram = () => {
    if(selectedClub) {
      const url = `https://www.instagram.com/${selectedClub.instagram}/`
      openNewTap(url);
    }
  };

  if (!selectedClub) return null;

  return (
    <div
      className="relative col-start-2 row-start-2 dynamic-width h-auto bg-white rounded-2xl flex flex-col items-center select-none w-[80%] min-w-[330px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex justify-between px-5 pt-5">
        <div className="w-[20px] h-[20px]" />
        <div className="text-xs text-primary-700 rounded-full w-[80px] h-[22px] flex justify-center items-center border-2 border-primary font-medium">
          교내 동아리
        </div>
        <div
          className="w-[20px] h-[20px] bg-x-button bg-center bg-no-repeat bg-[length:20px_20px] cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <div className="pb-2 pt-4 flex justify-center">
        <div
          className="border-2 border-primary bg-cover bg-center w-[120px] h-[120px] rounded-full"
          style={{ backgroundImage: `url(${selectedClub.clubImage})` }}
        />
      </div>
      <div className="text-secondary-700 font-medium pb-2">
        {selectedClub.performer}
      </div>
      <div className="text-secondary-500 text-xs flex flex-col items-center font-medium pb-4 leading-tight whitespace-pre-wrap text-center">
        <div className="px-4 xs:px-8">{selectedClub.clubDescription}</div>
      </div>
      <div className="text-xs text-secondary-500 rounded-full w-[122px] h-[26px] flex items-center justify-center bg-tag gap-1 cursor-pointer">
        <div className="w-[16px] h-[16px] bg-instagram bg-center bg-no-repeat bg-[length:16px_16px]" />
        <div onClick={() => handleClickInstagram()}>@{selectedClub.instagram}</div>
      </div>
      <div className="pb-7 w-full pt-4">
        <div className="px-4 xs:px-8 w-full flex flex-col gap-3 max-h-[224px] overflow-y-auto">
          {selectedClub.musicList.map((music, index) => (
            <div
              key={index}
              className="shadow-3xl text-xs text-primary-700 w-full min-h-[60px] rounded-3xl flex items-center justify-between border-2 border-primary"
            >
              <div className="p-3">
                <IconCD />
              </div>
              <div className="w-full flex flex-col pr-4">
                <div className="flex gap-1">
                  <div className="font-bold">{music.title}</div>
                  <div>-</div>
                  <div>{music.artist}</div>
                </div>
                <div className="text-2xs whitespace-pre-line">
                  {music.performer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableModal;