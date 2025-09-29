import Features from "@/components/Landing/Features/Features";
import HeroSection from "@/components/Landing/Hero/Hero";
import Parametric from "@/components/Landing/Parametric/Parametric";

const Landing = () => {
  return (
    <>
      {/* HeroSection */}
      <HeroSection />
      {/* Features Section */}
      <Features />
      {/* Parameters Section */}
      <Parametric />
    </>
  );
};

export default Landing;
