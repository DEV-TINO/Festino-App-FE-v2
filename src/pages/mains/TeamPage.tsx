import Header from '@/components/headers/Header';
import Profile from '@/components/teamreview/Profile';
import { Member } from '@/components/teamreview/Profile';
import { openNewTap } from '@/utils/utils';

const TeamReviewPage: React.FC = () => {
  const members: Member[] = [
    {
      name: '김성준',
      major: '컴퓨터공학부',
      position: '총괄리더',
      image: './images/teamreview/profiles/seongjun.svg',
      blog: 'https://kim-song-jun.github.io/',
    },
    {
      name: '이승민',
      major: '컴퓨터공학부',
      position: '부리더 | BE팀장',
      image: './images/teamreview/profiles/seungmin.svg',
      blog: 'https://seeungmin.github.io/',
    },
    {
      name: '이희연',
      major: '컴퓨터공학부',
      position: 'FE팀장',
      image: './images/teamreview/profiles/huiyeon.svg',
      blog: 'https://heedonguri.tistory.com/',
    },
    {
      name: '정지훈',
      major: '디자인공학부',
      position: 'UX/UI 팀장',
      image: './images/teamreview/profiles/jihun.svg',
      blog: '',
    },
    {
      name: '임정윤',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teamreview/profiles/jeongyun.svg',
      blog: 'https://hmyang.tistory.com/',
    },
    {
      name: '김민지',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teamreview/profiles/minji.svg',
      blog: 'https://alswlfjddl.tistory.com/',
    },
    {
      name: '진효찬',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teamreview/profiles/hyochan.svg',
      blog: 'https://gycks0225.tistory.com',
    },
    {
      name: '최세연',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teamreview/profiles/seyeon.svg',
      blog: 'https://velog.io/@seyeonnnn/posts',
    },
    {
      name: '김경민',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teamreview/profiles/gyeongmin.svg',
      blog: 'https://velog.io/@rvbear/posts',
    },
    {
      name: '김예린',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teamreview/profiles/yerin.svg',
      blog: 'https://velog.io/@niireymik/posts',
    },
    {
      name: '김태건',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teamreview/profiles/taegeon.svg',
      blog: 'https://idyidy.tistory.com/',
    },
    {
      name: '유수현',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teamreview/profiles/suhyeon.svg',
      blog: 'https://blog.naver.com/dbtngus20',
    },
    {
      name: '김규리',
      major: '디자인공학부',
      position: 'UX/UI팀원',
      image: './images/teamreview/profiles/gyuri.svg',
      blog: '',
    },
    {
      name: '임혜지',
      major: '디자인공학부',
      position: 'UX/UI팀원',
      image: './images/teamreview/profiles/hyeji.svg',
      blog: '',
    },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-col w-full items-center justify-center px-5 gap-4 pt-14 pb-14">
        <div className="text-primary-900 text-xs font-bold text-center">FESTINO</div>
        <div className="text-primary-900 text-2xl font-bold text-center">페스티노 개발진 소개</div>
        <div className="text-[#4B4B4B] text-base text-center">
          한국공학대학교 컴퓨터공학부 9명과
          <br />
          디자인공학부 3명으로 제작된 프로젝트
        </div>
        <div className="grid grid-cols-2 w-full sm:px-4 justify-center pt-8 gap-x-2.5 gap-y-4 justify-items-center">
          {members.map((member, index) => (
            <Profile key={index} member={member} />
          ))}{' '}
        </div>
      </div>
      <div className="dynamic-bottom flex flex-col w-full bg-primary-900-light-12 py-[60px] px-[20px] justify-center items-center">
        <div className="text-primary-900 text-2xl font-bold text-center">
          한국공학대학교
          <br />
          개발 소모임 Dev-Tino
        </div>
        <div className="text-[#4B4B4B] text-xs font-medium text-center pt-4 pb-[25px]">
          컴퓨터공학부 개발 소모임 팀 Dev-TINO는
          <br />
          지식과 경험을 공유하며 함께 성장하는 개발 소모임입니다.
          <br />
          학생들이 모여 다양한 프로젝트와 활동을 통해 서로의 성장과 발전을 도모합니다.
        </div>
        <button
          onClick={() => openNewTap('https://github.com/DEV-TINO')}
          className="bg-white text-xs w-28 font-bold flex items-center justify-center text-primary-900 m-0 px-[4.45px] py-2 rounded-[6px] border-[1px] border-[#999999]/30 gap-[5px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M117.18 188.74a12 12 0 0 1 0 17l-5.12 5.12A58.26 58.26 0 0 1 70.6 228a58.62 58.62 0 0 1-41.46-100.08l34.75-34.75a58.64 58.64 0 0 1 98.56 28.11a12 12 0 1 1-23.37 5.44a34.65 34.65 0 0 0-58.22-16.58l-34.75 34.75A34.62 34.62 0 0 0 70.57 204a34.4 34.4 0 0 0 24.49-10.14l5.11-5.12a12 12 0 0 1 17.01 0M226.83 45.17a58.65 58.65 0 0 0-82.93 0l-5.11 5.11a12 12 0 0 0 17 17l5.12-5.12a34.63 34.63 0 1 1 49 49l-34.81 34.7A34.4 34.4 0 0 1 150.61 156a34.63 34.63 0 0 1-33.69-26.72a12 12 0 0 0-23.38 5.44A58.64 58.64 0 0 0 150.56 180h.05a58.28 58.28 0 0 0 41.47-17.17l34.75-34.75a58.62 58.62 0 0 0 0-82.91"
            />
          </svg>
          <span>Dev-Tino</span>
        </button>
        <div className="flex gap-[7px] pt-[25px]">
          <div className="flex flex-col gap-[5px]">
            <img src="./images/teamreview/play-tino.svg" alt="play-tino" />
            <div className="text-[#4B4B4B] text-2xs font-medium">- Play-Tino</div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <img src="./images/teamreview/festino.svg" alt="festino" />
            <div className="text-[#4B4B4B] text-2xs font-medium">- Festino</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamReviewPage;
