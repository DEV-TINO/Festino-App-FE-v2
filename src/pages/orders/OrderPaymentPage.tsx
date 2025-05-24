import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import { formatPrice } from '@/utils/utils';
import MenuCard from '@/components/orders/MenuCard';
import { api } from '@/utils/api';
import { disconnectOrderSocket, connectOrderSocket, sendWebSocketMessage } from '@/utils/orderSocket';
import useBaseModal from '@/stores/baseModal';
import { useSocketStore } from '@/stores/socketStore';

const CATEGORIES = [
  { label: '전체 메뉴', value: 'ALL' },
  { label: '메인 메뉴', value: 0 },
  { label: '서브 메뉴', value: 1 },
  { label: '직원 호출', value: 2 },
] as const;

type CategoryValue = (typeof CATEGORIES)[number]['value'];

const CATEGORY_ENDPOINT_MAP: Record<CategoryValue, string> = {
  ALL: 'all',
  0: 'main',
  1: 'sub',
  2: 'callservice',
};

const SESSION_TIMEOUT = 1000 * 3; // 30초

export const isSocketConnected = (): boolean => {
  const { client } = useSocketStore.getState();
  return !!client && client.connected;
};

const OrderPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { boothId, tableNum } = useParams<{ boothId: string; tableNum: string }>();
  const [showConfirm, setShowConfirm] = useState(true);

  const { setBoothId, setTableNum, setMenuInfo, menuInfo, addOrderItem, userOrderList, totalPrice, isOrderInProgress } =
    useOrderStore();

  const remainingMinutes = useOrderStore((state) => state.remainingMinutes);
  const memberCount = useOrderStore((state) => state.memberCount);

  const { openModal, setExitConfirmCallback } = useBaseModal();
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>('ALL');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const healthCheckInterval = useRef<NodeJS.Timeout | null>(null);

  const isCloseingSession = useRef(false);

  const isButtonDisabled = userOrderList.length === 0;

  useEffect(() => {
    // Initialize the Session ID
    const sessionId = localStorage.getItem('orderSessionId');
    if (!showConfirm && sessionId) {
      console.log('Session ID:', sessionId);
      sendWebSocketMessage({
        type: 'INIT',
        boothId: boothId!,
        tableNum: Number(tableNum),
        clientId: sessionId,
      });

      if (healthCheckInterval.current) {
        clearInterval(healthCheckInterval.current);
      }

      healthCheckInterval.current = setInterval(() => {
        if (isCloseingSession.current) return;
        sendWebSocketMessage({
          type: 'TIMEUPDATE',
          boothId: boothId!,
          tableNum: Number(tableNum),
          clientId: sessionId,
        });
      }, 1000 * 5);
    }
  }, [showConfirm]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tableIndex = Number(tableNum);

    if (!boothId || !isUUID(boothId) || isNaN(tableIndex)) {
      navigate('/error/NotFound');
      return;
    }

    setBoothId(boothId);
    setTableNum(tableIndex);

    fetchMenuByCategory('ALL');

    // Initialize the WebSocket connection
    if (!boothId || !tableNum) return;
    if (!isSocketConnected() && boothId && tableNum && isUUID(boothId)) {
      connectOrderSocket(boothId, Number(tableNum));
    }

    // End of the session
    const sendLogout = async () => {
      const sessionId = localStorage.getItem('orderSessionId')!;
      const senderSessionId = useOrderStore.getState().orderingSessionId;

      if (sessionId === senderSessionId) return;

      if (boothId && tableNum) {
        // TODO: Change to use a modal
        // Wait for the user to confirm before navigating away
        isCloseingSession.current = true;
        if (healthCheckInterval.current) clearInterval(healthCheckInterval.current);
        disconnectOrderSocket(boothId!, Number(tableNum));
        navigate('/order/retry-qr');
        localStorage.removeItem('orderSessionId');
        if (!isSocketConnected()) {
          // 소켓이 연결되어 있지 않은 경우 연결
          connectOrderSocket(boothId!, Number(tableNum));
        }
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('[Visibility Change] Page is hidden');
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(sendLogout, SESSION_TIMEOUT);
      } else {
        console.log('[Visibility Change] Page is visible');
        if (timerRef.current) clearTimeout(timerRef.current!);
      }
    });

    return () => {
      document.removeEventListener('visibilitychange', sendLogout);
      isCloseingSession.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (healthCheckInterval.current) clearInterval(healthCheckInterval.current);
      disconnectOrderSocket(boothId!, Number(tableNum));
    };
  }, [boothId, tableNum]);

  const fetchMenuByCategory = async (category: CategoryValue) => {
    if (!boothId) return;

    const mappedCategory = CATEGORY_ENDPOINT_MAP[category];
    const endpoint =
      mappedCategory === 'all'
        ? `/main/menu/all/booth/${boothId}`
        : `/main/menu/all/booth/${boothId}?menuType=${mappedCategory}`;

    try {
      const res = await api.get(endpoint);

      if (Array.isArray(res.data)) {
        setMenuInfo(res.data);
      } else {
        setMenuInfo([]);
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (err) {
      console.error('메뉴 불러오기 실패:', err);
      setMenuInfo([]);
    }
  };

  const orderingSessionId = useOrderStore((state) => state.orderingSessionId);

  const handleClickReserveButton = () => {
    if (userOrderList.length === 0) {
      alert('메뉴를 선택해주세요.');
      return;
    }

    const mySessionId = localStorage.getItem('orderSessionId');

    if (isOrderInProgress && orderingSessionId !== mySessionId) {
      openModal('overrideOrderModal');
      return;
    }

    sendWebSocketMessage({
      type: 'STARTORDER',
      boothId: boothId!,
      tableNum: Number(tableNum),
      clientId: mySessionId!,
    });

    openModal('orderModal');
  };

  useEffect(() => {
    const handleExit = () => {
      if (boothId && tableNum) {
        disconnectOrderSocket(boothId, Number(tableNum));
        navigate(`/order/${boothId}/${tableNum}`);
      }
    };

    setExitConfirmCallback(handleExit);
  }, [boothId, tableNum]);

  return (
    <div className="flex flex-col h-full pt-[60px]">
      <div className="fixed max-w-[500px] top-0 w-full bg-white z-10 p-4 flex items-center justify-between border-b border-gray-200">
        <button
          onClick={() => {
            openModal('exitPaymentModal');
          }}
        >
          <img src="/icons/header-arrow-back.svg" alt="Back" />
        </button>

        <h1 className="text-lg font-bold select-none">주문하기</h1>
        <div className="w-6" />
      </div>
      <div className="fixed top-[60px]  w-full max-w-[500px] z-10 bg-white">
        <div className="w-full max-w-[500px] fixed bg-primary-700 text-white text-center py-3 flex justify-between px-4">
          <span>{memberCount === 0 ? '-' : memberCount}명이 주문에 참여하고 있어요.</span>
          <span className="flex items-center gap-1">
            <img src="/icons/orders/10Clock.png" style={{ width: '18px', height: '18px' }} /> {remainingMinutes}분
          </span>
        </div>
        <div className="fixed w-full max-w-[500px] bg-white ">
          <div className="flex w-full flex-grow max-w-[500px] justify-between fixed bg-white top-[84px] gap-2 px-4 pt-4 pb-4 mt-6 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  fetchMenuByCategory(cat.value);
                }}
                className={`flex-1 leading-none whitespace-nowrap text-center min-w-0 basis-0 px-4 py-3 rounded-full border text-sm transition-colors
                  ${selectedCategory === cat.value ? 'bg-primary-700 text-white ' : 'bg-white text-primary-700 border-primary-700-light'}
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-5 mt-28 mb-5 overflow-scroll pb-[120px] ">
        {menuInfo.filter((menu) => !menu.isSoldOut).length === 0 ? (
          <div className="text-gray-400 text-sm text-center">메뉴가 없습니다.</div>
        ) : (
          menuInfo
            .filter((menu) => !menu.isSoldOut)
            .map((menu) => (
              <MenuCard
                key={menu.menuId}
                menu={menu}
                boothId={boothId!}
                tableNum={parseInt(tableNum!, 10)}
                totalPrice={totalPrice}
                totalCount={userOrderList.reduce((acc, cur) => acc + cur.menuCount, 0)}
                onCountChange={(count) => {
                  const order = {
                    menuId: menu.menuId,
                    menuName: menu.menuName,
                    menuPrice: menu.menuPrice,
                    menuCount: count,
                  };
                  addOrderItem(order);
                }}
              />
            ))
        )}
      </div>

      <div className="shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] drop-shadow-lg w-full max-w-[500px] shadow-xs rounded-t-3xl fixed bottom-0 bg-white flex justify-center px-[20px] py-[20px]">
        <div
          className={`flex items-center justify-center w-full h-[50px] rounded-full text-white text-base font-extrabold cursor-pointer ${
            isButtonDisabled ? 'bg-secondary-100' : 'bg-primary-700'
          }`}
          onClick={() => {
            if (!isButtonDisabled) handleClickReserveButton();
          }}
        >
          {formatPrice(totalPrice)}원 • 주문하기
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            className="relative bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5 w-[320px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
              <img src="/icons/commons/error.svg" alt="Error" />
            </div>
            <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
              <p className="text-secondary-700 text-xl font-bold">제한 시간 10분!</p>
              <p className="text-secondary-500 text-sm">10분 이내에 주문을 완료해 주세요.</p>
            </div>
            <div className="flex w-full gap-3 font-bold text-sm">
              <button
                className="w-full h-11 rounded-full border-2 border-primary-700 text-primary-700"
                onClick={() => {
                  setShowConfirm(false);
                  navigate(`/order/${boothId}/${tableNum}`);
                }}
              >
                돌아가기
              </button>
              <button
                className="w-full h-11 rounded-full text-white bg-primary-700"
                onClick={() => {
                  setShowConfirm(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPaymentPage;

const isUUID = (uuid: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  return regex.test(uuid);
};
