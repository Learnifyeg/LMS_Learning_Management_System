import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLesson from "@/hooks/useLesson";
import toast, { Toaster } from "react-hot-toast";

export default function InstructorLessonDetails() {
  const { id } = useParams(); // lesson ID
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("content");

  const { getLessonById, deleteLessonMutation } = useLesson(id);
  const { data: lesson, isLoading } = getLessonById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-fade-in-up card prose">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card prose">No lesson found.</div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await deleteLessonMutation.mutateAsync(id);
      toast.success("Lesson deleted successfully!");
      navigate("/InstructorLayout/MyCourses"); // redirect to courses page
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete lesson.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Toaster position="top-center" />
      <div className="custom-container py-8">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Lesson Card */}
            <div className="card flex flex-col md:flex-row items-start gap-6 card-hover">
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-bold">{lesson.title}</h1>

                <p className="text-[var(--color-text-secondary)]">
                  {lesson.description || "No description provided."}
                </p>

                {lesson.videoUrl && (
                  <video
                    src={lesson.videoUrl}
                    controls
                    className="w-full h-64 object-cover rounded shadow-sm"
                  />
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    className="btn btn-primary btn-hover"
                    onClick={() =>
                      navigate(`/InstructorLayout/EditLesson/${id}`)
                    }
                  >
                    Edit Lesson
                  </button>

                  <button
                    className="btn btn-danger btn-hover"
                    onClick={handleDelete}
                  >
                    Delete Lesson
                  </button>

                  <button
                    className="btn btn-hover border border-[var(--input)] bg-transparent"
                    onClick={() =>
                      navigate(`/InstructorLayout/CreateQuiz/${lesson.courseId}`)
                    }
                  >
                    + Add Quiz
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card space-y-4">
              <div className="flex gap-6 border-b pb-4">
                <button
                  className={`pb-2 font-semibold ${
                    currentTab === "content"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-text-secondary"
                  }`}
                  onClick={() => setCurrentTab("content")}
                >
                  Lesson Content
                </button>

                <button
                  className={`pb-2 font-semibold ${
                    currentTab === "quizzes"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-text-secondary"
                  }`}
                  onClick={() => setCurrentTab("quizzes")}
                >
                  Quizzes
                </button>
              </div>

              <div className="prose mt-6">
                {currentTab === "content" && (
                  <div className="space-y-4">
                    <h2>Lesson Details</h2>
                    <p>
                      Title: <span className="font-semibold">{lesson.title}</span>
                    </p>
                    <p>
                      Description:{" "}
                      <span className="text-[var(--color-text-secondary)]">
                        {lesson.description || "N/A"}
                      </span>
                    </p>
                    <p>
                      Video URL:{" "}
                      {lesson.videoUrl ? (
                        <a
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          View Video
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                )}

                {currentTab === "quizzes" && (
                  <div className="space-y-4">
                    <h2>Quizzes</h2>
                    {lesson.quizzes && lesson.quizzes.length > 0 ? (
                      <ul className="space-y-2">
                        {lesson.quizzes.map((quiz, index) => (
                          <li
                            key={index}
                            className="card p-3 cursor-pointer hover:bg-muted card-hover"
                          >
                            Quiz {index + 1} - {quiz.title}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No quizzes available for this lesson.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="card space-y-3 p-4">
            <h2 className="text-lg font-semibold mb-2">Lesson Information</h2>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>Lesson ID: {lesson.id}</p>
              <p>Course ID: {lesson.courseId}</p>
              <p>Order: {lesson.order}</p>
              <p>Completed by students: {lesson.completedCount || 0}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
