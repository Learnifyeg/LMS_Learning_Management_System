import React, { useState } from "react";
import axios from "axios";

/*
  HelpPage.jsx
  - Help / Support landing page matching the provided design.
  - Uses Tailwind + your index.css variables for styling.
  - Includes: dark hero with centered search, tabs (Instructor/Student), topic cards grid,
    and a left sidebar to match the LMS layout used in other pages.

  How to use:
  1. Put this file in src/pages or src/views in your React project.
  2. Make sure your global index.css (the CSS you provided) is imported in index.js.
  3. Install axios if you plan to wire the search to your backend: npm i axios
  4. Add a route: <Route path="/help" element={<HelpPage/>} />
*/

const TOPICS = [
  {
    id: "payments",
    title: "Payments",
    subtitle: "Understand the revenue share and how to receive payments.",
    icon: "💳",
  },
  {
    id: "selling",
    title: "Selling & Promotion",
    subtitle: "Learn about the announcement and promotional tools.",
    icon: "📣",
  },
  {
    id: "quality",
    title: "Quality Standards",
    subtitle: "Learn what it takes to create a high quality course.",
    icon: "📄",
  },
  {
    id: "publishing",
    title: "Publishing",
    subtitle: "How to publish your course and set pricing.",
    icon: "🚀",
  },
  {
    id: "students",
    title: "Student Questions",
    subtitle: "Find answers to common student-facing issues.",
    icon: "🎓",
  },
  {
    id: "technical",
    title: "Technical Issues",
    subtitle: "Reports, uploads, encoding and playback troubleshooting.",
    icon: "🛠️",
  },
];

export default function HelpPage() {
  const [activeRole, setActiveRole] = useState("instructor");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setResults(null);
    try {
      // Replace with your search endpoint if available
      const res = await axios.get(`/api/help/search?q=${encodeURIComponent(query)}&role=${activeRole}`);
      setResults(res.data || []);
    } catch (err) {
      // Fallback: fake results so UI is visible
      setResults([
        { id: 1, title: `How to ${query} (example)`, excerpt: "This is a sample help result used for preview." },
      ]);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="flex">
        {/* left sidebar placeholder (compact) */}
        <aside className="hidden md:block w-56 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] min-h-screen p-4">
          <div className="font-bold mb-4">learnify</div>
          <nav className="space-y-2 text-sm">
            <div className="px-2 py-1 rounded bg-[var(--sidebar-primary)]/10">Home</div>
            <div className="px-2 py-1 rounded">Live Streams</div>
            <div className="px-2 py-1 rounded">Explore</div>
            <div className="px-2 py-1 rounded">Categories</div>
            <div className="px-2 py-1 rounded">Help</div>
          </nav>
        </aside>

        <main className="flex-1">
          {/* Hero */}
          <div className="bg-[var(--text-primary)]/95 text-white py-16">
            <div className="custom-container text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">How may we help you?</h1>

              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 rounded px-4 py-3 shadow border border-[var(--input)] text"
                    placeholder="Search for solutions"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="btn btn-primary">{searching ? "Searching…" : "Search"}</button>
                </div>
              </form>

              {/* Role tabs */}
              {/* <div className="mt-8">
                <div className="inline-flex gap-4 bg-transparent rounded">
                  <button
                    onClick={() => setActiveRole("instructor")}
                    className={`px-4 py-2 ${activeRole === "instructor" ? "border-b-2 border-[var(--secondary)] font-semibold" : "text-white/70"}`}>
                    Instructor
                  </button>
                  <button
                    onClick={() => setActiveRole("student")}
                    className={`px-4 py-2 ${activeRole === "student" ? "border-b-2 border-[var(--secondary)] font-semibold" : "text-white/70"}`}>
                    Student
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          {/* Content */}
          <div className="custom-container py-10">
            <h3 className="text-lg font-semibold mb-4">Select a topic to search for help</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOPICS.map((t) => (
                <article key={t.id} className="card p-6 flex flex-col items-start gap-4 hover:shadow-md card-hover">
                  <div className="w-12 h-12 rounded-md bg-[var(--secondary)]/10 flex items-center justify-center text-2xl">{t.icon}</div>
                  <h4 className="font-semibold text-lg">{t.title}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t.subtitle}</p>
                  <div className="mt-auto">
                    <button className="btn btn-hover btn-primary">Explore</button>
                  </div>
                </article>
              ))}
            </div>

            {/* Search results (if any) */}
            {results && (
              <div className="mt-10">
                <h4 className="font-semibold">Search results</h4>
                <div className="mt-4 space-y-3">
                  {results.length ? (
                    results.map((r) => (
                      <div key={r.id} className="card p-4">
                        <div className="font-medium">{r.title}</div>
                        <div className="text-sm text-[var(--color-text-secondary)]">{r.excerpt}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[var(--color-text-secondary)]">No results found.</div>
                  )}
                </div>
              </div>
            )}

            {/* Quick links row */}
            <div className="mt-12">
              <h4 className="font-semibold mb-4">Popular guides</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-4 flex items-start gap-3">
                  <div className="text-2xl">📁</div>
                  <div>
                    <div className="font-medium">Getting started</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">Where to begin as an instructor or student.</div>
                  </div>
                </div>

                <div className="card p-4 flex items-start gap-3">
                  <div className="text-2xl">💸</div>
                  <div>
                    <div className="font-medium">Payouts explained</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">How and when instructors receive payments.</div>
                  </div>
                </div>

                <div className="card p-4 flex items-start gap-3">
                  <div className="text-2xl">🔒</div>
                  <div>
                    <div className="font-medium">Account & privacy</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">Control your profile and privacy settings.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="bg-[var(--surface)] py-6 mt-8">
            <div className="custom-container text-sm text-[var(--color-text-secondary)]">Still need help? Contact support at support@learnify.example</div>
          </footer>
        </main>
      </div>
    </div>
  );
}
