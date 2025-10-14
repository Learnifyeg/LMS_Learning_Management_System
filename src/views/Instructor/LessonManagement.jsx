import api from "@/API/Config";
import { useEffect, useState } from "react";
import Pagination from "../Others/Pagination";

const LESSONS_PER_PAGE = 10;

function LessonManagement() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const LessonsEndPoint = "Lessons"; // API endpoint

  useEffect(() => {
    setLoading(true);
    api
      .get(LessonsEndPoint)
      .then((res) => {
        const formatted = Array.isArray(res.data)
          ? res.data.map((lesson) => ({
              id: lesson.id ?? Math.random(),
              title: lesson.title ?? "Untitled Lesson",
              duration: lesson.duration ?? "0 min",
              isPreview: lesson.isPreview ? "Yes" : "No",
              posted: lesson.posted ?? "N/A",
            }))
          : [];

        setLessons(formatted);
      })
      .catch((err) => {
        console.error("Error fetching lessons:", err);
        setLessons([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(lessons.length / LESSONS_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * LESSONS_PER_PAGE;
  const pageLessons = lessons.slice(
    pageStartIndex,
    pageStartIndex + LESSONS_PER_PAGE
  );

  const handleView = (lesson) => console.log("View lesson", lesson);
  const handleEdit = (lesson) => console.log("Edit lesson", lesson);
  const handleDelete = (lesson) => console.log("Delete lesson", lesson);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading lessons...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Lessons Management</h2>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Preview</th>
              <th className="px-4 py-2 text-left">Posted</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageLessons.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No lessons found.
                </td>
              </tr>
            ) : (
              pageLessons.map((lesson, idx) => (
                <tr
                  key={lesson.id ?? idx}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{lesson.title}</td>
                  <td className="px-4 py-3">{lesson.duration}</td>
                  <td className="px-4 py-3">
                    {lesson.isPreview ? (
                      <span className="text-green-500 font-bold">✔ YES</span>
                    ) : (
                      <span className="text-red-500 font-bold">✖ NOT YET</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{lesson.posted}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs bg-primary text-white rounded-md"
                      onClick={() => handleView(lesson)}
                    >
                      View
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md"
                      onClick={() => handleEdit(lesson)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-secondary text-white rounded-md"
                      onClick={() => handleDelete(lesson)}
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
        {pageLessons.map((lesson, idx) => (
          <div
            key={lesson.id ?? idx}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-semibold mb-2">{lesson.title}</p>
                <p className="text-xs mb-2">Duration : {lesson.duration}</p>
                <p className="text-xs">{lesson.posted} </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button
                className="px-2 py-1 text-xs bg-primary text-white rounded-md cursor-pointer"
                onClick={() => handleView(lesson)}
              >
                View
              </button>
              <button
                className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md cursor-pointer "
                onClick={() => handleEdit(lesson)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 text-xs bg-secondary text-white rounded-md cursor-pointer"
                onClick={() => handleDelete(lesson)}
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

export default LessonManagement;
