import { modules, stakeholders } from "@/assets/Constants/Features";
import AboutCard from "@/components/Landing/AboutCard/AboutCard";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Shield, Check } from "lucide-react";
const About = () => {
  return (
    <div className="custom-container py-16 space-y-16">
      {/* About Section */}
      <LandingHeading
        header="About Learnify"
        subHeader="
          A comprehensive Learning Management System built with itemern
          technologies to revolutionize online education.
      "
      />
      {/* Mission + Stakeholders */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-muted-foreground mb-6">
            Learnify aims to provide a structured platform for students,
            instructors, and administrators to interact efficiently in the
            learning process. We streamline course creation, enable
            comprehensive progress tracking, and manage secure financial
            transactions.
          </p>
          <ul className="space-y-5">
            {[
              "Streamline course creation and delivery",
              "Enable student progress tracking at course and lesson levels",
              "Support quizzes, projects, and certification issuance",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 ">
                <Check className="text-white w-8 h-8 p-2  bg-orange-400 rounded-full  font-light" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stakeholders */}
        <div className="space-y-4">
          <Card className="border-border card-hover shadow-md">
            <CardHeader className="pb-5">
              <CardTitle className="text-lg flex items-center gap-2 font-bold">
                Platform Stakeholders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {stakeholders.map((item, i) => (
                <AboutCard
                  title={item.title}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                  borderColor={item.borderColor}
                  Icon={item.icon}
                  description={item.description}
                  key={i}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Database Architecture */}
      <section className="mt-20">
        <h3 className="text-2xl font-bold text-center mb-10 tracking-wide">
          Database Architecture
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((item, i) => (
            <Card key={i} className="border-border card-hover">
              <CardHeader>
                <CardTitle className={item.color}>
                  <item.Icon
                    className={`w-10 h-10 rounded-md  inline-block mr-2 ${item.color} ${item.bgColor} p-3`}
                  />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>{item.description}</p>
                <ul className="list-disc list-inside marker:text-sm marker:font-light space-y-1">
                  {item.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
