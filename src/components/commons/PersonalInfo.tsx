import { usePersonalInfoStore } from '@/stores/personalInfoStore';

const PersonalInfo: React.FC = () => {
  const { isAgreed, toggleIsAgreed } = usePersonalInfoStore();

  return (
    <label className="flex items-center text-sm font-medium text-secondary-700">
      <input
        checked={isAgreed}
        onChange={toggleIsAgreed}
        type="checkbox"
        className="w-4 h-4 mr-2 accent-primary-700 text-primary-700 bg-gray-100 border-gray-300 rounded-4xl focus:ring-primary-700 focus:ring-offset-1 focus:ring-1 focus:rounded-3xl"
      />
      개인정보 수집 • 이용 동의 (필수)
    </label>
  );
};

export default PersonalInfo;
