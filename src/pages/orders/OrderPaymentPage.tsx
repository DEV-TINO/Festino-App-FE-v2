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

  useEffect(() => {
  }, [remainingMinutes]);

  const { openModal, setExitConfirmCallback } = useBaseModal();
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>('ALL');

  useEffect(() => {
    if (!boothId || !tableNum || !isUUID(boothId) || showConfirm) return;
    const tableIndex = Number(tableNum);
  
    if (!isSocketConnected()) {
      connectOrderSocket(boothId, tableIndex);
    }
  
    return () => {
      disconnectOrderSocket(boothId, tableIndex);
    };
  }, [boothId, tableNum, showConfirm]);  

  const hasConnected = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && boothId && tableNum && !hasConnected.current) {
        if (!isSocketConnected()) {
          connectOrderSocket(boothId, Number(tableNum));
          hasConnected.current = true;
        }
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [boothId, tableNum]);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    const tableIndex = Number(tableNum);
  
    if (!boothId || !isUUID(boothId) || isNaN(tableIndex)) {
      navigate('/error/NotFound');
      return;
    }
  
    if (!isSocketConnected() && boothId && tableNum && isUUID(boothId)) {
      connectOrderSocket(boothId, Number(tableNum));
    }    
  
    setBoothId(boothId);
    setTableNum(tableIndex);
  
    fetchMenuByCategory('ALL');
  }, [boothId, tableNum]);  

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (boothId && tableNum) {
        sendWebSocketMessage({
          type: 'UNSUB',
          boothId,
          tableNum: Number(tableNum),
        });
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
    if (totalPrice === 0) {
      alert('메뉴를 선택해주세요.');
      return;
    }

    const mySessionId = useSocketStore.getState().sessionId;

    if (isOrderInProgress && orderingSessionId !== mySessionId) {
      openModal('overrideOrderModal');
      return;
    }

    sendWebSocketMessage({
      type: 'STARTORDER',
      boothId: boothId!,
      tableNum: Number(tableNum),
    });
    
    openModal('orderModal');
  };

  useEffect(() => {
    const handleExit = () => {
      if (boothId && tableNum) {
        sendWebSocketMessage({
          type: 'UNSUB',
          boothId,
          tableNum: Number(tableNum),
        });
    
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
      <div className="fixed top-[60px] w-full max-w-[500px] z-10 bg-white">
        <div className="w-full max-w-[500px] fixed bg-primary-700 text-white text-center py-3 flex justify-between px-4">
          <span>{memberCount}명이 주문에 참여하고 있어요.</span>
          <span className="flex items-center gap-1">
            <img src="/icons/orders/10Clock.svg" style={{ width: '18px', height: '18px' }} /> {remainingMinutes}분
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
            totalPrice === 0 ? 'bg-secondary-100' : 'bg-primary-700'
          }`}
          onClick={() => {
            handleClickReserveButton();
          }}
        >
          {formatPrice(totalPrice)}원 • 주문하기
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-md p-6 w-[300px] text-center">
            <p className="text-base text-gray-800 mb-4">제한 시간 10분!<br />10분 이내에 주문을 완료해 주세요</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-full"
                onClick={() => {
                  setShowConfirm(false);
                  navigate(`/order/${boothId}/${tableNum}`);
                }}
              >
                돌아가기
              </button>
              <button
                className="w-1/2 px-4 py-2 bg-primary-700 text-white rounded-full"
                onClick={() => {
                  setShowConfirm(false);
                  if (!isSocketConnected() && boothId && tableNum && isUUID(boothId)) {
                    connectOrderSocket(boothId, Number(tableNum));
                  }
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
