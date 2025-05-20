import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/utils/api';
import { formatPrice } from '@/utils/utils';
import type { MenuInfo } from '@/stores/orders/orderStore';

const MENU_CATEGORIES = [
  { label: '전체 메뉴', value: 'ALL' },
  { label: '메인 메뉴', value: 0 },
  { label: '서브 메뉴', value: 1 },
  { label: '기타 메뉴', value: 2 },
] as const;

const MenuPage: React.FC = () => {
  const { boothId } = useParams<{ boothId: string }>();
  const [menus, setMenus] = useState<MenuInfo[]>([]);
  const [selectedTab, setSelectedTab] = useState<(typeof MENU_CATEGORIES)[number]['value']>('ALL');

  useEffect(() => {
    if (!boothId) return;
    fetchMenus(selectedTab);
  }, [boothId, selectedTab]);

  const fetchMenus = async (category: 'ALL' | 0 | 1 | 2) => {
    try {
      const endpoint =
        category === 'ALL' ? `/main/menu/all/booth/${boothId}` : `/main/menu/all/booth/${boothId}?menuType=${category}`;
      const res = await api.get(endpoint);
      if (res.data.success && Array.isArray(res.data.data)) {
        setMenus(res.data.data);
      } else {
        setMenus([]);
      }
    } catch (error) {
      console.error('메뉴 가져오기 오류:', error);
      setMenus([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-center">주문하기</h1>
      </div>

      <div className="flex justify-around px-4 py-2 border-b">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedTab === cat.value ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 border-gray-300'
            }`}
            onClick={() => setSelectedTab(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {menus.map((menu) => (
          <div key={menu.menuId} className="flex gap-4 mb-6 border-b pb-4">
            <div
              className="w-24 h-24 rounded-xl bg-center bg-cover border"
              style={{
                backgroundImage: `url(${menu.menuImage || '/images/booth/booth-default-image.png'})`,
              }}
            ></div>
            <div className="flex flex-col justify-between flex-1">
              <div>
                <div className="font-semibold text-gray-800">{menu.menuName}</div>
                <div className="text-sm text-gray-500 mt-1">{menu.menuDescription}</div>
                <div className="text-sm text-gray-500 mt-1">가격: {formatPrice(menu.menuPrice)}원</div>
              </div>
              <div className="mt-2 text-base font-bold text-blue-600">{formatPrice(menu.menuPrice)}원</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
