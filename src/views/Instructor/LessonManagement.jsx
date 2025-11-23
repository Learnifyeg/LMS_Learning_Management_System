/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import useLesson from "@/hooks/useLesson";
import Pagination from "../Others/Pagination";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";

const LESSONS_PER_PAGE = 10;

function LessonManagement() {
  const { getLessonsByInstructor } = useLesson();
  const { data: lessonsData, isLoading, isError } = getLessonsByInstructor();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Example lesson
  const exampleLesson = {
    lessonId: 2,
    courseId: 2,
    title: "Lesson_2_1",
    videoUrl: "https://www.google.com/",
    description: "Lesson_2_1",
    duration: 10,
    contentType: "video",
    attachmentUrl: "https://www.google.com/",
    isFreePreview: true,
    order: 1,
    createdAt: "2025-11-16T22:56:18.0539065",
    quizzes: null,
  };

  // Merge API data with example lesson
  const lessons = [
    exampleLesson,
    ...(lessonsData?.map((lesson) => ({
      lessonId: lesson.lessonId,
      courseId: lesson.courseId,
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl,
      attachmentUrl: lesson.attachmentUrl,
      isFreePreview: lesson.isFreePreview,
      createdAt: lesson.createdAt,
    })) ?? []),
  ];

  const totalPages = Math.max(1, Math.ceil(lessons.length / LESSONS_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * LESSONS_PER_PAGE;
  const pageLessons = lessons.slice(pageStartIndex, pageStartIndex + LESSONS_PER_PAGE);

  const handleView = (lesson) => setSelectedLesson(lesson);
  const handleEdit = (lesson) => console.log("Edit lesson", lesson);
  const handleDelete = (lesson) => console.log("Delete lesson", lesson);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading lessons...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-48 text-red-500 font-semibold">
        ❌ Failed to load lessons.
      </div>
    );
  }

  return (
    <div className="p-6">
      <LandingHeading header="Lessons Management" />

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
              pageLessons.map((lesson) => (
                <tr
                  key={lesson.lessonId}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{lesson.title}</td>
                  <td className="px-4 py-3">{lesson.duration} min</td>
                  <td className="px-4 py-3">
                    {lesson.isFreePreview ? (
                      <span className="text-green-500 font-bold">✔ YES</span>
                    ) : (
                      <span className="text-red-500 font-bold">✖ NO</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{new Date(lesson.createdAt).toLocaleDateString()}</td>
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
        {pageLessons.map((lesson) => (
          <div
            key={lesson.lessonId}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold mb-2">{lesson.title}</p>
              <p className="text-xs mb-2">Duration: {lesson.duration} min</p>
              <p className="text-xs mb-1">
                Free Preview: {lesson.isFreePreview ? "✔ YES" : "✖ NO"}
              </p>
              <p className="text-xs">{new Date(lesson.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-col gap-1">
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
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {selectedLesson && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[400px] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedLesson(null)}
            >
              ✕
            </button>

            <div className="text-center">
              <h2 className="text-lg font-semibold">{selectedLesson.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{selectedLesson.description}</p>
              <p className="text-sm mt-1">Duration: {selectedLesson.duration} min</p>
              <p className="text-sm mt-1">
                Free Preview: {selectedLesson.isFreePreview ? "✔ YES" : "✖ NO"}
              </p>
              {selectedLesson.videoUrl && (
                <a
                  href={selectedLesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 block"
                >
                  Watch Video
                </a>
              )}
              {selectedLesson.attachmentUrl && (
                <a
                  href={selectedLesson.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-1 block"
                >
                  View Attachment
                </a>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
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

export default LessonManagement;
