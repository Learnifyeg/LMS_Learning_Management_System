import React, { useState } from "react";
import CourseCard from "../Student/CourseCard/CourseCard";
import coursesData from "../../CourseData/courseData.json";
function StuSavedCourses() {
   const [courses, setCourses] = useState(coursesData);
  const [cart, setCart] = useState([]);

  // Remove Course
  const handleRemove = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  // Add to Cart
  const handleAddToCart = (course) => {
    setCart((prev) => {
      if (prev.find((c) => c.id === course.id)) {
        return prev; // Course already in cart, do not add again
      } else {
        return [...prev, course];
      }
    });
  };
  return (
    <>
      <div className="p-6 flex flex-col items-center gap-4">
        <p className="text-2xl font-semibold">Saved Courses</p>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-gray-500">No courses available.</p>
        )}
      </div>
    </>
  );
}


export default StuSavedCourses;


