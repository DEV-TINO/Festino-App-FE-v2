import { usePersonalInfoStore } from '@/stores/personalInfoStore';

const EventPersonalInfo: React.FC = () => {
  const { isAgreed, toggleIsAgreed } = usePersonalInfoStore();

  return (
    <label className="flex items-center text-sm font-medium text-secondary-700">
      {/* <input
        checked={isAgreed}
        onChange={toggleIsAgreed}
        type="checkbox"
        // className="w-4 h-4 mr-2 text-primary-700 bg-gray-100 border-gray-300 rounded-4xl  focus:ring-offset-1 focus:ring-1 focus:rounded-3xl select-none checked:bg-primary-700 checked:border-primary-900 checked:text-white"
        className="w-4 h-4 mr-2 accent-primary-700 rounded-4xl  focus:ring-offset-1 focus:ring-1 focus:rounded-3xl select-none checked:bg-primary-700 checked:border-primary-900 checked:text-white"
      />      
      개인정보 수집 • 이용 동의 (필수) */}
      <input type="checkbox" checked={isAgreed} onChange={toggleIsAgreed} className="hidden peer" />
      <span
        className={`w-4 h-4 border-2 rounded-sm  flex items-center justify-center transition-colors duration-200 ${isAgreed ? 'bg-primary-900 border-primary-900' : 'bg-white border-gray-500'}`}
      >
        <img
          src="/icons/commons/check.svg"
          alt="check"
          className={`w-2.5 h-2.5 ${isAgreed ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        />
      </span>
      <span className="ml-2 text-sm">개인정보 수집 • 이용 동의 (필수)</span>
    </label>
  );
};

export default EventPersonalInfo;
