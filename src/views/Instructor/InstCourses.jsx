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
    navigate(`/edit-course/${id}`);
  };

  const courses = [...pendingCourses, ...approvedCourses];

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <LandingHeading header="My Created Courses" />

      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => navigate("/InstructorLayout/CreateCourse")}
      >
        + Create Course
      </button>

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
        <p className="text-gray-500">No courses created.</p>
      )}
    </div>
  );
}

export default InstCourses;
