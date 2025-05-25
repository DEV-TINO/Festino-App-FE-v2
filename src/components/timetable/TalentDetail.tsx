import { TalentData, TalentProps } from "@/types/ClubData.types";
import { useTimetableStore } from "@/stores/homes/timetableStore";
import useBaseModal from "@/stores/baseModal";

const TalentDetail: React.FC<TalentProps> = ({ talent }) => {
  const { setSelectedTalent } = useTimetableStore();
  const { openModal } = useBaseModal();

  const openTimetableModal = (talent: TalentData) => {
    setSelectedTalent(talent);
    openModal("talent");
  };

  return (
    <div
      onClick={() => openTimetableModal(talent)}
      className={`cursor-pointer flex py-5 rounded-3xl w-[170px] xs:w-[210px] sm:w-[230px] border-2 flex-col items-center gap-2.5 shadow-4xl border-primary text-primary-700`}
    >
      <div
        className="rounded-full bg-primary-700 w-9 h-9 border-2 border-primary bg-cover bg-center"
        style={{backgroundImage: `url(${talent.talentImage})`,}}
      />
      <div className="text-center leading-none">
        <div>연예인 공연</div>
        <div>' {talent.performer} '</div>
      </div>
      <button
        className={`text-white w-[120px] h-[30px] rounded-full text-xs bg-primary-700`}
      >
        공연 정보 상세보기
      </button>
    </div>
  );
};

export default TalentDetail;