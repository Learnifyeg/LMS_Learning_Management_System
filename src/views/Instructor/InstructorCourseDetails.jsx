import useCourse from "@/hooks/useCourse";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function     () {
  const { id } = useParams(); // course ID
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("about");

  const { CourseById } = useCourse(id);
  const { data: course, isLoading } = CourseById;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-fade-in-up card prose">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card prose">No course found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="custom-container py-8">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Course Card */}
            <div className="card flex flex-col md:flex-row items-start gap-6 card-hover">
              <img
                src={course.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={course.title}
                className="w-full md:w-56 h-40 object-cover rounded shadow-sm"
              />
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    ⭐ {course.rating ?? "-"}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">
                    {course.studentsEnrolled} enrolled · {course.posted}
                  </span>
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    className="btn btn-primary btn-hover"
                    
                    onClick={() => navigate(`/InstructorLayout/CreateLesson/${id}`)}
                  >
                    + Add Lesson
                  </button>
                  <button
                    className="btn btn-hover border border-[var(--input)] bg-transparent"
                    onClick={() => navigate(`/InstructorLayout/CreateQuiz/${id}`)}
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
                    currentTab === "about"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-text-secondary"
                  }`}
                  onClick={() => setCurrentTab("about")}
                >
                  About
                </button>

                <button
                  className={`pb-2 font-semibold ${
                    currentTab === "content"
                      ? "text-secondary border-b-2 border-secondary"
                      : "text-text-secondary"
                  }`}
                  onClick={() => setCurrentTab("content")}
                >
                  Course Content
                </button>
              </div>

              <div className="prose mt-6">
                {currentTab === "about" && (
                  <div className="space-y-4">
                    <h2>Description</h2>
                    <p className="text-[var(--color-text-secondary)]">
                      {course.description || "No description provided."}
                    </p>

                    <h2>Course Duration</h2>
                    <p className="text-[var(--color-text-secondary)]">{course.duration}</p>
                  </div>
                )}

                {currentTab === "content" && (
                  <div className="space-y-4">
                    <h2>Lessons</h2>
                    {course.lessons && course.lessons.length > 0 ? (
                      <ul className="space-y-2">
                        {course.lessons.map((lesson, index) => (
                          <li
                            key={index}
                            className="card p-3 cursor-pointer hover:bg-muted card-hover"
                            onClick={()=>navigate("/InstructorLayout/InstLessonDetails/"+lesson["id"])}
                          >
                            Lesson {index + 1} - {lesson}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No lessons available.</p>
                    )}

                    <h2>Quizzes</h2>
                    {course.quizzes && course.quizzes.length > 0 ? (
                      <ul className="space-y-2">
                        {course.quizzes.map((quiz, index) => (
                          <li
                            key={index}
                            className="card p-3 cursor-pointer hover:bg-muted card-hover"
                          >
                            Quiz {index + 1} - {quiz.title}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No quizzes available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="card space-y-3 p-4">
            <h2 className="text-lg font-semibold mb-2">Course Information</h2>
            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>
                Price: <span className="font-semibold">${course.price}</span>
              </p>
              <p>Views: {course.views}</p>
              <p>Duration: {course.hours}</p>
              <p>Students: {course.studentsEnrolled}</p>
              <p>Author: {course.author}</p>
              <p>Category: {course.category || "N/A"}</p>
              <p>Certificate Included: {course.certificateIncluded ? "Yes" : "No"}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
