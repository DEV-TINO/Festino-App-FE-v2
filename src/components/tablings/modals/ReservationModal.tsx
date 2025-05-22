import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservationStore } from '@/stores/tablings/tablingStore';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';
import { formatPhoneNum } from '@/utils/utils';
import { REGEX } from '@/constants';
import InputName from '../InputName';
import InputPersonNum from '../InputPersonNum';
import InputPhoneNum from '../InputPhoneNum';
import PersonalInfo from '@/components/commons/PersonalInfo';
import useBaseModal from '@/stores/baseModal';

const ReservationModal: React.FC = () => {
  const {
    setRecentName,
    setRecentPhoneNum,
    checkDuplicateReserve,
    reserveInfo,
    selectedNightBoothInfo,
    openNightBoothInfo,
    recentName,
    recentPhoneNum,
  } = useReservationStore();

  const { isAgreed, setIsAgreed } = usePersonalInfoStore();
  const { openModal, closeModal, isModalOpen, modalType } = useBaseModal();
  const navigate = useNavigate();

  const [personNum, setPersonNum] = useState<number | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const newNightBooth = openNightBoothInfo?.find((info) => info.boothId === selectedNightBoothInfo?.boothId);

  useEffect(() => {
    setIsAgreed(false);
  }, [setIsAgreed]);

  useEffect(() => {
    if (isModalOpen && modalType === 'reservationModal') {
      setRecentName('');
      setRecentPhoneNum('');
      setPersonNum(null);
      setIsSubmit(false);
      setIsAgreed(false);
    }
  }, [isModalOpen, modalType, setIsAgreed, setRecentName, setRecentPhoneNum]);

  const handleClickReserveButton = async () => {
    if (
      recentName.length < 2 ||
      recentPhoneNum.length !== 13 ||
      !personNum ||
      personNum <= 0 ||
      !isAgreed ||
      !REGEX.test(formatPhoneNum(recentPhoneNum)) ||
      isSubmit
    ) {
      return;
    }

    setIsSubmit(true);

    reserveInfo.userName = recentName;
    reserveInfo.phoneNum = formatPhoneNum(recentPhoneNum);
    reserveInfo.personCount = personNum;
    reserveInfo.boothId = selectedNightBoothInfo?.boothId || '';

    setRecentName(recentName);
    await checkDuplicateReserve(reserveInfo.phoneNum, { openModal, closeModal, navigate });
    setIsSubmit(false);
    setIsAgreed(false);
  };

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-[21px] py-7 gap-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-secondary-700 text-xl font-semibold">{newNightBooth?.adminName} 부스 예약</div>
        <div className="w-full flex flex-col justify-start px-4">
          <InputName value={recentName} onChange={setRecentName} />
          <div className="mb-[30px]">
            <InputPhoneNum value={recentPhoneNum} onChange={setRecentPhoneNum} />
          </div>
          <InputPersonNum value={personNum} onChange={setPersonNum} />
        </div>
        <div className="flex flex-row justify-between p-4 bg-primary-900-light-6 rounded-lg-xl w-full">
          <div>현재 대기 팀</div>
          <div>{newNightBooth?.totalReservationNum} 팀</div>
        </div>
        <div className="ml-2 w-full flex justify-start">
          <PersonalInfo />
        </div>
        <div className="w-full flex flex-row justify-between gap-[10px] pt-[1px]">
          <button
            className="w-full h-[43px] bg-white text-primary-700 font-bold rounded-10xl border-2 border-primary-700"
            onClick={() => closeModal()}
          >
            닫기
          </button>
          <button
            className={`w-full h-[43px] font-bold rounded-10xl text-white ${
              recentName.length >= 2 && recentPhoneNum.length === 13 && personNum && personNum > 0 && isAgreed
                ? 'bg-primary-700'
                : 'bg-gray-300'
            }`}
            onClick={() => handleClickReserveButton()}
          >
            예약하기
          </button>
        </div>
      </div>
    </>
  );
};

export default ReservationModal;
