import { Client, IMessage } from '@stomp/stompjs';
import { useOrderStore } from '@/stores/orders/orderStore';
import type { MenuListItem } from '@/types/WebSocket.types';
import { useSocketStore } from '@/stores/socketStore';

export const connectOrderSocket = (boothId: string, tableNum: number) => {
  const { client, setClient } = useSocketStore.getState();

  if (client && client.connected) return;

  const newClient = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    reconnectDelay: 5000,
    onConnect: (frame) => {
      console.log(frame);
      const sessionId = frame.headers['user-name'];
      useSocketStore.getState().setSessionId(sessionId);
      console.log('[WebSocket 연결됨] 내 세션 ID:', sessionId);

      newClient.subscribe(`/topic/${boothId}/${tableNum}`, onMessage);
      newClient.subscribe(`/user/topic/${boothId}/${tableNum}`, onMessage);

      newClient.publish({
        destination: '/app/order',
        body: JSON.stringify({ type: 'SUBSCRIBE', boothId, tableNum }),
      });
    },
  });

  newClient.activate();
  setClient(newClient);
};
export const disconnectOrderSocket = (boothId: string, tableNum: number) => {
  const { client, clearClient } = useSocketStore.getState();

  if (client && client.connected) {
    client.publish({
      destination: '/app/order',
      body: JSON.stringify({ type: 'UNSUB', boothId, tableNum }),
    });

    client.deactivate();
    clearClient();
  }
};

const onMessage = (message: IMessage) => {
  const data = JSON.parse(message.body);
  const set = useOrderStore.getState();
  console.log('[Message]: ', data);

  switch (data.type) {
    case 'INIT': {
      const payload = data.payload;
      console.log('[INIT 수신 완료]');
      if (Array.isArray(payload.menuList)) {
        const fullList = payload.menuList.map((menu: MenuListItem) => {
          const existing = set.menuInfo.find((m) => m.menuId === menu.menuId);
          return {
            menuId: menu.menuId,
            menuName: existing?.menuName || '',
            menuPrice: existing?.menuPrice || 0,
            menuDescription: existing?.menuDescription || '',
            menuImage: existing?.menuImage || '',
            menuType: existing?.menuType || 0,
            isSoldOut: existing?.isSoldOut || false,
            menuCount: menu.menuCount,
          };
        });

        if (set.userOrderList.length === 0) {
          set.setUserOrderList(fullList);
        }
      }

      set.setMemberCount(payload.memberCount);
      set.setTotalPrice(payload.totalPrice);
      set.setRemainingMinutes(payload.remainingMinutes);

      
      break;
    }

    case 'MEMBERUPDATE': {
      set.setMemberCount(data.payload.memberCount);
      break;
    }
    case 'MENUUPDATE': {
      const { menuId, menuCount, totalPrice } = data.payload;

      const { userOrderList, addOrderItem, setTotalPrice } = useOrderStore.getState();
      const existing = userOrderList.find((item) => item.menuId === menuId);

      addOrderItem({
        menuId,
        menuName: existing?.menuName || '',
        menuPrice: existing?.menuPrice || 0,
        menuCount,
      });

      if (typeof totalPrice === 'number') {
        setTotalPrice(totalPrice);
      }

      break;
    }

    case 'STARTORDER': {
      const senderSessionId = message.headers['excludeSessionId'];
      const mySessionId = useSocketStore.getState().sessionId;

      if (!senderSessionId || !mySessionId) {
        alert('세션 정보가 없습니다. 다시 접속해주세요.');
        window.location.reload();
        return;
      }

      const isNotOrderingUser = senderSessionId !== mySessionId;

      if (isNotOrderingUser) {
        useOrderStore.getState().setIsOrderInProgress(true);
        useOrderStore.getState().setOrderingSessionId(senderSessionId);
        alert('다른 사용자가 주문을 시작했습니다. 메뉴를 수정할 수 없습니다.');
      }

      break;
    }

    case 'ORDERINPROGRESS': {
      useOrderStore.getState().setIsOrderInProgress(true);
      break;
    }
    case 'ORDERDONE': {
      useOrderStore.getState().setIsOrderInProgress(false);
      useOrderStore.getState().setOrderingSessionId(null);
      alert(' 주문이 완료되었습니다.');
      break;
    }

    case 'ORDERCANCEL': {
      useOrderStore.getState().setIsOrderInProgress(false);
      useOrderStore.getState().setOrderingSessionId(null);
      alert(' 주문이 취소되었습니다. 다시 주문해주세요.');
      break;
    }

    case 'TIMEUPDATE': {
      set.setRemainingMinutes(data.payload.remainingMinutes);
      break;
    }
    case 'PRESESSIONEND': {
      alert('⚠️ 세션이 1분 후 종료됩니다.');
      break;
    }
    case 'SESSIONEND': {
      alert('❌ 세션이 종료되었습니다. 처음 화면으로 돌아갑니다.');
      window.location.href = `/order/${data.boothId}/${data.tableNum}`;
      break;
    }

    case 'ERROR': {
      console.error('서버 오류:', data.payload);
      break;
    }
    default:
      console.warn('알 수 없는 메시지 타입:', data);
      break;
  }
};

type WebSocketPayload = {
  type: 'MENUADD' | 'MENUSUB' | 'STARTORDER' | 'UNSUB' | 'INIT' | 'ORDERINPROGRESS' | 'ORDERDONE'|'ORDERCANCEL';
  boothId: string;
  tableNum: number;
  payload?: {
    menuId?: string;
    menuCount?: number;
    totalPrice?: number;
    totalCount?: number;
  };
};

export const sendWebSocketMessage = (payload: WebSocketPayload) => {
  const { client } = useSocketStore.getState();

  console.log('payload', payload);

  client?.publish({
    destination: '/app/order',
    body: JSON.stringify(payload),
  });
};
