import IconCD from '@/icons/homes/IconCD';
import IconLink from '@/icons/homes/IconLink';
import useBaseModal from '@/stores/baseModal';
import { useTimetableStore } from '@/stores/homes/timetableStore';
import { TalentMusicItem } from '@/types/ClubData.types';
import { openNewTap } from '@/utils/utils';

const TalentModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { selectedTalent } = useTimetableStore();

  const handleClickRecommendMusic = (music: TalentMusicItem) => {
    openNewTap(music.youtubeLink);
  };

  if (!selectedTalent) return null;

  return (
    <div
      className="relative col-start-2 row-start-2 dynamic-width h-auto bg-white rounded-2xl flex flex-col items-center select-none w-[80%] min-w-[330px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex justify-between px-5 pt-5">
        <div className="w-[20px] h-[20px]" />
        <div className="text-xs text-primary-700 rounded-full w-[80px] h-[22px] flex justify-center items-center border-2 border-primary font-medium">
          연예인
        </div>
        <div
          className="w-[20px] h-[20px] bg-x-button bg-center bg-no-repeat bg-[length:20px_20px] cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <div className="pb-2 pt-4 flex justify-center">
        <div
          className="border-2 border-primary bg-cover bg-center w-[120px] h-[120px] rounded-full"
          style={{ backgroundImage: `url(${selectedTalent.talentImage})` }}
        />
      </div>
      <div className="text-secondary-700 font-medium pb-2">
        {selectedTalent.performer}
      </div>
      <div className="text-xs text-primary-700 rounded-full px-4 py-1 flex items-center justify-center bg-tag gap-1 cursor-pointer">
        페스티노 추천곡!
      </div>
      <div className="pb-7 w-full pt-4">
        <div className="px-4 xs:px-8 w-full flex flex-col gap-3 overflow-y-auto">
          {selectedTalent.musicList.map((music, index) => (
            <div
              onClick={() => handleClickRecommendMusic(music)}
              key={index}
              className="shadow-3xl text-xs text-primary-700 w-full rounded-3xl flex items-center gap-2 border-2 border-primary"
            >
              <IconCD />
              <div className="w-full flex justify-between pr-3 items-center">
                <div className="font-bold">{music.title}</div>
                <IconLink />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentModal;