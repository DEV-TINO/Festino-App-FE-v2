import { ClubProps, ClubData } from "@/types/ClubData.types";
import { useTimetableStore } from "@/stores/homes/timetableStore";
import useBaseModal from "@/stores/baseModal";

const ClubDetail: React.FC<ClubProps> = ({ club }) => {
  const { setSelectedClub } = useTimetableStore();
  const { openModal } = useBaseModal();

  const openTimetableModal = (club: ClubData) => {
    setSelectedClub(club);
    openModal("timetable");
  };

  const isShowing = club.isShowing
    ? 'border-primary text-primary-700'
    : 'bg-secondary-50 border-secondary-100 text-secondary-100';

  const isShowingButton = club.isShowing
    ? 'bg-primary-700'
    : 'bg-secondary-300'

  return (
    <div
      onClick={() => openTimetableModal(club)}
      className={`cursor-pointer flex py-5 rounded-3xl w-[170px] xs:w-[210px] sm:w-[230px] border-2 flex-col items-center gap-2.5 shadow-4xl ${isShowing}`}
    >
      <div
        className="rounded-full bg-primary-700 w-9 h-9 border-2 border-primary bg-cover bg-center"
        style={{backgroundImage: `url(${club.clubImage})`,}}
      />
      <div className="text-center leading-none">
        <div>교내 동아리 공연</div>
        <div>' {club.performer} '</div>
      </div>
      <button
        className={`text-white w-[120px] h-[30px] rounded-full text-xs ${isShowingButton}`}
      >
        공연 정보 상세보기
      </button>
    </div>
  );
};

export default ClubDetail;