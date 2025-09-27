import HeroSection from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div>
      {/* NavBar */}
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Landing;
