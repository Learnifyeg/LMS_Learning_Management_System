import { useState } from "react";
import useQuiz from "@/hooks/useQuiz";
import Pagination from "../Others/Pagination";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import { useNavigate } from "react-router";
import ConfirmToast from "@/utils/ConfirmToast";

const QUIZZES_PER_PAGE = 10;

function QuizManagement() {
  const navigate = useNavigate();
  // const instructorId = localStorage.getItem("instructorId") || "";
  const { getQuizzesByInstructor  , deleteQuizMutation} = useQuiz();

  const { data: quizzesData, isLoading, isError } = getQuizzesByInstructor();

  const quizzes = quizzesData ?? [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(quizzes.length / QUIZZES_PER_PAGE));
  const pageStartIndex = (currentPage - 1) * QUIZZES_PER_PAGE;
  const pageQuizzes = quizzes.slice(pageStartIndex, pageStartIndex + QUIZZES_PER_PAGE);

  const handleView = (quiz) => {console.log("View quiz", quiz)};
  const handleEdit = (quiz) => {
    navigate(`/InstructorLayout/EditQuiz/${quiz.id}/${quiz.courseId}/${quiz.lessonId}`)
  };
  
  const handleDelete = (quiz) =>{
    toast.custom((t) => (
    <ConfirmToast 
      message="Are you sure you want to delete this quiz?"
      onConfirm={async () => {
        toast.dismiss(t.id);
        try {
          await deleteQuizMutation.mutateAsync(quiz.id);
          toast.success("Quiz deleted successfully!");
          navigate(`/InstructorLayout/InstCourseDetails/${quiz.courseId}`);
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete quiz");
        }
      }}
      onCancel={() => toast.dismiss(t.id)}
    />
  ))
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        Loading quizzes...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-48 text-red-500">
        Failed to load quizzes. Try again later.
      </div>
    );
  }

  return (
    <div className="p-6">
      <LandingHeading header="Quizzes Management" />

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg ">
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

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {pageQuizzes.map((quiz, idx) => (
          <div
            key={quiz.id ?? idx}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold mb-1">{quiz.title}</p>
              <p className="text-xs">Total Questions: {quiz.totalQuestions}</p>
              <p className="text-xs">{quiz.posted} </p>
            </div>

            <div className="flex flex-col gap-1">
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

export default QuizManagement;
