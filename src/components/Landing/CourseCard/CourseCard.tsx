import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CourseCardProps {
  level: string;
  rating: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: string;
  students: number;
}

const CourseCard = ({
  level,
  rating,
  title,
  description,
  instructor,
  duration,
  price,
  students,
}: CourseCardProps) => {
  return (
    <Card className="w-full max-w-sm shadow-md rounded-xl border-border card-hover mx-auto">
      <CardHeader className="flex flex-row justify-between items-start space-y-0">
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600 ">
          {level}
        </span>
        <div className="flex items-center text-sm text-muted-foreground mt-1.5 font-semibold">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          {rating}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {instructor}
          </span>
          <span>{duration}</span>
        </div>
      </CardContent>
      <Separator className="w-[90%] mx-auto" />
      <CardFooter className="flex flex-col gap-3  pt-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="text-xl font-bold text-blue-600">{price}</span>
            <p className="text-sm text-muted-foreground tracking-tight">
              {students} students
            </p>
          </div>
          <Button className="rounded-lg">Enroll Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
