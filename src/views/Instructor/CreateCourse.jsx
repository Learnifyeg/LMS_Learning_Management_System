import { useState } from "react";
import { useAppStore } from "@/store/app";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";
import toast, { Toaster } from "react-hot-toast";
import CourseService from "@/store/Classes/Course";

function CreateCourse() {
  const courseService = new CourseService();
  const { saveLoading, setSaveLoading } = useAppStore();
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    hours: "",
    price: 0,
    tag: "",
    image: "",
    certificateIncluded: false,
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaveLoading(true);
      const result = await courseService.addCourse(form);
      if (result) {
        toast.success("Course submitted successfully! Waiting for approval.");
        setForm({
          title: "",
          description: "",
          category: "",
          hours: "",
          price: 0,
          tag: "",
          image: "",
          certificateIncluded: false,
          duration: "",
        });
      } else {
        toast.error("Failed to submit course.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit course.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-card rounded-2xl shadow-lg flex flex-col gap-8">
      <Toaster position="top-center" reverseOrder={false} />
      <LandingHeading header="Create New Course" />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Course Title */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-text-secondary font-medium">Course Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Intro to Web Development"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Programming, Business, Marketing..."
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 4 Weeks"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Hours</label>
          <input
            type="text"
            name="hours"
            value={form.hours}
            onChange={handleChange}
            placeholder="e.g. 12 Hours"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 49.99"
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Tag */}
        <div className="flex flex-col gap-2">
          <label className="text-text-secondary font-medium">Tag</label>
          <input
            type="text"
            name="tag"
            value={form.tag}
            onChange={handleChange}
            placeholder="Beginner, Advanced..."
            className="border border-input p-3 rounded-xl focus:ring-2 focus:ring-primary bg-surface text-text-primary"
          />
        </div>

        {/* Cover Image */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-text-secondary font-medium">Cover Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
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
            placeholder="Write a brief description about the course..."
            className="border border-input p-3 rounded-xl h-32 focus:ring-2 focus:ring-primary bg-surface text-text-primary"
            required
          />
        </div>

        {/* Certificate Included */}
        <div className="flex items-center gap-3 md:col-span-2">
          <input
            type="checkbox"
            name="certificateIncluded"
            checked={form.certificateIncluded}
            onChange={handleChange}
            className="w-5 h-5 accent-primary"
          />
          <span className="text-text-secondary font-medium">
            Certificate Included
          </span>
        </div>

        {/* Add Lesson Button */}
        <button
          type="button"
          className="md:col-span-2 border border-primary text-primary rounded-xl py-3 hover:bg-primary/10 transition"
        >
          + Add Lesson
        </button>

        {/* Submit Course */}
        <div className="md:col-span-2 flex justify-start">
          <button
            type="submit"
            className={`px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition ${
              saveLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={saveLoading}
          >
            {saveLoading ? "Submitting..." : "Submit Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;
