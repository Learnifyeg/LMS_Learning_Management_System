import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { Separator } from "../ui/separator";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/20 to-secondary/30 py-10 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center custom-container">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
            Advanced Learning Management System for Modern Education
          </h1>

          <p className="mt-6 text-base text-text-secondary max-w-xl">
            Streamline course creation, track student progress, and manage
            secure transactions with our comprehensive LMS platform designed for
            students, instructors, and administrators.
          </p>

          <div className="mt-8 flex justify-between sm:justify-start gap-4 text-white">
            <Button
              size="lg"
              className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
            >
              Start Learning Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer text-text-primary border-gray-400 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content - Card */}
        <Card className="shadow-lg rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out border-none bg-surface sm:w-[90%] w-full mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                <Play />
              </div>
              <div className="leading-snug">
                <p className="font-semibold">SQL Server Programming</p>
                <p className="text-sm text-gray-500">Instructor: John Smith</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Course Progress</span>
              <span className="text-secondary font-medium">85%</span>
            </div>
            <Progress value={85} className="h-2 bg-muted" />
            <Separator orientation="horizontal" className="my-4 bg-gray-300" />
            <div className="flex justify-between text-sm mt-4">
              <span className="text-gray-500">Next: Advanced Queries</span>
              <span className="text-primary font-medium">2 hours left</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
