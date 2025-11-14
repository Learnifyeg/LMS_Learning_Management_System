import { useEffect, useMemo, useState } from "react";
import api from "@/API/Config";
import Pagination from "../Others/Pagination";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import toast, { Toaster } from "react-hot-toast";
import ConfirmToast from "@/utils/ConfirmToast";
import Urls from "@/API/URL";
import DefaultImage from "../../../public/images/default-avatar.png";

// Endpoints
const GetPendingCoursesEndPoint = Urls.getPendingCourses;   // "Admin/get-pending-courses"
const GetApprovedCoursesEndPoint = Urls.getApprovedCourses; // "Admin/get-approved-courses"
const ApproveCourseEndPoint = Urls.approveCourse;           // "Admin/approve-course-by"
const DeleteCourseEndPoint = Urls.deleteCourse;             // "Admin/delete-course-by"

const COURSES_PER_PAGE = 10;

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending"); // pending | approved
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    const endpoint =
      filter === "pending" ? GetPendingCoursesEndPoint : GetApprovedCoursesEndPoint;

    api
      .get(endpoint)
      .then((res) => {
        const data = res.data.courses || res.data; // depends on your API shape
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        toast.error("Failed to fetch courses");
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, [filter]);

  // Reset page on filter/search
  useEffect(() => setCurrentPage(1), [filter, search]);

  // Filtered + searched
  const filteredCourses = useMemo(() => {
    const q = search.toLowerCase().trim();
    return courses.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        c.author?.toLowerCase().includes(q)
    );
  }, [courses, search]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / COURSES_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const pageCourses = filteredCourses.slice(
    pageStartIndex,
    pageStartIndex + COURSES_PER_PAGE
  );

  // Approve course
  const handleApprove = (course) => {
    toast.custom((t) => (
      <ConfirmToast
        message={`Approve ${course.title}?`}
        onConfirm={() => {
          api
            .put(`${ApproveCourseEndPoint}/${course.id}`)
            .then(() => {
              setCourses((prev) =>
                prev.map((c) =>
                  c.id === course.id ? { ...c, isApproved: true } : c
                )
              );
              toast.success(`${course.title} approved`);
            })
            .catch(() => toast.error("Failed to approve course"));
        }}
        onCancel={() => toast.dismiss(t.id)}
      />
    ));
  };

  // Delete course
  const handleDelete = (course) => {
    toast.custom((t) => (
      <ConfirmToast
        message={`Delete ${course.title}?`}
        onConfirm={() => {
          api
            .delete(`${DeleteCourseEndPoint}/${course.id}`)
            .then(() => {
              setCourses((prev) => prev.filter((c) => c.id !== course.id));
              toast.success(`Deleted ${course.title}`);
            })
            .catch(() => toast.error("Failed to delete course"));
        }}
        onCancel={() => toast.dismiss(t.id)}
      />
    ));
  };

  const truncateWords = (text = "", limit = 6) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <LandingHeading header="Courses Management" />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, author, or category..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
        />

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Show:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-white"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Hours</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageCourses.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No courses found.
                </td>
              </tr>
            ) : (
              pageCourses.map((course, idx) => (
                <tr
                  key={course.id ?? idx}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <img
                      src={course.image || DefaultImage}
                      alt={course.title}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{truncateWords(course.title, 5)}</td>
                  <td className="px-4 py-3">{course.author || "Unknown"}</td>
                  <td className="px-4 py-3">{course.category || "-"}</td>
                  <td className="px-4 py-3">{course.price || "Free"}</td>
                  <td className="px-4 py-3">{course.hours ? `${course.hours} hour` : "N/A"}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs bg-primary text-white rounded-md hover:bg-blue-600"
                      onClick={() => setSelectedCourse(course)}
                    >
                      View
                    </button>
                    {!course.isApproved && (
                      <button
                        className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                        onClick={() => handleApprove(course)}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="px-2 py-1 text-xs bg-secondary text-white rounded-md hover:bg-red-600"
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

      {/* View Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[400px] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedCourse(null)}
            >
              ✕
            </button>

            <div className="text-center">
              <img
                src={selectedCourse.image || DefaultImage}
                className="w-24 h-24 rounded-md mx-auto mb-3 object-cover"
              />
              <h2 className="text-lg font-semibold">{selectedCourse.title}</h2>
              <p className="text-blue-600">{selectedCourse.author}</p>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>Category:</strong> {selectedCourse.category || "-"}
              </p>
              <p>
                <strong>Price:</strong> {selectedCourse.price || "Free"}
              </p>
              <p>
                <strong>Hours:</strong> {selectedCourse.hours || "N/A"} hour
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedCourse.description || "No description available."}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </button>
              {!selectedCourse.isApproved && (
                <button
                  className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  onClick={() => {
                    handleApprove(selectedCourse);
                    setSelectedCourse(null);
                  }}
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
