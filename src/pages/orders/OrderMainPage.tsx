import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import OrderMainBanner from '@/components/orders/OrderMainBanner';
import { api } from '@/utils/api';

const OrderMainPage: React.FC = () => {
  console.log('🧭 OrderMainPage 컴포넌트 진입');

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { boothId, tableNum } = useParams<{ boothId: string; tableNum: string }>();
  const { customTableNum, setBoothId, setTableNum, setCustomTableNum, resetOrderInfo } = useOrderStore();

  useEffect(() => {
    window.scrollTo(0, 0);

    const tableIndex = Number(tableNum);
    console.log('✅ OrderMainPage | boothId:', boothId);
    console.log('✅ OrderMainPage | tableNum:', tableNum);
    console.log('✅ OrderMainPage | tableIndex:', tableIndex);
    console.log('✅ OrderMainPage | isUUID:', isUUID(boothId ?? ''));

    if (!boothId || !isUUID(boothId) || isNaN(tableIndex)) {
      console.warn('❌ OrderMainPage | Invalid params → 이동');
      navigate('/error/NotFound');
      return;
    }

    setBoothId(boothId);
    setTableNum(tableIndex);

    getCustomTableNum(tableIndex, boothId)
      .then((tableNumStr) => {
        console.log('✅ customTableNum 응답:', tableNumStr);
        setCustomTableNum(tableNumStr);
      })
      .catch((err) => {
        console.error('❌ getCustomTableNum 실패:', err);
        navigate('/error/NotFound');
      });

    resetOrderInfo();
  }, [pathname]);

  const handleClickFestinoButton = () => navigate('/');
  const handleClickOrderSearchButton = () => navigate(`/order/${boothId}/${tableNum}/search`);
  const handleClickPayment = () => navigate(`/order/${boothId}/${tableNum}/payment`);

  return (
    <div className="flex flex-col">
      <OrderMainBanner />
      <div className="w-full rounded-t-3xl bg-white pt-6 flex flex-col items-center -translate-y-12">
        <div className="h-11 rounded-10xl bg-primary-900-light font-semibold text-primary-900 grid place-items-center px-6 bg-primary-900-light-12">
          테이블 번호 {customTableNum}
        </div>
        <div className="py-11 flex flex-col w-full px-2 gap-y-11 h-full">
          <div className="flex flex-row justify-evenly gap-x-2">
            <button
              onClick={handleClickPayment}
              className="h-72 w-40 min-w-[170px] rounded-3xl flex flex-col justify-start items-center border-2 border-primary-900-lighter gap-6 shadow overflow-hidden cursor-pointer"
            >
              <span className="font-jalnan2 text-2xl text-primary-900 pt-5">주문하기</span>
              <img src="/icons/orders/orderIcon.svg" alt="Order Icon" />
            </button>
            <button
              onClick={handleClickOrderSearchButton}
              className="h-72 w-40 min-w-[170px] rounded-3xl flex flex-col justify-start items-center border-2 border-primary-900-lighter gap-6 shadow cursor-pointer"
            >
              <span className="font-jalnan2 text-2xl text-primary-900 pt-5">주문조회</span>
              <img src="/icons/orders/orderSearch.svg" alt="Order Search Icon" />
            </button>
          </div>
          <div className="relative">
            <img
              src="/images/orders/tino-order-main.png"
              className="w-full h-full cursor-pointer"
              onClick={handleClickFestinoButton}
              alt="Festino Banner"
            />
            <div className="absolute flex flex-col top-2 items-end pointer-events-none xs:right-10 right-5">
              <p className="text-white font-jalnan2 text-xs pt-5">2024 한국공학대학교 축제의 모든 것을 한눈에!</p>
              <h2 className="bg-gradient-to-t from-white/20 to-white text-transparent bg-clip-text font-jalnan2 text-2xl">
                ‘한국공대 축제’
              </h2>
              <button className="border-2 border-white w-[155px] h-[26px] text-white font-bold text-xs rounded-full mt-1">
                페스티노 사이트 바로가기 -&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMainPage;

const isUUID = (uuid: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  return regex.test(uuid);
};

const getCustomTableNum = async (tableNum: number, boothId: string): Promise<string> => {
  const res = await api.get('/main/order/table', {
    params: { tableNumIndex: tableNum, boothId },
  });

  console.log('🌐 getCustomTableNum API 응답:', res);

  if (res.success) return res.data;
  throw new Error('Table number fetch failed');
};

