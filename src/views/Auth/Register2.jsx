// Assets
import LogoWhite from "../../../public/learnify_white.svg";
import LogoBlack from "../../../public/learnify_black.svg";

// Components
import { useTheme } from "@/utils/ThemeProvider";
import useUserStore from "@/store/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// React
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useNavigate } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

const RegisterSchema = z.object({
  fullName: z.string().min(8, "First name must be at least 8 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Register2() {
  const navigate = useNavigate();

  const { theme } = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const { setUser } = useUserStore();
  const onSubmit = (data) => {
    console.log("Submitted");
    // const response = axios.post("http://localhost:8000/api/register", data);
    // if (response.status !== 200) return; //status 200 , message: "success", user : { email: "string", fullName: "string", phoneNumber: "string", role: "string" , token: "string" }
    setUser(data);
    toast.success("Register successfully!");
    navigate("/");
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center p-10">
        {theme === "dark" ? (
          <img src={LogoWhite} alt="" className="w-1/8" />
        ) : (
          <img src={LogoBlack} alt="" className="w-1/8" />
        )}

        <div className="form bg-card p-10 rounded-lg shadow-lg mt-5 w-full text-center max-w-md">
          <Tabs defaultValue="Instructor" className="w-full">
            <TabsList className="mb-5 w-full bg-input">
              <TabsTrigger
                value="Instructor"
                className="font-bold text-secondary w-1/2"
              >
                Instructor Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="Student"
                className="font-bold text-secondary w-1/2"
              >
                Student Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Student">
              <p className="mb-5 text-text-secondary text-sm ">
                Sign Up and Start Learning!
              </p>{" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea
                  {...register("bio")}
                  placeholder="Enter your biography..."
                />
                <p className="text-text-secondary text-sm mt-5">
                  Your biography should have at least{" "}
                  <span className="font-bold text-secondary">12000</span>{" "}
                  characters.
                </p>

                <button
                  className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
                  type="submit"
                >
                  Student Sign Up Now
                </button>
              </form>
            </TabsContent>
            <TabsContent value="Instructor">
              <p className="mb-5 text-text-secondary text-sm ">
                Sign Up and Create Course!
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="w-full mb-5 text-secondary">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Development</SelectItem>
                    <SelectItem value="dark">IT & Software</SelectItem>
                    <SelectItem value="system">Teaching & Academics</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  {...register("bio")}
                  placeholder="Enter your biography..."
                />

                <p className="text-text-secondary text-sm mt-5">
                  Your biography should have at least{" "}
                  <span className="font-bold text-secondary">12000</span>{" "}
                  characters.
                </p>

                <button
                  className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
                  type="submit"
                >
                  Instructor Sign Up Now
                </button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-text-secondary">
            Already have an account?{" "}
            <span
              className="text-secondary cursor-pointer hover:scale-105 font-bold"
              onClick={() => navigate("/Login")}
            >
              Sign In
            </span>
          </p>
        </div>
        <div className="footer my-10 text-center text-sm text-text-secondary">
          <p>
            © 2025 <span className="font-bold">Learnify</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register2;
