// React
import { useEffect, useState } from "react";

// Components
import api from "@/API/Config";
import CourseCard from "./CourseCard/CourseCard";

// Endpoints and constants
const CoursesEndPoint = "Courses";
const StudentCoursesEndPoint = "StudentCourses";
function MyCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);

  const currentUserId = 501; // ← replace with auth user

  useEffect(() => {
    api.get(CoursesEndPoint).then((res) => setAllCourses(res.data));
    api
      .get(StudentCoursesEndPoint)
      .then((res) =>
        setStudentCourses(res.data.filter((c) => c.userId === currentUserId))
      );
  }, []);

  const enrolledCourseList = allCourses.filter((course) =>
    studentCourses.some((sc) => sc.courseId === course.id)
  );

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <p className="text-2xl font-semibold">My Enrolled Courses</p>

      {enrolledCourseList.length > 0 ? (
        enrolledCourseList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onRemove={null} // Disable delete
            onAddToCart={null} // Disable add to cart
          />
        ))
      ) : (
        <p className="text-gray-500">No enrolled courses found.</p>
      )}
    </div>
  );
}
export default MyCourses;
