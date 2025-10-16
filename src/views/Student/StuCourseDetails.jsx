import React, { useEffect, useState } from "react";
import axios from "axios";

/*
  CourseDetail.jsx
  - Single-file React component for a Student Course Detail page
  - Uses Tailwind + the provided index.css variables for theming
  - Fetches course data via axios from `/api/courses/:id` (change to your endpoint)
  - Falls back to a mocked JSON object when the request fails (so you can preview UI)

  How to use:
  1. Place this file inside your React project (e.g. src/pages/CourseDetail.jsx)
  2. Import your global index.css (the CSS you provided) in index.js or App.js
     import '../index.css';
  3. Install axios if not already: npm i axios
  4. Add a route in App.js: <Route path="/course/:id" element={<CourseDetail/>} />

  Notes:
  - The component expects the server to return a JSON object with the shape used
    in `mockCourse` below. Adapt fields to your backend.
*/

const mockCourse = {
  id: 1,
  title: "The Web Developer Bootcamp",
  subtitle: "The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
  image: "/coursedetailsUI.jpg",
  rating: 5.3,
  ratingsCount: 81665,
  enrolled: 114521,
  languages: ["English", "Dutch"],
  lastUpdated: "1/2024",
  instructor: {
    name: "Johnson Smith",
    avatar: "https://i.pravatar.cc/80?img=12",
    bio: "Full-stack web developer and instructor",
  },
  stats: {
    views: 1452,
    likes: 100,
    dislikes: 20,
    shares: 9,
  },
  requirements: [
    "Have a computer with Internet",
    "Be ready to learn an insane amount of awesome stuff",
  ],
  curriculum: [
    { id: 1, title: "Introduction", duration: "6m", lessons: 3 },
    { id: 2, title: "HTML Basics", duration: "42m", lessons: 6 },
    { id: 3, title: "CSS & Layouts", duration: "1h 20m", lessons: 12 },
    { id: 4, title: "JavaScript Fundamentals", duration: "3h", lessons: 20 },
  ],
  price: 29.99,
};

