import CountUp from "react-countup";

interface ICountProprs {
  count: number;
  duration: number;
  sybmol: string;
  subText: string;
}
const Count = ({ count, duration, sybmol, subText }: ICountProprs) => {
  return (
    <div className="text-3xl font-semibold hover:-translate-y-0.5 transition-all duration-300 ease-in-out hover:scale-110">
      <CountUp end={count} duration={duration} separator="," />
      {sybmol}
      <p className="text-white text-base">{subText}</p>
    </div>
  );
};

export default Count;
