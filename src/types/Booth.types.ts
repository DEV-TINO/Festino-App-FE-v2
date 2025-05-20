export interface CategoryItemProps {
  id: number,
  name: string,
  onClick?: (id: number) => void;
  isSelected?: boolean;
}

export interface AccountInfo {
  account: string;
  accountHolder: string;
  bankName: string;
}

export interface Booth {
  boothId: string;
  boothName: string;
  adminName: string;
  adminCategory: string;
  boothIntro: string;
  boothImage: string | null;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  markerNum: number;
  location: string;
  accountInfo: AccountInfo;
}

export interface BoothInfo extends Omit<Booth, 'boothImage'> {
  boothImage: string[];
  instagram?: string;
  menuList?: Menu[];
  isReservation?: boolean;
  totalReservationNum?: number;
  markerNum: number;
}

export interface BoothItemProps {
  booth: Booth;
  onClick: (type: string, id: string) => void;
  getImageProps: (boothImage: string | null) => { className: string; style: React.CSSProperties };
}

export interface BoothStore {
  boothListAll: Booth[];
  boothListNight: Booth[];
  boothListDay: Booth[];
  boothListFood: Booth[];
  boothListFacility: Booth[];
  boothDetail: BoothInfo | null;
  selectBoothCategory: number;
  isTicketBooth: boolean;
  init: () => void;
  setSelectBoothCategory: (index: number | undefined) => void;
  getBoothList: () => Promise<void>
  getBoothDetail: (type: string, id: string) => Promise<BoothInfo | undefined>;
}

export interface BoothStateLabelProps {
  isState: boolean;
  children: React.ReactNode;
}

export interface Menu {
  menuId: string;
  menuName: string;
  menuDescription: string;
  menuImage: string;
  menuPrice: number;
  isSoldOut: boolean;
  menuType: number;
}

export interface MenuItemProps {
  menu: Menu;
}

export interface ImageSliderProps {
  images: string[];
}

export interface Marker {
  markerNum?: number;
  left: number;
  bottom: number;
  scrollLeft?: number;
  scrollTop?: number;
  count?: number;
  tab?: number;
}

export interface MapSpeechBubbleProps {
  booth: Booth | BoothInfo;
}