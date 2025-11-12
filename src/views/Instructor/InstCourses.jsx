import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import CourseCard from "./CourseCard";
import CourseService from "@/store/Classes/Course";
import toast from "react-hot-toast";

const courseService = new CourseService();

function InstCourses() {
  const [pendingCourses, setPendingCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const pending = await courseService.getPendingCourses();
      const approved = await courseService.getApprovedCourses();
      setPendingCourses(pending ?? []);
      setApprovedCourses(approved ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await courseService.deleteCourse(id);

      setPendingCourses((prev) => prev.filter((c) => c.id !== id));
      setApprovedCourses((prev) => prev.filter((c) => c.id !== id));

      toast.success("Course deleted");
    } catch {
      toast.error("Error deleting course");
    }
  };

//   const handleDelete = (course) => {
//   toast.custom((t) => (
//     <ConfirmToastno
//       message={`Delete course "${course.title}"?`}
//       onConfirm={() => {
//         courseService
//           .deleteCourse(course.id)
//           .then(() => {
//             setPendingCourses((prev) =>
//               prev.filter((c) => c.id !== course.id)
//             );
//             setApprovedCourses((prev) =>
//               prev.filter((c) => c.id !== course.id)
//             );
//             toast.success("Course deleted");
//             toast.dismiss(t.id);
//           })
//           .catch(() => {
//             toast.error("Error deleting course");
//           });
//       }}
//       onCancel={() => toast.dismiss(t.id)}
//     />
//   ));
// };

  const handleApprove = async (id) => {
    try {
      await courseService.approveCourse(id);
      toast.success("Course approved");
      loadCourses();
    } catch {
      toast.error("Error approving course");
    }
  };

  const handleEdit = (id) => {
     navigate(`/InstructorLayout/CreateCourse/${id}`);
     
  };

  const courses = [...pendingCourses, ...approvedCourses];

  return (
    <div className="p-6 flex flex-col items-center gap-6 bg-surface rounded-lg shadow-md">
      {/* Section Heading */}
      <LandingHeading header="My Created Courses" />

      {/* Create Course Button */}
      <button
        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors duration-200"
        onClick={() => navigate("/InstructorLayout/CreateCourse")}
      >
        + Create Course
      </button>

      {/* Courses List */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onRemove={() => handleDelete(course.id)}
              onEdit={() => handleEdit(course.id)}
              onApprove={() => handleApprove(course.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-4">
            No courses created.
          </p>
        )}
      </div>
    </div>
  );
}

export default InstCourses;
