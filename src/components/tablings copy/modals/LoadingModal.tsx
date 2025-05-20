const LoadingModal: React.FC = () => {
  return (
    <div className="relative col-start-2 row-start-2 h-full dynamic-width flex flex-col items-center gap-7">
      <img src="/images/tinos/loading-tino.svg" className="w-[206px]" />
      <div className="text-white font-medium text-center">
        귀여운 티노가
        <br />
        메세지를 보내고 있어요
      </div>
    </div>
  );
};

export default LoadingModal;
