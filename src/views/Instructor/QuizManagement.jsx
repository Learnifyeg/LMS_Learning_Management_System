import api from "@/API/Config";
import { useEffect, useState } from "react";
import Pagination from "../Others/Pagination";

const QUIZZES_PER_PAGE = 10;

function QuizManagement() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const QuizzesEndPoint = "quizzes"; // API endpoint

  useEffect(() => {
    setLoading(true);
    api
      .get(QuizzesEndPoint)
      .then((res) => {
        const formatted = Array.isArray(res.data)
          ? res.data.map((quiz) => ({
              id: quiz.id ?? Math.random(),
              title: quiz.title ?? "Untitled Quiz",
              lessonId: quiz.lessonId ?? "N/A",
              totalQuestions: quiz.totalQuestions ?? 0,
              passingScore: quiz.passingScore ? `${quiz.passingScore}%` : "N/A",
              posted: quiz.posted ?? "N/A",
            }))
          : [];

        setQuizzes(formatted);
      })
      .catch((err) => {
        console.error("Error fetching quizzes:", err);
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(quizzes.length / QUIZZES_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * QUIZZES_PER_PAGE;
  const pageQuizzes = quizzes.slice(
    pageStartIndex,
    pageStartIndex + QUIZZES_PER_PAGE
  );

  const handleView = (quiz) => console.log("View quiz", quiz);
  const handleEdit = (quiz) => console.log("Edit quiz", quiz);
  const handleDelete = (quiz) => console.log("Delete quiz", quiz);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading quizzes...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Quizzes Management</h2>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Lesson ID</th>
              <th className="px-4 py-2 text-left">Questions</th>
              <th className="px-4 py-2 text-left">Passing Score</th>
              <th className="px-4 py-2 text-left">Posted</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageQuizzes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No quizzes found.
                </td>
              </tr>
            ) : (
              pageQuizzes.map((quiz, idx) => (
                <tr
                  key={quiz.id ?? idx}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{quiz.title}</td>
                  <td className="px-4 py-3">{quiz.lessonId}</td>
                  <td className="px-4 py-3">{quiz.totalQuestions}</td>
                  <td className="px-4 py-3">{quiz.passingScore}</td>
                  <td className="px-4 py-3">{quiz.posted}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-2 py-1 text-xs bg-primary text-white rounded-md"
                      onClick={() => handleView(quiz)}
                    >
                      View
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-md"
                      onClick={() => handleEdit(quiz)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-secondary text-white rounded-md"
                      onClick={() => handleDelete(quiz)}
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

export default QuizManagement;
