import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PopularMess from "@/components/PopularMess";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <PopularMess />
        <HowItWorks />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
