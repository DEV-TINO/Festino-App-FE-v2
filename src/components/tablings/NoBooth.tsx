const NoBooth: React.FC = () => {
  return (
    <>
      <div className="p-10 w-full h-60 flex flex-col items-center justify-center gap-2 py-2">
        <div className="bg-error-full bg-cover bg-center bg-no-repeat w-1/2 aspect-[35/31]"></div>
        <p className="text-xl text-gray-500 pt-2">예약 가능한 부스가 없어요...</p>
      </div>
    </>
  );
};

export default NoBooth;
