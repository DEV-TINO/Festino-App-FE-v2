import React, { useEffect, useState } from 'react';
import { sendWebSocketMessage } from '@/utils/orderSocket';
import { useOrderStore } from '@/stores/orders/orderStore';
import { api } from '@/utils/api';

import useBaseModal from '@/stores/baseModal';

const prettyPhoneNum = (num: string) => {
  const digits = num.replace(/\D/g, '');
  if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  if (digits.length === 10) return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  return num;
};

const OrderConfirmModal: React.FC = () => {
  const { closeModal, openModal } = useBaseModal();
  const {
    boothId,
    tableNum,
    userName,
    phoneNum,
    accountInfo,
    totalPrice,
    userOrderList,
    note,
    resetOrderInfo,
    getAccountInfo,
    fetchTossPay,
    fetchKakaoPay,
    isTossPay,
    tossPayUrl,
    isKakaoPay,
    kakaoPayUrl,
  } = useOrderStore();

  const [isSameChecked, setIsSameChecked] = useState(false);
  const [isDoneChecked, setIsDoneChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderMenus = userOrderList.filter((order) => order.menuCount > 0);

  const handleCancel = () => {
    // ORDERCANCEL 메시지 전송
    sendWebSocketMessage({
      type: 'ORDERCANCEL',
      boothId,
      tableNum,
    });

    closeModal(); // 모달 닫기
  };

  useEffect(() => {
    if (!boothId) return;
    const init = async () => {
      try {
        await getAccountInfo();
        await fetchTossPay();
        await fetchKakaoPay();
      } catch (error) {
        console.error('결제 관련 API 실패', error);
      }
    };

    init();
  }, []);

  const copyAccount = () => {
    navigator.clipboard.writeText(accountInfo.account);
    alert('계좌번호가 복사되었습니다.');
  };

  const handleComplete = async () => {
    if (!isSameChecked || !isDoneChecked || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        boothId,
        tableNum,
        userName,
        phoneNum: phoneNum.replace(/-/g, ''),
        menuInfo: orderMenus,
        totalPrice,
        note,
      };

      const res = await api.post('/main/order', payload);

      if (res.success) {

        resetOrderInfo();
        sendWebSocketMessage({
          type: 'ORDERDONE',
          boothId,
          tableNum,
        });

        closeModal();
        openModal('orderCompleteModal');
        
      } else {
        console.warn(' 주문 실패:', res.message);
        alert(`주문 실패: ${res.message}`);
      }
    } catch (err) {
      console.error('요청 중 오류:', err);
      alert('주문 저장 중 오류가 발생했습니다.');
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className="relative col-start-2 row-start-2 bg-white rounded-3xl flex flex-col items-center px-[21px] py-7 gap-5 w-[346px] max-w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-semibold text-xl text-secondary-700 select-none ">주문 확인서</div>

      <div className="w-full gap-1">
        <div className="font-semibold text-secondary-700 mb-1 select-none">주문자 정보</div>
        <div className="w-full rounded-xl p-4 flex flex-col gap-3 text-secondary-500 text-sm bg-primary-700-lighter">
          <div className="flex justify-between">
            <div className="select-none">입금자명</div>
            <div className="select-none">{userName}</div>
          </div>
          <div className="flex justify-between">
            <div className="select-none">전화번호</div>
            <div className="select-none">{prettyPhoneNum(phoneNum)}</div>
          </div>
        </div>
      </div>

      <div className="w-full gap-1">
        <div className="font-semibold text-secondary-700 mb-1 select-none">결제 정보 확인</div>
        <div className="w-full rounded-xl p-4 bg-primary-700-lighter">
          <div className="font-bold flex pb-[12px] justify-between text-secondary-500">
            <div className="text-sm select-none">{accountInfo.bankName}</div>
            <div className="flex gap-[8px] items-center cursor-pointer" onClick={copyAccount}>
              <div className="text-sm select-none">{accountInfo.account}</div>
              <img src="/icons/orders/board.svg" alt="복사 아이콘" className="w-[16px] h-[16px]" />
            </div>
          </div>

          <div className="flex pb-[12px] justify-between text-secondary-500">
            <div className="text-sm select-none">예금주</div>
            <div className="text-sm select-none">{accountInfo.accountHolder}님</div>
          </div>
          <div className="w-full border border-secondary-300" />
          <div className="pt-[10px] pb-[4px] flex justify-between text-sm text-secondary-500 select-none">
            <div>총 가격</div>
            <div>{totalPrice.toLocaleString()}원</div>
          </div>
        </div>
      </div>
      {(isTossPay || isKakaoPay) && (
        <>
          <div className="flex gap-2 justify-center w-full">
            {isKakaoPay && kakaoPayUrl && (
              <a
                href={kakaoPayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-[120px] h-[80px] rounded-xl border border-gray-200"
              >
                <img src="/icons/orders/kakao-pay.png" alt="카카오페이" className="w-[61px] h-[24px]" />
                <span className="text-xs mt-1 select-none">카카오페이</span>
              </a>
            )}
            {isTossPay && tossPayUrl && (
              <a
                href={tossPayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-[120px] h-[80px] rounded-xl border border-gray-200"
              >
                <img src="/icons/orders/toss-pay.png" alt="토스페이" className="w-8 h-8" />
                <span className="text-xs mt-1">토스페이</span>
              </a>
            )}
          </div>
          {isKakaoPay && (
            <div>
              <p className="text-red-500 text-xs select-none text-center">카카오페이는 입금을 완료한 후</p>
              <p className="text-red-500 text-xs select-none text-center">새로 열린 창을 닫고 해당 페이지로 복귀해 주세요</p>
            </div>
          )}
        </>
      )}

      <div className="text-xs text-secondary-500 flex flex-col items-start w-full">
        <label htmlFor="same-checkbox" className="flex mb-2">
          <input
            id="same-checkbox"
            type="checkbox"
            checked={isSameChecked}
            onChange={() => setIsSameChecked(!isSameChecked)}
            className="w-4 h-4 mr-2 text-primary-700 bg-gray-100 border-gray-300 rounded-[12px] focus:ring-1 focus:ring-primary-700 focus:ring-offset-1 select-none"
          />
          입금자명과 주문자명을 확인해주세요. <span className="text-red-500">&nbsp;(필수)</span>
        </label>
        <label htmlFor="done-checkbox" className="flex mb-4">
          <input
            id="done-checkbox"
            type="checkbox"
            checked={isDoneChecked}
            onChange={() => setIsDoneChecked(!isDoneChecked)}
            className="w-4 h-4 mr-2 text-primary-700 bg-gray-100 border-gray-300 rounded-[12px] focus:ring-1 focus:ring-primary-700 focus:ring-offset-1 select-none"
          />
          입금 후 입금 완료 버튼을 눌러주세요. <span className="text-red-500">&nbsp;(필수)</span>
        </label>
        <div className="text-red-500 text-center w-full text-xs select-none">
          입금 미확인 시 주문이 취소될 수 있습니다.
        </div>
      </div>

      <div className="gap-5 w-full flex font-bold">
        <button
          onClick={handleCancel}
          className="w-full h-[42px] flex justify-center items-center border-2 border-primary-700 rounded-3xl text-primary-700"
        >
          취소
        </button>
        <button
          onClick={handleComplete}
          disabled={!isSameChecked || !isDoneChecked}
          className={`w-full h-[42px] flex justify-center items-center text-white rounded-3xl ${
            isSameChecked && isDoneChecked
              ? 'bg-primary-700 border-2 border-primary-700'
              : 'bg-secondary-100 cursor-not-allowed'
          }`}
        >
          입금 완료
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
