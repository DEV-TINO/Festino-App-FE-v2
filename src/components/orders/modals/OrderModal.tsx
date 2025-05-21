import React, { useMemo, useState } from 'react';
import useBaseModal from '@/stores/baseModal';
import { useOrderStore } from '@/stores/orders/orderStore';
import { sendWebSocketMessage } from '@/utils/orderSocket';
import InputName from '@/components/tablings/InputName';
import InputPhoneNum from '@/components/tablings/InputPhoneNum';
import { formatPrice } from '@/utils/utils';

const MAX_MESSAGE_LENGTH = 50;
const phoneRegex = /^010/;

const OrderModal: React.FC = () => {
  const {
    boothId,
    tableNum,
    totalPrice,
    userOrderList,
    setUserName,
    setPhoneNum,
    recentName,
    setRecentName,
    recentPhoneNum,
    setRecentPhoneNum,
    note,
    setNote,
  } = useOrderStore();

  const { openModal, closeModal } = useBaseModal();

  const [currentNote, setCurrentNote] = useState(note);
  const [isAgreed, setIsAgreed] = useState(false);

  const orderMenus = useMemo(() => userOrderList.filter((item) => item.menuCount > 0), [userOrderList]);

  const handleInputNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, MAX_MESSAGE_LENGTH);
    setCurrentNote(value);
  };
  const handleCancel = () => {
    // ORDERCANCEL 메시지 전송
    sendWebSocketMessage({
      type: 'ORDERCANCEL',
      boothId,
      tableNum,
    });

    closeModal(); // 모달 닫기
  };

  const handleClickOrderButton = () => {
    if (recentName.length < 2 || recentPhoneNum.length !== 13 || !isAgreed || !phoneRegex.test(recentPhoneNum)) {
      alert('이름, 전화번호, 동의 항목을 정확히 입력해주세요.');
      return;
    }
    setUserName(recentName);
    setPhoneNum(recentPhoneNum);
    setNote(currentNote);
    closeModal();
    openModal('orderConfirmModal');
  };

  return (
    <div
      className="relative col-start-2 row-start-2 bg-white rounded-3xl flex flex-col items-center px-7 py-[21px] max-h-full overflow-y-auto w-[346px]  max-w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-semibold text-xl text-secondary-700 text-center mb-3">주문하기</div>
      <div className="flex flex-col gap-3 w-full flex-grow overflow-y-auto overflow-x-hidden">
        <div className="w-full flex flex-col">
          <InputName value={recentName} onChange={setRecentName} />
          <InputPhoneNum value={recentPhoneNum} onChange={setRecentPhoneNum} />
        </div>
        <div className="w-full gap-1 flex flex-col">
          <div className="font-semibold text-secondary-700 select-none">주문하기</div>
          <div className="w-full rounded-xl  p-4 bg-primary-700-lighter">
            {orderMenus.map((item) => (
              <div key={item.menuId} className="grid grid-cols-3 pb-[12px] text-secondary-700 text-sm">
                <div className="text-left text-wrap select-none">{item.menuName}</div>
                <div className="text-center select-none">{item.menuCount}개</div>
                <div className="text-right select-none">{formatPrice(item.menuPrice)}원</div>
              </div>
            ))}
            <div className="w-full border-[1px] border-secondary-300"></div>
            <div className="pt-[10px] pb-[4px] flex justify-between text-sm text-secondary-700">
              <div className="select-none">총 가격</div>
              <div className="select-none">{formatPrice(totalPrice)}원</div>
            </div>
          </div>
        </div>
        <div className="relative w-full flex flex-col gap-1">
          <div className="font-semibold text-secondary-700 select-none">메모</div>
          <textarea
            className="text-base w-full resize-none border border-primary p-4 h-24 rounded-2xl focus:outline-none focus:border-primary-700"
            placeholder="메모를 입력해주세요."
            value={currentNote}
            onChange={handleInputNote}
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <div className="absolute bottom-4 right-5 text-sm text-secondary-100"></div>
        </div>
        <div className="text-xs text-secondary-500 flex flex-col items-start w-full">
          <label htmlFor="agree-checkbox" className="flex mb-4">
            <input
              id="agree-checkbox"
              type="checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
              className="w-4 h-4 mr-2 ml-1 text-primary-700 bg-gray-100 border-gray-300 rounded-[12px] focus:ring-1 focus:ring-primary-900 focus:ring-offset-1 select-none"
            />
            개인정보 수집 이용 동의 <span className="text-red-500 ">&nbsp;(필수)</span>
          </label>
        </div>
        <div className="gap-5 flex w-full font-bold">
          <button
            className="w-full h-[42px] flex justify-center items-center border-2 border-primary-700 rounded-3xl text-primary-700"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className={`w-full h-[42px] flex justify-center items-center text-white rounded-3xl ${
              recentName.length >= 2 && recentPhoneNum.length === 13 && isAgreed
                ? 'bg-primary-700 border-2 border-primary-700'
                : 'bg-secondary-100'
            }`}
            onClick={handleClickOrderButton}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
