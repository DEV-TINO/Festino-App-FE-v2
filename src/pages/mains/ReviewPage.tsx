import Header from '@/components/headers/Header';
import Review from '@/components/teamreview/Review';

const ReviewPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="border-t-1 flex flex-col w-full items-center justify-center px-6 gap-4 pt-6 pb-24 select-none">
        <div className="text-primary-900 text-2xl font-bold">REVIEW</div>
        <div className="text-secondary-700 text py-4 text-center">
          Festino 서비스를 이용하면서 좋았던
          <br />
          불편했던 점을 작성해주세요!
        </div>
        <Review />
      </div>
    </>
  );
};

export default ReviewPage;