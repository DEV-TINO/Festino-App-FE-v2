import useNavTapStore from '@/stores/headers/navTapStore';
import useBaseModal from '@/stores/baseModal';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/auths/authStore';
import TimeTableIcon from '../../icons/commons/TimeTableIcon';
import BoothIcon from '@/icons/commons/BoothIcon';
import TablingIcon from '@/icons/commons/TablingIcon';
import IconDeveloper from '@/icons/events/IconDeveloper';
import IconEvent from '@/icons/events/IconEvent';
import IconNotice from '@/icons/events/IconNotice';
import IconDropDown from '@/icons/events/IconDropDown';
import IconProfile from '@/icons/events/IconProfile';

const NavTap = () => {
  const navigate = useNavigate();

  const { isOpen, close } = useNavTapStore();
  const { openModal } = useBaseModal();
  const { isLogin } = useAuthStore();

  const userName = localStorage.getItem('userName');

  const login = isLogin();

  const [isEventOpen, setIsEventOpen] = useState(false);
  const toggleEvent = () => setIsEventOpen((prev) => !prev);

  useEffect(() => {
    const root = document.getElementById('root');

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (root) root.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (root) root.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (root) root.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
        onClick={close}
      />
      <div
        className={`absolute top-0 left-0 w-5/6 bg-white z-50 shadow-md transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-scroll`}
      >
        <div className="flex h-screen flex-col gap-12">
          <div className="flex h-[60px] w-full items-center justify-end px-5">
            <div
              className="fixed top-4 w-[22px] h-[22px] bg-header-navigation-bar bg-center bg-no-repeat bg-[length:22px_22px]
            cursor-pointer"
              onClick={close}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {login ? (
              <div
                className={`w-[80px] h-[80px] bg-header-team-introduction bg-center bg-no-repeat bg-[length:80px_80px]`}
              ></div>
            ) : (
              <div
                className="cursor-pointer"  
                onClick={() => {
                  close();
                  openModal('loginModal');
                }}
              >
                <IconProfile />
              </div>
            )}

            <div
              className="text-center font-bold text-lg cursor-pointer"
              onClick={() => {
                if (!login) {
                  close();
                  openModal('loginModal');
                }
              }}
            >
              {login && userName ? `${userName}님 환영합니다!` : '로그인'}
            </div>
          </div>

          <ul className="space-y-6 text text-secondary-700 select-none">
            <li
              onClick={() => {
                navigate('/timetable');
                close();
              }}
              className="px-6 cursor-pointer flex items-center gap-4"
            >
              <div className="p-[3px]">
                <TimeTableIcon />
              </div>
              <div className="text-lg text-secondary-300 font-bold">타임테이블</div>
            </li>

            <li
              onClick={() => {
                navigate('/booths');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="p-[3px]">
                <BoothIcon />
              </div>
              <div className="text-lg text-secondary-300 font-bold">부스 정보</div>
            </li>

            <li
              onClick={() => {
                navigate('/reserve');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="p-[3px]">
                <TablingIcon />
              </div>
              <div className="text-lg text-secondary-300 font-bold">테이블링</div>
            </li>

            <li
              onClick={() => {
                navigate('/notices');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="p-1">
                <IconNotice />
              </div>
              <div className="text-lg text-secondary-300 font-bold">공지사항</div>
            </li>

            <li
              onClick={() => {
                navigate('/teams');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="p-1.5">
                <IconDeveloper />
              </div>
              <div className="text-lg text-secondary-300 font-bold">개발자 소개</div>
            </li>

            <div
              className={`px-6 py-2 w-full items-center transition-colors duration-200 ${isEventOpen ? 'bg-gray-100' : ''}`}
            >
              <li className="cursor-pointer flex items-center gap-2" onClick={toggleEvent}>
                <div className="flex w-full justify-between">
                  <div className="flex gap-4">
                    <IconEvent />
                    <div className="text-lg text-secondary-300 font-bold">이벤트</div>
                  </div>
                  <div>
                    <div
                      className={`w-7 h-7 flex items-center justify-center bg-center bg-no-repeat transition-transform duration-300 ${isEventOpen ? 'rotate-180' : 'rotate-0'} `}
                    >
                      <IconDropDown />
                    </div>
                  </div>
                </div>
              </li>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden origin-top ${isEventOpen ? 'opacity-100 scale-y-100 max-h-40' : 'opacity-0 scale-y-0 max-h-0'}`}
              >
                <ul className="pl-[42px]  space-y-4 text-base font-semibold text-secondary-400">
                  <li
                    className="cursor-pointer px-2 pt-2"
                    onClick={() => {
                      navigate('/review');
                      close();
                    }}
                  >
                    리뷰 이벤트
                  </li>
                  <li
                    className="cursor-pointer px-2"
                    onClick={() => {
                      openModal('quizModal');
                      close();
                    }}
                  >
                    실시간 퀴즈 이벤트
                  </li>
                  <li
                    className="cursor-pointer px-2"
                    onClick={() => {
                      navigate('/photo-board');
                      close();
                    }}
                  >
                    사진 업로드 이벤트
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavTap;
