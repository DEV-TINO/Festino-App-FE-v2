import { Client, IMessage } from '@stomp/stompjs';
import { useOrderStore } from '@/stores/orders/orderStore';
import type { MenuListItem } from '@/types/WebSocket.types';
import { useSocketStore } from '@/stores/socketStore';
import useBaseModal from '@/stores/baseModal';

export const connectOrderSocket = (boothId: string, tableNum: number) => {
  const { client, setClient, clearClient } = useSocketStore.getState();

  if (client) {
    if (client.connected || client.active) return; // 중복 방지: 연결 중이면 리턴

    try {
      client.deactivate(); // 이전 연결 명시적 해제
    } catch (e) {
      console.warn('기존 소켓 종료 실패:', e);
    }
    clearClient(); // 상태 초기화
  }

  const newClient = new Client({
    brokerURL: import.meta.env.VITE_SOCKET_URL,
    reconnectDelay: 0,
    debug: () => {},
    onWebSocketError: (error) => {
      alert('주문 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('WebSocket 오류:', error);
      localStorage.removeItem('orderSessionId');
    },
    onConnect: (frame) => {
      if (!localStorage.getItem('orderSessionId')) {
        const sessionId = frame.headers['user-name'];
        localStorage.setItem('orderSessionId', sessionId);
      }

      newClient.subscribe(`/topic/${boothId}/${tableNum}`, onMessage);
      newClient.subscribe(`/user/topic/${boothId}/${tableNum}`, onMessage);
    },
  });

  newClient.activate();
  setClient(newClient);
};

export const disconnectOrderSocket = async (boothId: string, tableNum: number) => {
  const { client, clearClient, sessionId } = useSocketStore.getState();

  if (client && client.connected) {
    try {
      client.publish({
        destination: '/app/order',
        body: JSON.stringify({
          type: 'UNSUBSCRIBE',
          boothId,
          tableNum,
          sessionId,
        }),
      });

      await client.deactivate();
    } catch (err) {
      console.warn('disconnectOrderSocket WebSocket 오류:', err);
    }

    clearClient();
  }
};

const onMessage = (message: IMessage) => {
  const data = JSON.parse(message.body);
  const set = useOrderStore.getState();

  switch (data.type) {
    case 'INIT': {
      const payload = data.payload;
      const {
        orderInProgress,
        orderInitiatorId, // 서버에서 받는 주문자의 세션 ID
      } = payload;

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

      const mySessionId = localStorage.getItem('orderSessionId');

      if (orderInProgress) {
        set.setIsOrderInProgress(true);
        set.setOrderingSessionId(orderInitiatorId);
        if (orderInitiatorId !== mySessionId) {
          useBaseModal.getState().openModal('orderInProgressModal');
        }
      } else {
        set.setIsOrderInProgress(false);
        set.setOrderingSessionId(null);
      }

      break;
    }

    case 'MEMBERUPDATE': {
      const { memberCount } = data.payload;
      const current = useOrderStore.getState().memberCount;

      if (memberCount !== current) {
        useOrderStore.getState().setMemberCount(memberCount);
      }
      break;
    }

    case 'MENUUPDATE': {
      const { menuId, menuCount, totalPrice } = data.payload;

      const { menuInfo, addOrderItem, setTotalPrice } = useOrderStore.getState();
      const existing = menuInfo.find((item) => item.menuId === menuId);

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
      const mySessionId = localStorage.getItem('orderSessionId');

      if (!senderSessionId || !mySessionId) {
        alert('세션 정보가 없습니다. 다시 접속해주세요.');
        window.location.href = '/order/retry-qr';
        return;
      }

      const isNotOrderingUser = senderSessionId !== mySessionId;

      if (isNotOrderingUser) {
        useOrderStore.getState().setIsOrderInProgress(true);
        useOrderStore.getState().setOrderingSessionId(senderSessionId);
        useBaseModal.getState().openModal('orderInProgressModal');
      }

      break;
    }

    case 'ORDERINPROGRESS': {
      const senderSessionId = message.headers['excludeSessionId'];
      const mySessionId = localStorage.getItem('orderSessionId');

      if (!senderSessionId || !mySessionId) {
        console.warn('세션 ID 없음: ORDERINPROGRESS 메시지');
        return;
      }

      const isNotOrderingUser = senderSessionId !== mySessionId;

      if (isNotOrderingUser) {
        useOrderStore.getState().setIsOrderInProgress(true);
        useOrderStore.getState().setOrderingSessionId(senderSessionId);
        useBaseModal.getState().openModal('orderInProgressModal');
      }

      break;
    }

    case 'ORDERDONE': {
      const set = useOrderStore.getState();

      set.setIsOrderInProgress(false);
      set.setOrderingSessionId(null);
      set.resetOrderInfo();

      useBaseModal.getState().openModal('orderCompleteModal');
      break;
    }

    case 'ORDERCANCEL': {
      useOrderStore.getState().setIsOrderInProgress(false);
      useOrderStore.getState().setOrderingSessionId(null);
      useBaseModal.getState().closeModal();
      break;
    }

    case 'TIMEUPDATE': {
      useOrderStore.getState().setRemainingMinutes(data.payload.remainingMinutes);
      break;
    }

    case 'PRESESSIONEND': {
      const minutes = data.payload?.remainingMinutes;

      if (minutes === 1) {
        useOrderStore.getState().setRemainingMinutes(1);
        useBaseModal.getState().openModal('oneMinuteModal');
      }

      break;
    }

    case 'SESSIONEND': {
      const state = useOrderStore.getState();
      const boothId = state.boothId;
      const tableNum = state.tableNum;
      const sessionId = localStorage.getItem('orderSessionId');

      if (boothId && typeof tableNum === 'number' && sessionId) {
        sendWebSocketMessage({
          type: 'UNSUB',
          boothId,
          tableNum,
        });
        disconnectOrderSocket(boothId, tableNum);
      }

      useBaseModal.getState().openModal('timeOverModal');

      break;
    }

    case 'UNSUB': {
      console.log('Someone unsubscribed:', data);
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
  type: 'MENUADD' | 'MENUSUB' | 'STARTORDER' | 'UNSUB' | 'INIT' | 'ORDERINPROGRESS' | 'ORDERDONE' | 'ORDERCANCEL';
  boothId: string;
  tableNum: number;
  payload?: {
    menuId?: string;
    menuCount?: number;
    totalPrice?: number;
    totalCount?: number;
  };
  clientId?: string;
};

export const sendWebSocketMessage = (payload: WebSocketPayload) => {
  const { client } = useSocketStore.getState();

  if (!client || !client.connected) {
    return;
  }

  console.log(payload);

  try {
    client.publish({
      destination: '/app/order',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error('메시지 전송 중 오류 발생:', e);
  }
};
