interface ILandingHeadingProps {
  header: string;
  subHeader: string;
}
const LandingHeading = ({ header, subHeader }: ILandingHeadingProps) => {
  return (
    <section className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent mb-4">
        {header}
      </h1>
      <p className="w-[60%] mx-auto text-muted-foreground text-lg">
        {subHeader}
      </p>
    </section>
  );
};
export default LandingHeading;
