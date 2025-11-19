// ---------------- CreateQuiz.jsx ----------------
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuiz from "@/hooks/useQuiz";
import toast, { Toaster } from "react-hot-toast";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";

export default function CreateQuiz() {
  const { courseid: courseId } = useParams();
  const navigate = useNavigate();
  const { addQuizMutation } = useQuiz();

  const [form, setForm] = useState({
    title: "",
    duration: 0,
    passingScore: 50,
    totalQuestions: 0 // added field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "passingScore" || name === "totalQuestions"
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) return toast.error("Course ID missing!");

    try {
      await addQuizMutation.mutateAsync({
        ...form,
        lessonId: Number(courseId)
      });
      toast.success("Quiz created successfully!");
      navigate(`/InstructorLayout/InstCourseDetails/${courseId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create quiz. Check all fields and authorization.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-card rounded-2xl shadow-lg flex flex-col gap-6">
      <Toaster />
      <LandingHeading header="Create Quiz" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-semibold">Quiz Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter quiz title"
          className="border p-3 rounded"
          required
        />

        <label className="font-semibold">Duration (seconds)</label>
        <input
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Enter duration in seconds"
          className="border p-3 rounded"
          required
        />

        <label className="font-semibold">Passing Score</label>
        <input
          type="number"
          name="passingScore"
          value={form.passingScore}
          onChange={handleChange}
          placeholder="Enter passing score"
          className="border p-3 rounded"
          min={0}
          max={100}
          required
        />

        <label className="font-semibold">Total Questions</label>
        <input
          type="number"
          name="totalQuestions"
          value={form.totalQuestions}
          onChange={handleChange}
          placeholder="Enter total number of questions"
          className="border p-3 rounded"
          min={0}
        />

        <button
          type="submit"
          className="bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}
