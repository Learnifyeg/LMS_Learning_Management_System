import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLesson from "@/hooks/useLesson";
import toast, { Toaster } from "react-hot-toast";

export default function CreateLesson() {
  const { id: courseId } = useParams(); // courseId must come from URL
  const navigate = useNavigate();
  const { addLessonMutation } = useLesson();

  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    order: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "order" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) return toast.error("Course ID missing!");

    try {
      await addLessonMutation.mutateAsync({ ...form, courseId: Number(courseId) });
      toast.success("Lesson created successfully!");
      navigate(`/InstructorLayout/InstCourseDetails/${courseId}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create lesson. Check all fields.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-card rounded-2xl shadow-lg flex flex-col gap-6">
      <Toaster />
      <h2 className="text-2xl font-bold">Create Lesson</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Lesson Title"
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="order"
          value={form.order}
          onChange={handleChange}
          placeholder="Lesson Order"
          className="border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-primary text-white py-2 rounded hover:bg-primary/90"
        >
          Create Lesson
        </button>
      </form>
    </div>
  );
}
