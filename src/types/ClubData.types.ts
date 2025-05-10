export interface MusicItem {
  artist: string;
  title: string;
  performer: string;
}

export interface ClubData {
  clubId: string;
  performer: string;
  showDate: string;
  showStartTime: string;
  showEndTime: string;
  clubImage: string;
  clubDescription: string;
  instagram: string;
  musicList: MusicItem[];
  isShowing: boolean;
}

export interface TimetableStore {
  clubData: ClubData[];
  getClubTimetable: (date: number) => void;
  selectedClub: ClubData | null;
  setSelectedClub: (club: ClubData) => void;
}

export interface ClubProps {
  club: ClubData;
}