import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useLesson from "@/hooks/useLesson";
import LandingHeading from "@/components/Landing/LandingHeading/LandingHeading";

export default function EditLesson() {
  const { lessonid } = useParams();
  const navigate = useNavigate();

  const { getLessonById, updateLessonMutation } = useLesson(lessonid);
  const { data: lesson, isLoading } = getLessonById(lessonid);

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
    contentType: "Video",
    attachmentUrl: "",
    isFreePreview: false,
    order: 1,
  });

  useEffect(() => {
    if (lesson) {
      setForm({
        title: lesson.title,
        description: lesson.description,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration,
        contentType: lesson.contentType,
        attachmentUrl: lesson.attachmentUrl,
        isFreePreview: lesson.isFreePreview,
        order: lesson.order,
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLessonMutation.mutateAsync({
        id: Number(lessonid),
        ...form,
      });

      toast.success("Lesson updated successfully!");
      navigate(`/InstructorLayout/InstLessonDetails/${lessonid}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update lesson.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg font-medium text-text-secondary">Loading lesson...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <Toaster position="top-center" />
      <div className="custom-container">
        <div className="max-w-2xl mx-auto">
          <div className="card border border-border p-8 space-y-6">
              <LandingHeading header="Edit Lesson" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
                  Basic Information
                </h3>
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Lesson Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter lesson title"
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Lesson Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe what students will learn in this lesson..."
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg h-24 resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Lesson Order *
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    placeholder="1"
                    min="1"
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
                  Lesson Content
                </h3>
                
                {/* Content Type */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Content Type *
                  </label>
                  <select
                    name="contentType"
                    value={form.contentType}
                    onChange={handleChange}
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="Video">Video</option>
                    <option value="Document">Document</option>
                    <option value="Article">Article</option>
                  </select>
                </div>

                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={form.videoUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/video"
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="60"
                    min="1"
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Attachments Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
                  Attachments
                </h3>
                
                {/* Attachment URL */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Attachment URL
                  </label>
                  <input
                    type="url"
                    name="attachmentUrl"
                    value={form.attachmentUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/document"
                    className="w-full border border-input bg-background text-text-primary p-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Settings Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
                  Lesson Settings
                </h3>
                
                {/* Free Preview */}
                <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-muted/50">
                  <input
                    type="checkbox"
                    name="isFreePreview"
                    checked={form.isFreePreview}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary bg-background border-input rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <label className="text-sm font-medium text-text-primary cursor-pointer">
                      Enable Free Preview
                    </label>
                    <p className="text-xs text-text-secondary mt-1">
                      Allow students to preview this lesson for free
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <button
                  type="submit"
                  disabled={updateLessonMutation.isLoading}
                  className="flex-1 btn btn-primary btn-hover py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateLessonMutation.isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 btn bg-transparent border border-input text-text-primary btn-hover py-3 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Preview Card */}
          {form.title && (
            <div className="card border border-border mt-6 p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Lesson Preview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Title:</span>
                  <span className="text-text-primary font-medium">{form.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Type:</span>
                  <span className="text-text-primary font-medium">{form.contentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Duration:</span>
                  <span className="text-text-primary font-medium">{form.duration || "Not set"} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Free Preview:</span>
                  <span className={`font-medium ${form.isFreePreview ? 'text-green-600' : 'text-text-secondary'}`}>
                    {form.isFreePreview ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}