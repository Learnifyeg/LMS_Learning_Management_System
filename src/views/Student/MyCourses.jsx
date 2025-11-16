import React, { lazy } from "react";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import useStudent from "@/hooks/useStudent";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

// Lazy load CourseCard
const CourseCard = lazy(() => import("@/views/Others/SearchResults/CourseCard"));

export default function MyCourses() {
  const { myEnrollments, removeEnrollment } = useStudent(); // useStudent hook
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeEnrollment.mutate(id, {
      onSuccess: () => toast.success("Course removed from your enrollments"),
      onError: () => toast.error("Failed to remove course"),
    });
  };

  if (myEnrollments.isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your enrolled courses...</p>
      </div>
    );

  const courses = myEnrollments.data || [];

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <div className="w-full flex justify-start">
        <LandingHeading header="My Enrolled Courses" />
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onRemove={() => handleRemove(course.id)} // Optional
              onClick={() =>
                navigate(`/StudentLayout/StuCourseDetails/${course.id}`)
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No enrolled courses found.</p>
      )}
    </div>
  );
}
