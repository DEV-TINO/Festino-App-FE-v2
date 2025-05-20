import Footer from '@/components/footers/Footer';
import NavTap from '@/components/headers/NavTap';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <>
      <Outlet />
      <NavTap />
      <Footer />
    </>
  );
};

export default MainLayout;
