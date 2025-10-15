// React
import { useEffect, useState } from "react";

// Components
import api from "@/API/Config";
import CourseCard from "../Student/CourseCard/CourseCard";

// Endpoints and constants
const CoursesEndPoint = "Courses";
const InstructorCoursesEndPoint = "InstructorCourses";
function InstCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);

  const currentInstructorId = 101; // ← replace with logged in instructor

  useEffect(() => {
    api.get(CoursesEndPoint).then((res) => setAllCourses(res.data));
    api
      .get(InstructorCoursesEndPoint)
      .then((res) =>
        setInstructorCourses(
          res.data.filter((c) => c.instructorId === currentInstructorId)
        )
      );
  }, []);

  const createdCoursesList = allCourses.filter((course) =>
    instructorCourses.some((ic) => ic.courseId === course.id)
  );

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <p className="text-2xl font-semibold">My Created Courses</p>

      {createdCoursesList.length > 0 ? (
        createdCoursesList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onRemove={() => console.log("Delete Logic Here")}
            onAddToCart={null} // Disable cart for instructor
          />
        ))
      ) : (
        <p className="text-gray-500">No courses created.</p>
      )}
    </div>
  );
}
export default InstCourses;
