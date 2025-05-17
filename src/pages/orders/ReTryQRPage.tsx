import React from 'react';

const RetryQRPage: React.FC = () => {
  const openCamera = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'environment'; 
    fileInput.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center px-6">
      <div className="mb-8">
        <h1 className="text-lg font-extrabold mb-2">QR을 다시 촬영해 주세요</h1>
        <p className="text-sm text-gray-600">테이블에 부착된 QR 코드를 다시 촬영해 주세요</p>
      </div>
      <button className="bg-gray-800 text-white py-2 px-6 rounded-full text-sm font-semibold" onClick={openCamera}>
        QR 촬영하기
      </button>
    </div>
  );
};

export default RetryQRPage;
