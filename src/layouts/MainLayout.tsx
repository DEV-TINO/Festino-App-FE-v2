import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/footers/Footer';
import NavTap from '@/components/headers/NavTap';
import { Outlet } from 'react-router-dom';
import ReactGA from 'react-ga4';

const MainLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qr = params.get('qr');

    if (qr) {
      ReactGA.event({
        category: 'QR_Code',
        action: 'qr_entry',
        label: qr,
      });
    }
  }, []);

  return (
    <>
      <Outlet />
      <NavTap />
      <Footer />
    </>
  );
};

export default MainLayout;
