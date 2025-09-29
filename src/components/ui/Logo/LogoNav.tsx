import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import Logo from "../../../assets/Logo/logo.svg";

const LogoNav = () => {
  return (
    <Button variant="link" className="cursor-pointer">
      <Avatar className="transform scale-200  hover:scale-250 hover:ml-7 transition-all duration-300 ease-in-out">
        <AvatarImage src={Logo} />
        <AvatarFallback>Learnify Logo</AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default LogoNav;