export default function StuCourseDetails() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const courseId = 1; // Replace with route param if using react-router (useParams)

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`/api/courses/${courseId}`)
      .then((res) => {
        if (!mounted) return;
        // if your server returns { data: {...} } change accordingly
        setCourse(res.data || res.data?.course || mockCourse);
      })
      .catch((err) => {
        console.warn("Course fetch failed, using mock course", err?.message);
        if (!mounted) return;
        // Fallback to mocked data so you can see the UI without backend
        setCourse(mockCourse);
        setError(err?.message || "Network error");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => (mounted = false);
  }, [courseId]);

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

  // Defensive defaults to avoid "Cannot read properties of undefined"
  const ratingsCount = course?.ratingsCount ?? 0;
  const enrolled = course?.enrolled ?? 0;
  const languages = Array.isArray(course?.languages) ? course.languages : [];
  const requirements = Array.isArray(course?.requirements) ? course.requirements : [];
  const curriculum = Array.isArray(course?.curriculum) ? course.curriculum : [];
  const instructor = course?.instructor || { name: "", avatar: "", bio: "" };
  const stats = course?.stats || { views: 0, likes: 0, dislikes: 0, shares: 0 };

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
                <h1 className="text-2xl font-bold mb-1">{course.title || "Untitled course"}</h1>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">{course.subtitle}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold">
                    ⭐ {course.rating ?? "-"} <span className="text-xs text-[var(--color-text-secondary)]">({(ratingsCount).toLocaleString()})</span>
                  </div>

                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {(enrolled).toLocaleString()} students enrolled · Last updated {course.lastUpdated || "-"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="btn btn-primary btn-hover">Add to Cart</button>
                  <button className="btn btn-hover border border-[var(--input)] bg-transparent text-[var(--text-primary)]">Buy Now</button>
                  <div className="ml-auto hidden md:flex items-center gap-3">
                    <div className="text-xs text-[var(--color-text-secondary)]">Languages</div>
                    <div className="flex gap-2">
                      {languages.map((l) => (
                        <span key={l} className="px-2 py-1 text-xs border rounded text-[var(--color-text-secondary)]">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About / Tabs */}
            <div className="mt-6">
              <div className="card">
                <div className="flex gap-6 border-b pb-4">
                  <button className="text-[var(--color-text-secondary)] border-b-2 border-[var(--primary)] pb-2 font-semibold">About</button>
                  <button className="text-[var(--color-text-secondary)] pb-2">Courses Content</button>
                  <button className="text-[var(--color-text-secondary)] pb-2">Reviews</button>
                </div>

                <div className="mt-6 prose">
                  <h2>Requirements</h2>
                  <ul className="list-disc pl-5">
                    {requirements.length ? (
                      requirements.map((r, i) => <li key={i}>{r}</li>)
                    ) : (
                      <li>No special requirements listed.</li>
                    )}
                  </ul>

                  <h2 className="mt-6">Description</h2>
                  <p>
                    {course.description || course.subtitle || "No description available."}
                  </p>
                </div>
              </div>

              {/* Curriculum */}
              <div className="card mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Course content</h3>
                  <div className="text-sm text-[var(--color-text-secondary)]">{curriculum.length} sections</div>
                </div>

                <div className="space-y-3">
                  {curriculum.length ? (
                    curriculum.map((section) => (
                      <details key={section.id} className="border rounded p-3 bg-[var(--color-surface)]/60">
                        <summary className="cursor-pointer font-medium flex items-center justify-between">
                          <div>
                            {section.title}
                            <div className="text-xs text-[var(--color-text-secondary)]">{section.lessons} lessons · {section.duration}</div>
                          </div>
                          <div className="text-xs text-[var(--color-text-secondary)]">Expand</div>
                        </summary>

                        <div className="mt-3 ml-2 text-sm text-[var(--color-text-secondary)]">
                          <ul className="list-disc pl-5">
                            {Array.from({ length: Math.max(1, section.lessons || 1) }).slice(0, 4).map((_, idx) => (
                              <li key={idx}>Lesson {idx + 1} — <span className="text-xs">(video · 5-12m)</span></li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    ))
                  ) : (
                    <div className="text-[var(--color-text-secondary)]">No curriculum available for this course.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="flex flex-col gap-4">
            <div className="card sticky top-6">
              <div className="flex items-center gap-3">
                <img src={instructor.avatar} alt={instructor.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{instructor.name || "Instructor"}</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">{instructor.bio}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="btn btn-primary">Subscribe</button>
                <button className="btn btn-secondary">Message</button>
              </div>

              <div className="mt-4 border-t pt-3 text-sm text-[var(--color-text-secondary)]">
                <div className="flex justify-between"><span>Price</span><span className="font-semibold">${course.price ?? "-"}</span></div>
                <div className="flex justify-between mt-2"><span>Last updated</span><span>{course.lastUpdated || "-"}</span></div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-2"><span className="text-xs">👁</span> {stats.views}</div>
                <div className="flex items-center gap-2"><span className="text-xs">👍</span> {stats.likes}</div>
                <div className="flex items-center gap-2"><span className="text-xs">👎</span> {stats.dislikes}</div>
                <div className="flex items-center gap-2"><span className="text-xs">🔗</span> {stats.shares}</div>
              </div>
            </div>

            <div className="card text-sm text-[var(--text-secondary)]">
              <div className="font-semibold mb-2">Quick actions</div>
              <button className="text-text-secondary w-full btn btn-hover mb-2">Save</button>
              <button className="text-text-secondary w-full btn btn-hover">Report abuse</button>
            </div>
          </aside>
        </div>

        {/* small footer note about error if any */}
        {error && (
          <div className="mt-6 prose card">Failed to fetch live data: {error}. Showing fallback/mock data for preview.</div>
        )}
      </div>
    </div>
  );
}
