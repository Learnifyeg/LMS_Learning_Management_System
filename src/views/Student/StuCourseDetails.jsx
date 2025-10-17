import api from "@/API/Config";
import React, { useEffect, useState } from "react";

const CourseDetailsEndPoint = "CourseDetails";
export default function StuCourseDetails() {
  const [course, setCourse] = useState(null);
  const [currentTab, setCurrentTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const courseId = 1; // Replace with route param if using react-router (useParams)

  useEffect(() => {
    setLoading(true);
    api
      .get(CourseDetailsEndPoint)
      .then((res) => setCourse(res.data[0]), setLoading(false))
      .catch((err) => console.log(err), setLoading(true))
      .finally(() => setLoading(false));
  }, []);
  // console.log(course);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-fade-in-up prose card">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="prose card">No course found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="custom-container py-8">
        {/* Top header */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <div className="card flex flex-col md:flex-row items-start gap-6">
              <img
                src={course.image}
                alt={course.title}
                className="w-full md:w-56 h-40 object-cover rounded shadow-sm"
              />

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">
                  {course.title || "Untitled course"}
                </h1>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  {course.subtitle}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold">
                    ⭐ {course.rating ?? "-"}{" "}
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      ({course.ratingsCount.toLocaleString()})
                    </span>
                  </div>

                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {course.enrolled.toLocaleString()} students enrolled · Last
                    updated {course.lastUpdated || "-"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="btn btn-primary btn-hover">
                    Add to Cart
                  </button>
                  <button className="btn btn-hover border border-[var(--input)] bg-transparent text-[var(--text-primary)]">
                    Buy Now
                  </button>
                  {/* <div className="ml-auto hidden md:flex flex-col items-start gap-1">
                    <label className="text-xs text-[var(--color-text-secondary)] font-semibold mb-1">
                      Languages
                    </label>
                    <select className="text-xs border rounded px-2 py-1 bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                      {course.languages.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>
              </div>
            </div>

            {/* About / Tabs */}
            <div className="mt-6">
              <div className="card">
                <div className="flex gap-6 border-b pb-4">
                  <button
                    onClick={() => setCurrentTab("about")}
                    className={`pb-2 font-semibold ${
                      currentTab === "about"
                        ? "text-[var(--secondary)] border-[var(--secondary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--secondary)] border-transparent hover:border-[var(--secondary)]"
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setCurrentTab("details")}
                    className={`pb-2 font-semibold ${
                      currentTab === "details"
                        ? "text-[var(--secondary)] border-[var(--secondary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--secondary)] border-transparent hover:border-[var(--secondary)]"
                    }`}
                  >
                    Course Details
                  </button>
                  <button
                    onClick={() => setCurrentTab("content")}
                    className={`pb-2 font-semibold ${
                      currentTab === "content"
                        ? "text-[var(--secondary)] border-[var(--secondary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--secondary)] border-transparent hover:border-[var(--secondary)]"
                    }`}
                  >
                    Course Content
                  </button>
                </div>

                <div className="mt-6 prose">
                  {currentTab === "about" && (
                    <div className="space-y-6">
                      {/* Requirements */}
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          Requirements
                        </h2>
                        <ul className="list-disc pl-5 text-text-secondary space-y-1">
                          {course.requirements?.length ? (
                            course.requirements.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))
                          ) : (
                            <li>No special requirements listed.</li>
                          )}
                        </ul>
                      </div>

                      {/* Description */}
                      <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold mb-2">
                          Description
                        </h2>
                        <p>
                          {course.description ||
                            course.subtitle ||
                            "No description available."}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTab === "details" && (
                    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
                      <h2 className="text-xl font-bold mb-4">Course Details</h2>
                      <ul className="space-y-2 text-text-secondary">
                        <li className="flex justify-between">
                          <span className="font-medium text-text-primary">
                            Price:
                          </span>
                          <span className="text-primary font-semibold">
                            ${course.price}
                          </span>
                        </li>

                        <li className="flex justify-between">
                          <span className="font-medium text-text-primary">
                            Enrolled:
                          </span>
                          <span>{course.enrolled} students</span>
                        </li>

                        <li className="flex justify-between">
                          <span className="font-medium text-text-primary">
                            Last Updated:
                          </span>
                          <span>{course.lastUpdated}</span>
                        </li>

                        <li className="flex justify-between">
                          <span className="font-medium text-text-primary">
                            Languages:
                          </span>
                          <span>{course.languages.join(", ")}</span>
                        </li>

                        <li className="flex justify-between">
                          <span className="font-medium text-text-primary">
                            Instructor:
                          </span>
                          <span className="font-semibold">
                            {course.instructor.name}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {currentTab === "content" && (
                    <div className="course-content mt-8">
                      <h2 className="text-xl font-bold mb-4">Course Content</h2>

                      {course.curriculum?.length ? (
                        <div className="space-y-3">
                          {course.curriculum.map((section, i) => (
                            <details
                              key={i}
                              className="group border border-border rounded-lg overflow-hidden bg-surface"
                            >
                              {/* Section Header */}
                              <summary className="flex justify-between items-center p-4 cursor-pointer font-semibold text-text-primary hover:bg-muted transition-all">
                                {section.title}
                                <span className="group-open:rotate-180 transition-transform">
                                  ▼
                                </span>
                              </summary>

                              {/* Lessons */}
                              <ul className="p-4 space-y-2">
                                {section.lessons.map((lesson, j) => (
                                  <li
                                    key={j}
                                    className="flex justify-between items-center p-2 rounded hover:bg-accent/20 transition-all cursor-pointer"
                                  >
                                    <div>
                                      <a
                                        href={lesson.link}
                                        className="font-medium text-primary hover:underline"
                                      >
                                        {lesson.title}
                                      </a>
                                      {lesson.description && (
                                        <p className="text-sm text-text-secondary">
                                          {lesson.description}
                                        </p>
                                      )}
                                    </div>
                                    {lesson.duration && (
                                      <span className="text-xs text-muted-foreground">
                                        {lesson.duration}
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ))}
                        </div>
                      ) : (
                        <p>No course content available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Curriculum */}
              {/* <div className="card mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Course content</h3>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {course.curriculum.length} sections
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="flex flex-col gap-4">
            <div className="card sticky top-6">
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">
                    {course.instructor.name || "Instructor"}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {course.instructor.bio}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="btn btn-primary">Subscribe</button>
                <button className="btn btn-secondary">Message</button>
              </div>

              <div className="mt-4 border-t pt-3 text-sm text-[var(--color-text-secondary)]">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-semibold">${course.price ?? "-"}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Last updated</span>
                  <span>{course.lastUpdated || "-"}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="text-xs">👁</span> {course.stats.views}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">👍</span> {course.stats.likes}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">👎</span> {course.stats.dislikes}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">🔗</span> {course.stats.shares}
                </div>
              </div>
            </div>

            <div className="card text-sm text-[var(--text-secondary)]">
              <div className="font-semibold mb-2">Quick actions</div>
              <button className="text-text-secondary w-full btn btn-hover mb-2">
                Save
              </button>
              <button className="text-text-secondary w-full btn btn-hover">
                Report abuse
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
