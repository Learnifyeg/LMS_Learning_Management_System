import { Button } from "@/components/ui/button";
interface ISocialButtonProps {
  Icon: any;
  title: string;
  color: string;
}
const SocialButton = ({ Icon, title, color }: ISocialButtonProps) => {
  return (
    <Button
      className={`w-full  flex items-center justify-start sm:pl-52 md:pl-32  pl-20 gap-5 ${color}  text-white py-2 rounded-lg hover:scale-105 hover:-traslnnate-y-0.5  transition-all duration-300 ease-in-out`}
    >
      {<Icon className="w-5 h-5" />}
      <span>Continue with {title}</span>
    </Button>
  );
};

export default SocialButton;
