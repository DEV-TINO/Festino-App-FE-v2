import { openNewTap } from '@/utils/utils';

export interface Member {
  name: string;
  major: string;
  position: string;
  image: string;
  blog: string;
}

interface ProfileProps {
  member: Member;
}

const Profile: React.FC<ProfileProps> = ({ member }) => {
  return (
    <div className="flex w-full border-solid border-[0.39px] rounded-[5.5px] gap-3 items-center p-2 shadow-[0px_1.57px_1.57px_rgba(0,0,0,0.05)]">
      <div className="flex w-[61px] items-center">
        <img src={member.image} alt="`${member.name} 프로필`" className="w-full h-full bg-white" />
      </div>
      <div className="flex flex-col gap-[5px] w-full">
        <div className="gap-[4px]">
          <div className="flex items-baseline space-x-1">
            <div className="text-2xs font-bold">{member.name}</div>
            <div className="text-[#656565] text-3xs font-regular">{member.major}</div>
          </div>
          <div className="text-[#656565] text-3xs font-regular">{member.position}</div>
        </div>
        {member.blog && (
          <button
            type="button"
            className="text-[7px] w-2/3 sm:w-1/2 flex items-center justify-center text-[#656565] m-0 px-[4.45px] p-1 rounded-sm border-[0.39px] border-[#999999]/30 gap-[3px]"
            onClick={() => openNewTap(member.blog)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 256 256">
              <path
                fill="currentColor"
                d="M117.18 188.74a12 12 0 0 1 0 17l-5.12 5.12A58.26 58.26 0 0 1 70.6 228a58.62 58.62 0 0 1-41.46-100.08l34.75-34.75a58.64 58.64 0 0 1 98.56 28.11a12 12 0 1 1-23.37 5.44a34.65 34.65 0 0 0-58.22-16.58l-34.75 34.75A34.62 34.62 0 0 0 70.57 204a34.4 34.4 0 0 0 24.49-10.14l5.11-5.12a12 12 0 0 1 17.01 0M226.83 45.17a58.65 58.65 0 0 0-82.93 0l-5.11 5.11a12 12 0 0 0 17 17l5.12-5.12a34.63 34.63 0 1 1 49 49l-34.81 34.7A34.4 34.4 0 0 1 150.61 156a34.63 34.63 0 0 1-33.69-26.72a12 12 0 0 0-23.38 5.44A58.64 58.64 0 0 0 150.56 180h.05a58.28 58.28 0 0 0 41.47-17.17l34.75-34.75a58.62 58.62 0 0 0 0-82.91"
              />
            </svg>
            <span>개발자 블로그</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
