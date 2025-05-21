import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auths/authStore';
import PersonalInfo from '@/components/commons/PersonalInfo';
import Header from '@/components/headers/Header';
import useBaseModal from '@/stores/baseModal';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';

const RegisterPage: React.FC = () => {
  const {
    verifyCode,
    setUserName,
    setUserPhoneNum,
    setUserStudentNum,
    setVerifyCode,
    saveUserInfo,
    sendAuthorizationCode,
  } = useAuthStore();

  const navigate = useNavigate();

  const { openModal, closeModal } = useBaseModal();

  const { isAgreed } = usePersonalInfoStore();

  const [showCodeInput, setShowCodeInput] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputPhoneNum, setInputPhoneNum] = useState('');
  const [inputStudentNum, setInputStudentNum] = useState('');
  const [isVerification, setIsVerification] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const [errors, setErrors] = useState({
    name: '',
    studentNum: '',
    phone: '',
    code: '',
    personalInfo: '',
  });

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const resetInputs = () => {
    setInputName('');
    setInputPhoneNum('');
    setInputStudentNum('');
    setVerifyCode('');
    setShowCodeInput(false);
    setTimeLeft(0);
    if (timerId) clearInterval(timerId);
  };

  const handleClickVerifyButton = async () => {
    if (!inputName.trim() || !inputPhoneNum.trim() || !inputStudentNum.trim()) {
      alert('이름, 전화번호, 학번을 모두 입력해주세요.');
      return;
    } else if (!isAgreed) {
      alert('개인정보 수집 동의 여부를 체크해주세요.');
      return;
    }

    setUserName(inputName);
    setUserPhoneNum(inputPhoneNum);
    setUserStudentNum(inputStudentNum);

    openModal('loadingModal');

    const result = await sendAuthorizationCode();
    if (result.success) {
      closeModal();

      setShowCodeInput(true);
      setIsVerification(true);

      if (timerId) clearInterval(timerId);

      setTimeLeft(180);
      const newTimerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(newTimerId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimerId(newTimerId);
    } else {
      closeModal();
      alert(result.message);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filtered = e.target.value.replace(/[^a-zA-Zㄱ-ㅎ가-힣]/g, '');
    if (filtered.length > 5) {
      filtered = filtered.slice(0, 5);
    }
    setInputName(filtered);
  };

  const handleChangeStudentNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputStudentNum = e.target.value;
    setInputStudentNum(inputStudentNum);
  };

  const handleChangePhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNum = e.target.value;
    const formatted = formatPhoneNumber(inputPhoneNum);
    setInputPhoneNum(formatted);
  };

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  const handleClickRegister = async () => {
    const newErrors = {
      name: inputName ? '' : '이름을 입력해주세요.',
      studentNum: inputStudentNum ? '' : '학번을 입력해주세요.',
      phone: inputPhoneNum ? '' : '전화번호를 입력해주세요.',
      code: showCodeInput && (verifyCode.trim() === '' || timeLeft === 0) ? '유효한 인증번호를 입력해주세요.' : '',
      personalInfo: isAgreed ? '' : '개인정보 수집에 동의해주세요.',
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((v) => v !== '');
    if (hasError) return;

    const result = await saveUserInfo();
    if (result.success) {
      alert('회원가입에 성공했습니다!');
      resetInputs();
      navigate('/');
      openModal('loginModal');
    } else {
      alert(`회원가입 실패: ${result.message}`);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerId]);

  return (
    <>
      <Header />

      <div className="max-w-[500px] w-full h-[60px] bg-white flex justify-between items-center px-6 shadow-xs z-50">
        <img src="/icons/homes/arrow-back.svg" className="w-5 cursor-pointer" onClick={handleClickBackButton} />
        <p className="font-medium text-xl">회원가입</p>
        <div className="w-7"></div>
      </div>

      <div className="dynamic-padding dynamic-bottom flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="pt-6">
            <label className="flex text-base font-medium pb-2 px-1">이름</label>
            <input
              type="text"
              id="name"
              placeholder="실명을 입력해주세요"
              value={inputName}
              onChange={handleChangeName}
              className="w-full h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1 px-1">{errors.name}</p>}
          </div>

          <div>
            <label className="flex text-base font-medium pb-2 px-1">학번</label>
            <input
              type="tel"
              inputMode="numeric"
              id="studentNum"
              placeholder="학번을 입력해주세요"
              value={inputStudentNum}
              onChange={handleChangeStudentNum}
              className="w-full h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
              maxLength={10}
            />
            {errors.studentNum && <p className="text-xs text-red-600 mt-1 px-1">{errors.studentNum}</p>}
          </div>

          <div>
            <label className="flex text-base font-medium pb-2 px-1">전화번호</label>
            <div className="flex gap-2">
              <input
                type="tel"
                inputMode="numeric"
                id="phone"
                placeholder="010-0000-0000"
                value={inputPhoneNum}
                onChange={handleChangePhoneNum}
                className="w-4/5 h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
                maxLength={13}
              />
              <button
                onClick={handleClickVerifyButton}
                className="w-1/5 px-4 py-4 font-bold text-primary-900 bg-white border-2 border-primary-900 rounded-10xl active:text-white active:bg-primary-900"
              >
                {isVerification ? '재전송' : '인증'}
              </button>
            </div>
            {errors.phone && <p className="text-xs text-red-600 mt-1 px-1">{errors.phone}</p>}

            {showCodeInput && (
              <div className="pt-3">
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="인증번호를 입력해주세요"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="w-full h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
                  disabled={timeLeft === 0}
                />
                <p className="pt-2 px-1 text-sm text-red-600 text-left">
                  {timeLeft > 0
                    ? `남은 시간: ${Math.floor(timeLeft / 60)
                        .toString()
                        .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
                    : '인증시간이 만료되었습니다. 다시 인증해주세요.'}
                </p>
                {errors.code && <p className="text-xs text-red-600 mt-1 px-1">{errors.code}</p>}
              </div>
            )}
          </div>
          <div>
            <div className="px-1">
              <PersonalInfo />
            </div>
            {errors.personalInfo && <p className="text-xs text-red-600 mt-1 px-1">{errors.personalInfo}</p>}
          </div>
          <button
            type="button"
            className="w-full h-14 py-4 px-5 text-base font-bold text-white bg-primary-900  border-primary-800 rounded-10xl focus:outline-none"
            onClick={() => handleClickRegister()}
          >
            회원가입하기
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
