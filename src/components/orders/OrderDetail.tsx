import React from 'react';
import { priceToString } from '@/utils/utils';
import { formatDateTime } from '@/utils/utils';

type Props = {
  orderInfo: {
    adminName?: string;
    tableNum: string;
    createAt: string;
    totalPrice: number;
    orderType: number;
    menuInfo: {
      menuName: string;
      menuCount: number;
      menuPrice: number;
    }[];
  };
};

const statusColors = ['bg-waiting-light', 'bg-cooking-light', 'bg-prepared-light', 'bg-secondary-50'];

const OrderDetail: React.FC<Props> = ({ orderInfo }) => {
  const { adminName, tableNum, createAt, menuInfo, totalPrice, orderType } = orderInfo;

  return (
    <div className={`w-full flex flex-col p-4 rounded-3xl text-sm ${statusColors[orderType]}`}>
      <div className="flex flex-col w-full gap-3">
        <div className="flex justify-between items-center w-full border-b border-secondary-300 py-1">
          <div className="flex items-center gap-1 flex-shrink-0">
            <img src="/icons/orders/map.svg" />
            <p className="truncate">
              {adminName} - NO.{tableNum}
            </p>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
            <img src="/icons/orders/clock.svg" />
            <p className="whitespace-nowrap">{formatDateTime(createAt)}</p>
          </div>
        </div>

        {menuInfo.map((menu, i) => (
          <div key={i} className="grid grid-cols-3 min-h-[17px] text-center break-keep">
            <p className="text-left">{menu.menuName}</p>
            <p>{menu.menuCount}개</p>
            <p className="text-right">{priceToString(menu.menuPrice)}원</p>
          </div>
        ))}

        <div className="flex justify-between h-[31px] items-center border-t border-secondary-300">
          <p>총 가격</p>
          <p className="font-bold">{priceToString(totalPrice)}원</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
