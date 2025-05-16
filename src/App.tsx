import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/mains/HomePage';
import TimeTablePage from './pages/mains/TimeTablePage';
import BoothPage from './pages/mains/BoothPage';
import TablingPage from './pages/mains/TablingPage';
import TeamReviewPage from './pages/mains/TeamReviewPage';
import MainLayout from './layouts/MainLayout';
import NoticePage from './pages/mains/NoticePage';
import NoticeDetailPage from './pages/mains/NoticeDetailPage';
import OrderLayout from './layouts/OrderLayout';
import BoothDetailPage from './pages/mains/BoothDetailPage';
import ScrollToTop from './components/commons/ScrollToTop';
import OrderMainPage from './pages/orders/OrderMainPage';
import OrderPaymentPage from './pages/orders/OrderPaymentPage';
import ModalRenderer from './components/orders/modals/ModalRenderer';
import ModalPage from './pages/mains/ModalPage';
import RegisterPage from './pages/mains/RegisterPage';
import ErrorPage from './pages/mains/ErrorPage';
import OrderSearchPage from './pages/orders/OrderSearchPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <ModalRenderer />
      <ModalPage />
      <Routes>
        {/* Main */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="timetable" element={<TimeTablePage />} />
          <Route path="booths" element={<BoothPage />} />
          <Route path="booths/:type/:boothId" element={<BoothDetailPage />} />
          <Route path="reserve" element={<TablingPage />} />
          <Route path="team-review" element={<TeamReviewPage />} />
          <Route path="notices" element={<NoticePage />} />
          <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Order */}
        <Route path="/order" element={<OrderLayout />}>
          <Route path=":boothId/:tableNum" element={<OrderMainPage />} />
          <Route path=":boothId/:tableNum/payment" element={<OrderPaymentPage />} />
          <Route path=":boothId/:tableNum/search" element={<OrderSearchPage />} />
        </Route>

        {/* Error */}
        <Route path="/error/:page" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
