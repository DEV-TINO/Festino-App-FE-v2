import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const RetryQRPage: React.FC = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    const html5QrCode = new Html5Qrcode(qrRef.current.id);

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        html5QrCode
          .start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: 250 },
            (qrCodeMessage) => {
              alert(`QR 인식됨: ${qrCodeMessage}`);
              html5QrCode.stop();
            },
            (errorMessage) => {
              console.warn('QR 인식 실패:', errorMessage);
            }
          )
          .catch((err) => console.error('QR 스캔 시작 실패:', err));
      }
    });

    return () => {
      html5QrCode.stop().catch(err => console.error('카메라 종료 오류:', err));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black text-center px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">QR을 다시 촬영해 주세요</h1>
        <p className="text-m text-gray-600">테이블에 부착된 QR 코드를 다시 촬영해 주세요</p>
      </div>
      <div id="qr-reader" ref={qrRef} style={{ width: '300px', height: '300px' }} />
    </div>
  );
};

export default RetryQRPage;