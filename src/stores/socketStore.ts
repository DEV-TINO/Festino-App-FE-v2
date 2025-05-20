import { Client } from '@stomp/stompjs';
import { create } from 'zustand';

interface SocketStore {
  client: Client | null;
  sessionId: string | null;
  setClient: (client: Client) => void;
  clearClient: () => void;
  setSessionId: (id: string) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  client: null,
  sessionId: null,
  setClient: (client) => set({ client }),
  clearClient: () => set({ client: null, sessionId: null }),
  setSessionId: (id) => set({ sessionId: id }),
}));
