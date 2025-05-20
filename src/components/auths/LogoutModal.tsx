import { useAuthStore } from '@/stores/auths/authStore';
import useBaseModal from '@/stores/baseModal';

const LogoutModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const { logout } = useAuthStore();

  const handleClickLogout = () => {
    logout();
    closeModal();
  };

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="text-primary-900 text-3xl font-bold">Logout</p>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-500">로그아웃을 진행하시겠습니까?</p>
        </div>
        <div className="w-full flex gap-2">
          <button
            className="w-full h-12 bg-white rounded-3xl text-primary-900 border-2 border-primary-900 font-semibold text-lg"
            onClick={() => closeModal()}
          >
            돌아가기
          </button>
          <button
            className="w-full h-12 bg-primary-900 rounded-3xl text-white font-semibold text-lg"
            onClick={() => handleClickLogout()}
          >
            로그아웃하기
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
