import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReservationStore } from "@/stores/tablings/tablingStore";
import { useBoothStore } from "@/stores/booths/boothStore";
import NoBooth from "./NoBooth";
import { BoothInfo } from "@/types/Booth.types";
import useBaseModal from "@/stores/baseModal";

const Reservation: React.FC = () => {
  const { getAllNightBooth, setSelectedNightBoothInfo, openNightBoothInfo, openNightBoothInfoLength } =
    useReservationStore();

  const { getBoothDetail } = useBoothStore();
  const { openModal } = useBaseModal();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedBoothId, setSelectedBoothId] = useState<string>('');

  const handleClickReserveButton = () => {
    if (!selectedBoothId) return;
    openModal('reservationModal');
  };

  const navigate = useNavigate();
  const { boothId: boothIdFromRoute } = useParams<{ boothId?: string }>();

  const handleClickMajorBox = useCallback(
    (booth: BoothInfo) => {
      if (selectedBoothId === booth.boothId) {
        setSelectedBoothId('');
        setSelectedNightBoothInfo(null);
      } else {
        setSelectedBoothId(booth.boothId);
        setSelectedNightBoothInfo({ ...booth });
      }
    },
    [selectedBoothId, setSelectedNightBoothInfo],
  );

  const handleClickDetailButton = () => {
    if (!selectedBoothId) return;
    getBoothDetail('야간부스', String(selectedBoothId));
    navigate(`/booths/night/${selectedBoothId}`);
  };

  const handleScrollToSelectedBooth = useCallback(() => {
    const container = document.getElementById('reserve-container');
    const targetItem = document.getElementById(selectedBoothId);

    if (container && targetItem) {
      const scrollLeft = targetItem.offsetLeft - container.clientWidth / 2 + targetItem.clientWidth / 2;

      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectedBoothId]);

  useEffect(() => {
    handleScrollToSelectedBooth();
  }, [handleScrollToSelectedBooth]);

  useEffect(() => {
    const fetchBooths = async () => {
      setIsLoading(true);
      await getAllNightBooth();
      setIsLoading(false);
    };

    fetchBooths();
  }, [getAllNightBooth, boothIdFromRoute]);

  return (
    <div className="flex flex-col">
      <div className="w-screen max-w-[500px] min-w-[375px]">
        <div className="dynamic-padding w-full flex justify-start">
          <div
            id="reserve-container"
            className={`pt-12 w-full flex ${openNightBoothInfoLength > 4 ? 'overflow-x-scroll scroll-smooth' : ''}`}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {!isLoading && (!openNightBoothInfo || openNightBoothInfoLength === 0) && <NoBooth />}{' '}
            <div
              className={`gap-2 ${
                openNightBoothInfoLength <= 2
                  ? 'flex justify-start'
                  : 'grid place-content-start grid-rows-2 grid-flow-col'
              }`}
            >
              {openNightBoothInfo?.map((nightBooth) => {
                const isSelected = selectedBoothId === nightBooth.boothId;
                return (
                  <div
                    key={nightBooth.boothId}
                    onClick={() => handleClickMajorBox(nightBooth)}
                    id={nightBooth.boothId}
                    className={`dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0 ${
                      selectedBoothId && !isSelected ? 'opacity-50' : ''
                    }`}
                    style={{
                      backgroundImage: `url(${nightBooth.boothImage ?? '/images/booths/default.svg'})`,
                    }}
                  >
                    <div className="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-700 via-slate-500 opacity-50 rounded-3xl"></div>
                      <div className="relative z-10">
                        <h2 className="font-bold mb-0.5 break-keep">{nightBooth.adminName}</h2>
                        <h2 className="text-2xs">대기중인 팀 : {nightBooth.totalReservationNum}</h2>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute rounded-3xl border-4 border-primary-700 top-0 left-0 dynamic-item"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row dynamic-padding justify-between gap-[10px] text-white font-bold mt-5 mb-20">
        <button
          className={`h-[60px] rounded-10xl w-1/2 ${selectedBoothId ? 'bg-white border-1 border-primary-700 text-primary-700 font-medium' : 'bg-secondary-100'}`}
          onClick={() => handleClickDetailButton()}
        >
          자세히보기
        </button>
        <button
          type="button"
          className={`h-[60px] rounded-10xl w-1/2 ${selectedBoothId ? 'bg-primary-700' : 'bg-secondary-100'} `}
          onClick={() => handleClickReserveButton()}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default Reservation;
