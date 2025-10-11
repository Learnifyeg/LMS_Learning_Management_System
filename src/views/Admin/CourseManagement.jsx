import api from "@/API/Config";
import { useEffect, useState, useMemo } from "react";
import Pagination from "../Others/Pagination";

const COURSES_PER_PAGE = 10;

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const CoursesEndPoint = "Cart"; // ✅ Your endpoint

  useEffect(() => {
    setLoading(true);
    api
      .get(`${CoursesEndPoint}`)
      .then((res) => {
        setCourses(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(courses.length / COURSES_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const pageCourses = courses.slice(
    pageStartIndex,
    pageStartIndex + COURSES_PER_PAGE
  );

  // Actions
  const handleView = (course) => console.log("View course", course);
  const handleEdit = (course) => console.log("Edit course", course);
  const handleDelete = (course) => console.log("Delete course", course);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading courses...
      </div>
    );
  }

  const truncateWords = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Courses Management</h2>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Students</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageCourses.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                  No courses found.
                </td>
              </tr>
            ) : (
              pageCourses.map((course, idx) => (
                <tr
                  key={course.id ?? idx}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={course.image}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {truncateWords(course.title, 4)}
                  </td>
                  <td className="px-4 py-3">{course.category}</td>
                  <td className="px-4 py-3">{course.author}</td>
                  <td className="px-4 py-3">{course.studentsEnrolled}</td>
                  <td className="px-4 py-3">{course.price}</td>
                  <td className="px-4 py-3">{course.rating}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs bg-primary text-white rounded-md"
                      onClick={() => handleView(course)}
                    >
                      View
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-secondary text-white rounded-md"
                      onClick={() => handleDelete(course)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {pageCourses.map((course, idx) => (
          <div
            key={course.id ?? idx}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={course.image}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="text-xs">{course.category}</p>
                <p className="text-xs">{course.studentsEnrolled} students</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button
                className="px-2 py-1 text-xs bg-primary text-white rounded-md"
                onClick={() => handleView(course)}
              >
                View
              </button>
              <button
                className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md"
                onClick={() => handleEdit(course)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 text-xs bg-secondary text-white rounded-md"
                onClick={() => handleDelete(course)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CourseManagement;
