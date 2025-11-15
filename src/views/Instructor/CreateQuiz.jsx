import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/app";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import toast, { Toaster } from "react-hot-toast";
import QuizService from "@/store/Classes/Quiz"; // Assuming a QuizService similar to LessonService

function CreateQuiz() {
  const quizService = new QuizService();
  const { saveLoading, setSaveLoading } = useAppStore();
  const { courseId, id } = useParams(); // Get course ID and quiz ID from URL
  console.log("Course ID from URL:", courseId);
  console.log("Quiz ID from URL:", id);
  const navigate = useNavigate();
  const isEdit = Boolean(id); // Edit mode flag

  const [form, setForm] = useState({
    title: "",
    description: "",
    timeLimit: "", // Time limit in minutes
    passingScore: 0,
    instructions: "",
    order: 1, // Quiz order in course
    multipleAttempts: false,
  });

  // Load quiz data if editing
  const loadQuiz = useCallback(async () => {
    try {
      const quiz = await quizService.getQuizById(id);
      if (quiz) {
        setForm({
          ...quiz,
          description: quiz.description || "",
          instructions: quiz.instructions || "",
        });
      }
    } catch {
      toast.error("Failed to load quiz");
    }
  }, [id]);

  useEffect(() => {
    if (!isEdit) return;
    loadQuiz();
  }, [isEdit, loadQuiz]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaveLoading(true);

      const submitForm = {
        ...form,
        courseId: courseId, // Ensure course ID is attached
        description: form.description || "",
        instructions: form.instructions || "",
        timeLimit: Number(form.timeLimit) || 0,
        passingScore: Number(form.passingScore) || 0,
      };

      let result;
      if (isEdit) {
        result = await quizService.updateQuiz(id, submitForm);
      } else {
        result = await quizService.addQuiz(submitForm);
      }

      if (result) {
        toast.success(
          isEdit
            ? "Quiz updated successfully!"
            : "Quiz added successfully!"
        );
        if (!isEdit) {
          setForm({
            title: "",
            description: "",
            timeLimit: "",
            passingScore: 0,
            instructions: "",
            order: form.order + 1 || 1, // Auto-increment order
            multipleAttempts: false,
          });
        } else {
          navigate(`/InstructorLayout/Courses/${courseId}/quizzes`); // Redirect after edit, assuming route
        }
      } else {
        toast.error("Failed to save quiz.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save quiz.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-card rounded-2xl shadow-lg flex flex-col gap-8">
      <Toaster position="top-center" reverseOrder={false} />
      <LandingHeading header={isEdit ? "Edit Quiz" : "Create New Quiz"} />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quiz Title */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-text-secondary font-medium">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Introduction to JavaScript Quiz"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
            required
          />
        </div>

        {/* Order */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Order</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            placeholder="1"
            min="1"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
            required
          />
        </div>

        {/* Time Limit */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Time Limit (minutes)</label>
          <input
            type="number"
            name="timeLimit"
            value={form.timeLimit}
            onChange={handleChange}
            placeholder="e.g. 30"
            min="0"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Passing Score */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Passing Score (%)</label>
          <input
            type="number"
            name="passingScore"
            value={form.passingScore}
            onChange={handleChange}
            placeholder="e.g. 70"
            min="0"
            max="100"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-text-secondary font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief overview of the quiz..."
            className="border border-input p-3 rounded-xl h-24 focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-text-secondary font-medium">Instructions</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Provide instructions for taking the quiz..."
            className="border border-input p-3 rounded-xl h-32 focus:ring-2 focus:ring-primary bg-surface text-text-primary"
            required
          />
        </div>

        {/* Multiple Attempts */}
        <div className="flex items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            name="multipleAttempts"
            checked={form.multipleAttempts}
            onChange={handleChange}
            className="w-5 h-5 accent-primary"
          />
          <span className="text-text-secondary font-medium">Allow Multiple Attempts</span>
        </div>

        {/* Submit Quiz */}
        <div className="md:col-span-2 flex justify-start">
          <button
            type="submit"
            className={`px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition ${
              saveLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={saveLoading}
          >
            {saveLoading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
              ? "Update Quiz"
              : "Add Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuiz;