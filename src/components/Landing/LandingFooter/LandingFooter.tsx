import { Separator } from "@/components/ui/separator";
import LogoNav from "../../ui/Logo/LogoNav";
import { useNavigate } from "react-router";

export default function LandingFooter() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0f172a] text-gray-400">
      <div className="custom-container">
        <div className="  py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <div>
            <LogoNav />
            <p className="mt-4 text-sm leading-relaxed">
              Advanced Learning Management System designed for modern
              educational institutions and online learning platforms.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("/StudentLayout")}>
                  <a href="#" className="hover:text-white">
                    Courses
                  </a>
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Live Sessions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Certificates
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-white font-semibold mb-3">Technology Stack</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  SQL Server & C#
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  .NET Core Web API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  React.js & Tailwind CSS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Docker Containerization
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="bg-border w-full " />
        <div className="px-6 py-4 text-center text-sm text-gray-500 ">
          © 2025 Learnify. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
