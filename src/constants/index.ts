import BoothIcon from '@/icons/commons/BoothIcon';
import HomeIcon from '@/icons/commons/HomeIcon';
import TablingIcon from '@/icons/commons/TablingIcon';
import TimeTableIcon from '@/icons/commons/TimeTableIcon';

export const ICON_URL_MAP = [
  { name: '홈', component: HomeIcon, width: '28px', router: '' },
  { name: '타임테이블', component: TimeTableIcon, url: '/icons/acute.svg', width: '44px', router: 'timetable' },
  { name: '부스', component: BoothIcon, url: '/icons/distance.svg', width: '28px', router: 'booths' },
  { name: '테이블링', component: TablingIcon, url: '/icons/hourglass_bottom.svg', width: '35px', router: 'reserve' },
];

export const BOOTH_CATEGORY = [
  { id: 0, name: '전체' },
  { id: 1, name: '야간부스' },
  { id: 2, name: '주간부스' },
  { id: 3, name: '푸드트럭' },
  { id: 4, name: '편의시설' },
];

export const BOOTH_TYPE = [
  { category: '야간부스', type: 'night' },
  { category: '주간부스', type: 'day' },
  { category: '푸드트럭', type: 'food' },
  { category: '편의시설', type: 'facility' },
];

export const BOOTH_TYPE_MAP: Record<string, string> = {
  야간부스: 'night',
  주간부스: 'day',
  푸드트럭: 'food',
  편의시설: 'facility',
};

export const SLOGAN_MAP: Record<string, string> = {
  야간부스: '먹거리가 가득한',
  주간부스: '즐거움이 가득한',
  푸드트럭: '먹거리가 가득한',
};

export const TABS = {
  TIME_TABLE: '타임테이블',
  NOTICE: '공지사항',
};

export const COUNCIL_URL = 'https://www.instagram.com/tukorea_drama/';

export const REGEX = /^010/;

export const FLOATING_SIZE = 60;

export const HIDE_PATHS: string[] = ['/register', '/order', '/reserve', '/review', '/photo-board', '/teams'];
