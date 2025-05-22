import useBaseModal from '@/stores/baseModal';
import { useAuthStore } from '@/stores/auths/authStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { setUserName, setUserPhoneNum, login } = useAuthStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickClose = () => {
    closeModal();
    setUserName('');
    setUserPhoneNum('');
  };

  const [inputName, setInputName] = useState('');
  const [inputPhoneNum, setInputPhoneNum] = useState('');

  const handleLogin = async () => {
    if (!inputName.trim() || !inputPhoneNum.trim()) {
      alert('아이디와 전화번호를 입력해주세요.');
      return;
    }

    setUserName(inputName);
    setUserPhoneNum(inputPhoneNum);

    const success = await login();

    if (success) {
      closeModal();
      if (pathname.includes('/register')) {
        navigate('/');
      }
    }
  };

  const handleClickRegist = () => {
    navigate('/register');
    closeModal();
  };

  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filtered = e.target.value.replace(/[^a-zA-Zㄱ-ㅎ가-힣]/g, '');
    if (filtered.length > 5) filtered = filtered.slice(0, 5);
    setInputName(filtered);
  };

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNum = e.target.value;
    const formatted = formatPhoneNumber(inputPhoneNum);
    setInputPhoneNum(formatted);
  };

  return (
    <div
      className="relative col-start-2 row-start-2 h-full dynamic-width dynamic-padding bg-white rounded-3xl flex flex-col items-center px-6 py-6 gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="absolute top-[30px] right-8 w-[32px] h-[32px]" onClick={() => handleClickClose()}>
        <img src="/icons/commons/x.png" />
      </button>

      <div className="w-full flex flex-col gap-6">
        <h2 className="text-primary-900 text-3xl font-bold text-center">Login</h2>
        <div>
          <label className="flex text-base pb-2 px-1 font-medium">이름</label>

          <div className="flex w-full h-14 items-center border border-primary-900 rounded-full px-4 py-3 gap-2">
            <img src="/icons/tablings/person.svg" alt="user" className="w-5 h-5 opacity-50" />
            <input
              id="inputName"
              type="text"
              placeholder="이름"
              value={inputName}
              onChange={handleChangeUserId}
              className="flex-1 text-base placeholder-secondary-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="flex text-base pb-2 px-1 font-medium">전화번호</label>
          <div className="flex w-full h-14 items-center border border-primary-900 rounded-full px-4 py-3 gap-2">
            <img src="/icons/tablings/phone.svg" alt="phone" className="w-5 h-5 opacity-50" />
            <input
              id="inputPhoneNum"
              type="text"
              placeholder="전화번호"
              value={inputPhoneNum}
              onChange={handleChangePhone}
              className="flex-1 text-base placeholder-secondary-400 focus:outline-none"
              maxLength={13}
            />
          </div>
        </div>

        <button
          className="w-full h-14 bg-primary-900 rounded-full text-white font-semibold text-lg hover:bg-blue-600"
          onClick={handleLogin}
        >
          로그인하기
        </button>

        <p className="text-sm text-secondary-400 text-center">
          계정이 존재하지 않나요?{' '}
          <span className="text-primary-900 font-medium cursor-pointer" onClick={() => handleClickRegist()}>
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
