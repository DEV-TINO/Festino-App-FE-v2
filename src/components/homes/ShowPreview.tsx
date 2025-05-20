import { useEffect } from 'react';
import { useDateStore } from '@/stores/homes/dateStore';
import { useTimetableStore } from '@/stores/homes/timetableStore';
import useBaseModal from '@/stores/baseModal';
import { openNewTap } from '@/utils/utils';
import { COUNCIL_URL } from '@/constants';
import { ClubData } from '@/types/ClubData.types';

const ShowPreview: React.FC = () => {
  const { festivalDate } = useDateStore();
  const { clubData, getClubTimetable, setSelectedClub } = useTimetableStore();
  const { openModal } = useBaseModal();

  useEffect(() => {
    getClubTimetable(festivalDate);
  }, [festivalDate]);

  const openTimetableModal = (club: ClubData) => {
    setSelectedClub(club);
    openModal('timetable');
  };

  return (
    <div className="w-full h-[160px] sm:h-[178px] bg-white rounded-3xl border-primary-700-light border-1 flex justify-center select-none shadow-4xl">
      <div className="flex pt-3 w-full px-3 justify-evenly gap-1 overflow-x-auto reserve-container">
        {clubData?.map((club, index) => (
          <div
            onClick={() => openTimetableModal(club)}
            key={index}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className="border-2 border-primary bg-no-repeat bg-cover bg-center w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full"
              style={{ backgroundImage: `url(${club.clubImage})` }}
            ></div>
            <div className="text-xs font-normal pt-2">{club.showStartTime}</div>
            <div className="text-primary-700 font-medium">{club.performer}</div>
          </div>
        ))}

        <div className="flex flex-col items-center cursor-pointer" onClick={() => openNewTap(COUNCIL_URL)}>
          <div className="border-2 border-primary bg-cover bg-center bg-talent-icon w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full"></div>
          <div className="text-primary-700 font-medium pt-6">연예인 공연</div>
        </div>
      </div>
    </div>
  );
};

export default ShowPreview;
