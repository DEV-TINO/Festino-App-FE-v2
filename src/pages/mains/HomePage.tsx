import Header from "@/components/headers/Header";
import HomeBanner from "@/components/homes/HomeBanner";
import HomeTab from "@/components/homes/HomeTab";

const HomePage : React.FC = () => {
  return (
    <div className="h-screen">
      <Header />
      <HomeBanner />
      <HomeTab />
    </div>
  )
}

export default HomePage;