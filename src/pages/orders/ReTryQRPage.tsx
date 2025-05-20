import React, { useRef } from 'react';

const RetryQRPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">QR을 다시 촬영해 주세요</h1>
        <p className="text-m text-gray-600">테이블에 부착된 QR 코드를 다시 촬영해 주세요</p>
      </div>

      <input type="file" accept="image/*" capture="environment" ref={fileInputRef} style={{ display: 'none' }} />

      <button className="bg-gray-800 text-white py-4 px-8 rounded-full text-m font-semibold" onClick={openCamera}>
        QR 촬영하기
      </button>
    </div>
  );
};

export default RetryQRPage;
