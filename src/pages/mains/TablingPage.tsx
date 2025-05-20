import TablingBanner from "@/components/tablings/TablingBanner";
import TablingTaps from "@/components/tablings/TablingTaps";

const TablingPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <TablingBanner />
        <TablingTaps />
      </div>
    </>
  );
};

export default TablingPage;
