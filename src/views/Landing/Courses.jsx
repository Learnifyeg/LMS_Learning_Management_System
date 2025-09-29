import { courses } from "@/assets/Constants/Features";
import CourseCard from "@/components/Landing/CourseCard/CourseCard";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import React from "react";

const Courses = () => {
  return (
    <main className="custom-container py-10 sm:py-20 row-span-1">
      <LandingHeading
        header="Professional Development Courses
"
        subHeader="Master modern technologies with our comprehensive course catalog designed for professional growth."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            level={course.level}
            rating={course.rating}
            title={course.title}
            description={course.description}
            instructor={course.instructor}
            duration={course.duration}
            price={course.price}
            students={course.students}
          />
        ))}
      </div>
    </main>
  );
};

export default Courses;
