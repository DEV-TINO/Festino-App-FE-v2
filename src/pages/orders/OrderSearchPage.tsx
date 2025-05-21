import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import OrderDetail from '@/components/orders/OrderDetail';
import { api } from '@/utils/api';
import InputName from '@/components/tablings/InputName';
import InputPhoneNum from '@/components/tablings/InputPhoneNum';

const TABS = ['전체', '입금 대기', '조리 중', '조리 완료', '주문 취소'];

type OrderInfo = {
  date: number;
  createAt: string;
  adminName?: string;
  tableNum: string;
  totalPrice: number;
  menuInfo: {
    menuName: string;
    menuCount: number;
    menuPrice: number;
  }[];
  orderType: number;
};

const OrderSearchPage: React.FC = () => {
  const { boothId, tableNum } = useParams<{ boothId: string; tableNum: string }>();

  useEffect(() => {
    if (!boothId || tableNum === undefined) {
      navigate('/error/order');
      return;
    }

    const numericTableNum = Number(tableNum);
    setBoothId(boothId);
    setTableNum(numericTableNum);
    window.scrollTo(0, 0);
    setIsAgreed(false);
  }, [boothId, tableNum]);

  const navigate = useNavigate();
  const { recentName, recentPhoneNum, setBoothId, setTableNum, setRecentName, setRecentPhoneNum } = useOrderStore();

  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [orderList, setOrderList] = useState<OrderInfo[]>([]);

  // const TAB_TO_ORDER_TYPE: { [key: number]: number } = {
  //   0: -1,
  //   1: 0,
  //   2: 1,
  //   3: 2,
  //   4: 3,
  // };
  // const status = TAB_TO_ORDER_TYPE[selectedTab];
  // const list = status === -1 ? orderList : orderList.filter((order) => order.orderType === status);

  const statusMap: Record<number, string> = {
    0: '입금 대기',
    1: '조리 중',
    2: '조리 완료',
    3: '주문 취소',
  };

  const colorDot: Record<number, string> = {
    0: 'bg-waiting',
    1: 'bg-cooking',
    2: 'bg-prepared',
    3: 'bg-secondary-300',
  };

  const textColor: Record<number, string> = {
    0: 'text-waiting',
    1: 'text-cooking',
    2: 'text-prepared',
    3: 'text-secondary-300',
  };

  const handleSearch = async () => {
    if (recentName.length < 2 || recentPhoneNum.length !== 13 || !recentPhoneNum.startsWith('010') || !isAgreed) return;

    try {
      const rawPhoneNum = recentPhoneNum.replace(/-/g, '');

      const res = await api.get('/main/order', {
        params: { userName: recentName, phoneNum: rawPhoneNum },
      });

      const data = res?.data;
      if (!res.success || !Array.isArray(res.data) || res.data.length === 0) {
        alert('주문 정보가 없습니다.');
        return;
      }

      setOrderList(
        data.map((bill: OrderInfo) => ({
          ...bill,
        })),
      );
      setIsSubmit(true);
      setSelectedTab(0);
    } catch (err) {
      console.error('📛 주문 조회 실패:', err);
      alert('주문 조회 중 오류가 발생했습니다.');
      navigate('/error/order');
    }
  };

  const isInputFill = recentName.length >= 2 && recentPhoneNum.length === 13 && recentPhoneNum.startsWith('010');

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-7 pb-5 pt-[74px]">
      <div className="fixed max-w-[500px] top-0 w-full bg-white z-10 p-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => navigate(`/order/${boothId}/${tableNum}`)}>
          <img src="/icons/header-arrow-back.svg" alt="Back" />
        </button>
        <h1 className="text-lg font-bold select-none">주문 조회</h1>
        <div className="w-6" />
      </div>

      <div className="flex flex-col w-full justify-start items-center gap-4 px-5">
        <div className="w-full h-[19px] font-semibold text-secondary-700 select-none">주문자 정보 입력</div>
        <div className="w-full flex flex-col gap-[30px] px-5 py-[17px] border-2 border-primary-900-light-16 rounded-3xl">
          <div>
            <InputName value={recentName} onChange={setRecentName} />

            <InputPhoneNum value={recentPhoneNum} onChange={setRecentPhoneNum} />
          </div>

          <div className="text-xs text-secondary-500 flex items-start">
            <label htmlFor="agree-checkbox" className="flex items-center">
              <input
                id="agree-checkbox"
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed((prev) => !prev)}
                className="w-4 h-4 mr-2 text-primary-700 rounded focus:ring-primary-700 select-none"
              />
              개인정보 수집 이용 동의 <span className="text-danger select-none">&nbsp;(필수)</span>
            </label>
          </div>

          <button
            className={`h-[51px] w-full select-none text-white font-bold rounded-10xl ${
              isInputFill && isAgreed ? 'bg-primary-700' : 'bg-secondary-100'
            }`}
            onClick={handleSearch}
          >
            조회하기
          </button>
        </div>
      </div>

      {isSubmit && (
        <div className="flex-1 overflow-y-auto w-full max-w-[500px]">
          <div className="flex whitespace-nowrap justify-between no-scrollbar items-center h-[52px] px-3 overflow-x-auto sticky top-0 bg-white z-10">
            {TABS.map((tab, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTab(idx)}
                className={`font-semibold text-xl cursor-pointer flex-shrink-0 px-2 ${
                  idx === selectedTab ? 'text-secondary-700' : 'text-secondary-700-light-50'
                }`}
              >
                {tab}
                {idx === selectedTab && <div className="h-1 bg-primary-700 w-full rounded-full mt-1"></div>}
              </div>
            ))}
          </div>
          <div className="w-screen bg-secondary-300 h-[0.3px] px-3 "></div>

          <div className="px-5 py-5 flex flex-col gap-6">
            {selectedTab === 0 ? (
              [0, 1, 2, 3].map((status) => {
                const list = orderList.filter((order) => order.orderType === status);

                return (
                  <div key={status}>
                    <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                      <div className={`w-3 h-3 rounded-full ${colorDot[status]}`} />
                      <div className="text-secondary-500">{statusMap[status]}</div>
                      <div className={`${textColor[status]}`}>({list.length})</div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {list.length > 0 ? (
                        list.map((order, idx) => <OrderDetail key={idx} orderInfo={order} />)
                      ) : (
                        <div className="text-sm text-gray-400 select-none">주문이 없습니다.</div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                {(() => {
                  const TAB_TO_ORDER_TYPE = {
                    1: 0,
                    2: 1,
                    3: 2,
                    4: 3,
                  };
                  const status = TAB_TO_ORDER_TYPE[selectedTab as keyof typeof TAB_TO_ORDER_TYPE];
                  const list = orderList.filter((order) => order.orderType === status);
                  return (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                        <div className={`w-3 h-3 rounded-full ${colorDot[status]}`} />
                        <div className="text-secondary-500">{statusMap[status]}</div>
                        <div className={`${textColor[status]}`}>({list.length})</div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {list.length > 0 ? (
                          list.map((order, idx) => <OrderDetail key={idx} orderInfo={order} />)
                        ) : (
                          <div className="text-sm text-gray-400 select-none">주문이 없습니다.</div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSearchPage;
