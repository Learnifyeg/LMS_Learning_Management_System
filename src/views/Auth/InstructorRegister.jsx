// Components
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
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import LogoModes from "@/components/ui/LogoTheme/LogoModes";

const RegisterSchema = z.object({
  fullName: z.string().min(8, "First name must be at least 8 characters"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function InstructorRegister() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
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
    <section className="my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea {...register("bio")} placeholder="Enter your biography..." />
        <p className="text-text-secondary text-sm mt-5">
          Your biography should have at least{" "}
          <span className="font-bold text-secondary">12000</span> characters.
        </p>

        <button
          className="btn bg-secondary w-full cursor-pointer hover:scale-102 my-5"
          type="submit"
        >
          Student Sign Up Now
        </button>
      </form>

      <p className="text-text-secondary">
        Already have an account?{" "}
        <span
          className="text-secondary cursor-pointer hover:scale-105 font-bold"
          onClick={() => navigate("/Login")}
        >
          Sign In
        </span>
      </p>
      <div className="footer my-10 text-center text-sm text-text-secondary">
        <p>
          © 2025 <span className="font-bold">Learnify</span>. All Rights
          Reserved.
        </p>
      </div>
    </section>
  );
}

export default InstructorRegister;
