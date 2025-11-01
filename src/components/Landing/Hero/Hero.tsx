import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";
import { Separator } from "../../ui/separator";
import { useEffect } from "react";
import useTokenStore from "@/store/user";

export default function HeroSection() {
  // const { token } = useTokenStore(); // get token
  // useEffect(() => {
  //   console.log(token);
  // }, [token]);
  return (
      <section className="relative bg-[url('https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center bg-no-repeat py-16 sm:py-28 overflow-hidden">
    {/* <section className="relative bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center bg-no-repeat py-16 sm:py-28 overflow-hidden"> */}
      {/* <section className="relative bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat py-16 sm:py-28 overflow-hidden"> */}
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] z-0"></div>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center custom-container relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
              Advanced Learning Management System
            </h1>

            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed font-medium">
              Streamline course creation, track student progress, and manage
              secure transactions with our comprehensive LMS platform designed
              for modern education.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="btn-hover text-lg px-8 py-6 font-semibold shadow-lg bg-gradient-to-r from-primary to-primary/90 border-0 text-white transition-all duration-300"
            >
              Start Learning Today
              <div className="ml-2 w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-hover text-lg px-8 py-6 font-semibold border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:border-primary/40 text-text-primary transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-text-secondary">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">500+</div>
              <div className="text-sm text-text-secondary">
                Expert Instructors
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-text-secondary">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Right Content - Enhanced Card */}
        <div
          className="relative animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Card className="rounded-3xl card-hover border-border/50 bg-surface/80 backdrop-blur-sm md:w-[95%] w-full mx-auto shadow-2xl border-0 overflow-hidden">
            {/* Card accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                  <Play className="w-5 h-5" fill="currentColor" />
                </div>
                <div className="leading-tight">
                  <p className="font-bold text-lg text-text-primary">
                    SQL Server Programming
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instructor: John Smith
                  </p>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">
                    Course Progress
                  </span>
                  <span className="text-secondary font-bold">85%</span>
                </div>
                <div className="relative">
                  <Progress
                    value={85}
                    className="h-3 bg-muted/50 rounded-full"
                  />
                  <div
                    className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              <Separator orientation="horizontal" className="bg-border/30" />

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-muted-foreground block">
                    Next Lesson
                  </span>
                  <span className="text-text-primary font-semibold">
                    Advanced Queries
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block">
                    Time Remaining
                  </span>
                  <span className="text-primary font-bold">2 hours left</span>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-1 pt-2">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      dot <= 3 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Floating elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl rotate-12 -z-10"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary/10 rounded-xl -rotate-12 -z-10"></div>
        </div>
      </div>
    </section>
  );
}
