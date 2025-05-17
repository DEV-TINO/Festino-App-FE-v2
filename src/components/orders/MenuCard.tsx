import React from 'react';
import { formatPrice } from '@/utils/utils';
import { useOrderStore, type MenuInfo, type OrderItem } from '@/stores/orders/orderStore';
import { sendWebSocketMessage } from '@/utils/orderSocket';
import { useSocketStore } from '@/stores/socketStore';

type Props = {
  menu: MenuInfo;
  onCountChange: (count: number) => void;
  boothId: string;
  tableNum: number;
  totalPrice: number;
  totalCount: number;
};

const MenuCard: React.FC<Props> = ({ menu, onCountChange, boothId, tableNum, totalPrice, totalCount }) => {
  const { userOrderList, addOrderItem, isOrderInProgress, orderingSessionId, handleTotalPrice } = useOrderStore();
  const { sessionId } = useSocketStore();

  const orderItem = userOrderList.find((item) => item.menuId === menu.menuId);
  const count = orderItem?.menuCount || 0;

  const isNotOrderingUser = isOrderInProgress && sessionId !== orderingSessionId;

  const temporarilyDisableButton = () => {
    return new Promise<void>((resolve) => setTimeout(resolve, 400));
  };

  const updateCount = async (newCount: number, type: 'MENUADD' | 'MENUSUB') => {
    if (isNotOrderingUser) {
      console.warn('⚠️ 현재 다른 사용자가 주문 중입니다.');
      return;
    }

    addOrderItem({
      menuId: menu.menuId,
      menuName: menu.menuName,
      menuCount: newCount,
      menuPrice: menu.menuPrice,
    });

    sendWebSocketMessage({
      type,
      boothId,
      tableNum,
      payload: {
        menuId: menu.menuId,
        menuCount: newCount,
        totalPrice,
        totalCount,
      },
    });

    onCountChange(newCount);
    handleTotalPrice();
    await temporarilyDisableButton();
  };

  const handleMinus = () => {
    const newCount = Math.max(count - 1, 0);
    updateCount(newCount, 'MENUSUB');
  };

  const handlePlus = () => {
    const newCount = count + 1;
    updateCount(newCount, 'MENUADD');
  };

  const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    let numericValue = Number(inputValue);
    if (numericValue > 99) numericValue = 99;

    if (isNotOrderingUser) {
      console.warn('⚠️ 현재 다른 사용자가 주문 중입니다.');
      return;
    }

    addOrderItem({
      menuId: menu.menuId,
      menuName: menu.menuName,
      menuCount: numericValue,
      menuPrice: menu.menuPrice,
    });

    onCountChange(numericValue);
    handleTotalPrice();
  };

  return (
    <div className="flex gap-4 mb-6 border-b pb-4">
      <div
        className="w-24 h-24 rounded-xl bg-center bg-cover border"
        style={{
          backgroundImage: `url(${menu.menuImage || '/images/booth/booth-default-image.png'})`,
        }}
      />
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="font-semibold text-secondary-700">{menu.menuName}</div>
          <div className="text-sm font-light text-gray-500 mt-1">{menu.menuDescription}</div>
          <div className="text-sm font-light text-gray-500 mt-1">가격: {formatPrice(menu.menuPrice)}원</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className={`font-semibold ${count ? 'text-secondary-700' : 'text-secondary-100'}`}>
            {formatPrice(menu.menuPrice * count)}원
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinus}
              disabled={isOrderInProgress || count===0}
              className="w-6 h-6 flex items-center justify-center rounded-full"
            >
              <img src="/icons/orders/minus.svg" alt="minus" className="w-5 h-5" />
            </button>
            <input
              disabled={isOrderInProgress}
              className="w-[62px] h-7 rounded-3xl border text-center focus:outline-none"
              type="text"
              value={count}
              onChange={handleCountInput}
              min="0"
              max="99"
              maxLength={2}
              placeholder="0"
              inputMode="numeric"
              pattern="\d*"
            />
            <button
              onClick={handlePlus}
              disabled={isOrderInProgress}
              className="w-6 h-6 flex items-center justify-center rounded-full"
            >
              <img src="/icons/orders/plus.svg" alt="plus" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
