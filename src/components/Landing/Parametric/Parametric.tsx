import { useTheme } from "@/utils/ThemeProvider";
import Count from "../../ui/Count/Count";
import { stats } from "@/assets/Constants/Features";

const Parametric = () => {
  const { theme } = useTheme();
  return (
    <section className="h-max py-10 sm:py-20 bg-gradient-to-r from-primary from-30% to-secondary/90 to-100%  relative">
      {theme === "dark" && (
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      )}
      <div className="relative z-10 custom-container flex flex-col justify-center items-center h-full text-[#fafafa]  text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-3">
          Trusted by Educational Institutions Worldwide
        </h1>
        <p>
          Our platform has successfully facilitated millions of learning hours
          across various domains.
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-4 mt-10 w-full ">
          {stats.map((stat, index) => (
            <Count
              count={stat.end}
              duration={5}
              sybmol={stat.symbol}
              subText={stat.subText}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Parametric;
