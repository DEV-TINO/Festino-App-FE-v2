import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

const OrderMainBanner: React.FC = () => {
  const { boothId } = useParams<{ boothId: string }>();
  const navigate = useNavigate();
  const [orderMajor, setOrderMajor] = useState('');

  useEffect(() => {
    const fetchBoothInfo = async () => {
      if (!boothId) return;

      try {
        const res = await api.get(`/main/booth/night/${boothId}`);
        if (!res.success) {
          return navigate('/error/order');
        }

        const adminName = res.data?.adminName;
        if (!adminName) {
          return navigate('/error/order');
        }

        setOrderMajor(adminName);
      } catch (err) {
        navigate('/error/order');
      }
    };

    fetchBoothInfo();
  }, [boothId]);


  return (
    <div className="w-full relative">
      <img src="/images/orders/tino-order-banner.svg" className="bg-top w-full" alt="Order Banner" />
      <div className="absolute top-14 left-5 max-xs:top-10 max-xs:left-4">
        <p className="text-white font-jalnan2 select-none">내 자리에서 주문부터 결제까지!</p>
        <p className="text-3xl text-white drop-shadow-lg text-transparent bg-clip-text font-jalnan2 select-none">
          간편 주문 시스템
        </p>
      </div>
      <div className="absolute top-32 left-5 max-xs:top-28 max-xs:left-4">
        <div className="text-primary-700 bg-white font-semibold px-3 py-0.5 rounded-full select-none">{orderMajor}</div>
      </div>
    </div>
  );
};

export default OrderMainBanner;
