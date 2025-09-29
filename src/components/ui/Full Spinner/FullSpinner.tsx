import { PuffLoader } from "react-spinners";

const FullSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <PuffLoader color={"var(--primary)"} />
    </div>
  );
};

export default FullSpinner;
