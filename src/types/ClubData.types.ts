export interface ClubMusicItem {
  artist: string;
  title: string;
  performer: string;
}

export interface TalentMusicItem {
  title: string;
  youtubeLink: string;
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
  musicList: ClubMusicItem[];
  isShowing: boolean;
}

export interface TalentData {
  talentId: string;
  performer: string;
  showDate: string;
  showStartTime: string;
  showEndTime: string;
  talentImage: string;
  musicList: TalentMusicItem[];
  isShowing: boolean;
}

export interface TimetableStore {
  clubData: ClubData[];
  talentData: TalentData[];
  getClubTimetable: (date: number) => void;
  getTalentTimetable: (date: number) => void;
  selectedClub: ClubData | null;
  setSelectedClub: (club: ClubData) => void;
  selectedTalent: TalentData | null;
  setSelectedTalent: (club: TalentData) => void;
}

export interface ClubProps {
  club: ClubData;
}

export interface TalentProps {
  talent: TalentData;
}