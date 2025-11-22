import { useNavigate, useParams } from "react-router-dom";
import useQuiz from "@/hooks/useQuiz";
import toast, { Toaster } from "react-hot-toast";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import ConfirmToast from "@/utils/ConfirmToast";

export default function InstructorQuizDetails() {
  const { quizid: quizId, courseid: courseId } = useParams();
  const navigate = useNavigate();
  const { getQuizById, deleteQuizMutation } = useQuiz();

  const { data: quiz, isLoading, error } = getQuizById(quizId);

  const handleDeleteQuiz = async () => {
   toast.custom((t) => (
    <ConfirmToast 
      message="Are you sure you want to delete this quiz?"
      onConfirm={async () => {
        toast.dismiss(t.id);
        try {
          await deleteQuizMutation.mutateAsync(quizId);
          toast.success("Quiz deleted successfully!");
          navigate(`/InstructorLayout/InstCourseDetails/${courseId}`);
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete quiz");
        }
      }}
      onCancel={() => toast.dismiss(t.id)}
    />
  ));
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium">Loading quiz details...</div>
      </div>
    );

  if (error || !quiz)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium text-red-600">
          Failed to fetch quiz details.
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-card rounded-2xl shadow-lg flex flex-col gap-6">
      <LandingHeading header={`Quiz: ${quiz.title}`} />
      <Toaster position="top-center" />

      {/* Quiz Info */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Quiz Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Title:</strong> {quiz.title}
          </div>
          <div>
            <strong>Duration:</strong> {quiz.duration} seconds
          </div>
          <div>
            <strong>Passing Score:</strong> {quiz.passingScore}
          </div>
          <div>
            <strong>Total Questions:</strong> {quiz.questions?.length || 0}
          </div>
          <div>
            <strong>Posted:</strong> {quiz.posted}
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={() =>
              navigate(`/InstructorLayout/EditQuiz/${quiz.id}`)
            }
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Edit Quiz
          </button>

          <button
            onClick={handleDeleteQuiz}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700/90"
          >
            Delete Quiz
          </button>

          <button
            onClick={() => navigate(`/InstructorLayout/AddQuestion/${quiz.id}`)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90"
          >
            Add Question
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-surface p-6 rounded-xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        {quiz.questions && quiz.questions.length ? (
          <div className="space-y-4">
            {quiz.questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 border border-border rounded hover:shadow-md transition flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold">
                    {idx + 1}. {q.title}
                  </h3>
                  {q.options && (
                    <ul className="list-disc list-inside mt-2">
                      {q.options.map((opt, i) => (
                        <li
                          key={i}
                          className={opt.isCorrect ? "text-green-600 font-semibold" : ""}
                        >
                          {opt.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() =>
                      navigate(`/InstructorLayout/EditQuestion/${q.id}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button disabled className="text-red-400 cursor-not-allowed">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No questions added yet.</p>
        )}
      </div>
    </div>
  );
}
