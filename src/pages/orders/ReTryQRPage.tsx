import React from 'react';
const RetryQRPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center px-6">
      <div className="w-48 h-[168px] aspect-auto bg-error-full bg-cover"></div>
      <div className="mt-8">
        <h1 className="text-3xl font-extrabold mb-2">QR을 다시 촬영해 주세요</h1>
        <p className="text-m text-gray-600">테이블에 부착된 QR 코드를 다시 촬영해 주세요</p>
      </div>
    </div>
  );
};

export default RetryQRPage;