import { features } from "@/assets/Constants/Features";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Features = () => {
  return (
    <div className="custom-container py-10 sm:py-20" id="Features">
      <div className="text-center mb-5 w-full sm:w-3/5 mx-auto ">
        <div className=" bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent pb-4">
          <h1 className="font-bold text-4xl">
            Comprehensive Learning Platform
          </h1>
        </div>
        <p className="w-4/5 mx-auto text-muted-foreground">
          Built with modern technologies including SQL Server, C#, .NET Core,
          React.js, and Docker for scalability and performance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 mt-10">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-border card-hover">
              <CardHeader>
                <CardTitle className="bg-primary/10 w-max p-3 rounded-md">
                  <Icon className="text-primary w-5 h-5" />
                </CardTitle>
                <CardDescription className="font-bold mt-1 text-lg text-card-foreground">
                  {feature.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
