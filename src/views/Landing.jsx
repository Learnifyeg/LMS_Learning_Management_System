import Features from "@/components/Features/Features";
import HeroSection from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div>
      {/* NavBar */}
      <Navbar />
      {/* HeroSection */}
      <HeroSection />
      {/* Features Section */}
      <Features />
    </div>
  );
};

export default Landing;
