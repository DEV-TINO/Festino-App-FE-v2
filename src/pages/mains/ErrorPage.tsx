// import { useOrderStore } from '@/stores/orders/useOrderStore';
import { useNavigate, useParams } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  // const { boothId, tableNum } = useOrderStore();

  const handleClickGoMainButton = () => {
    if (page === 'main' || page === 'pathMismatch') {
      navigate('/');
    } else if (page === 'order') {
      // navigate(`/order/${boothId}/${tableNum}`);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[30px] h-screen">
        <div className="bg-error rounded-full w-12 h-12 flex justify-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="text-xl text-center">
          에러가 발생했습니다.
          <br />
          다시 시도해주세요.
        </div>
        <img src="/images/tinos/error.svg" />
        {page && page !== 'NotFound' && (
          <button
            onClick={handleClickGoMainButton}
            className="h-12 text-xl text-white bg-primary-900 rounded-3xl font-semibold w-4/5"
          >
            메인으로 가기
          </button>
        )}
      </div>
    </>
  );
};

export default ErrorPage;
