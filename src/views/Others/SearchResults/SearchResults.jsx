import FiltersSidebar from "@/views/Others/SearchResults/FiltersSidebar";
import CourseCard from "@/views/Others/SearchResults/CourseCard";
import useCourse from "@/hooks/useCourse";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function SearchResults() {
  const navigate = useNavigate();
  const { allApprovedCourses } = useCourse();
  const { data = [], isLoading, error } = allApprovedCourses;

  console.log(data)
  const [filters, setFilters] = useState({
    category: "",
    certificate: "",
    price: "",
    rating: "",
  });

  const [sortBy, setSortBy] = useState("newest");

  // Filtered list
  const filteredCourses = data.filter((course) => {
    return (
      (filters.category === "" || course.category === filters.category) &&
      (filters.certificate === "" || course.certificateIncluded === (filters.certificate === "true")) &&
      (filters.price === "" ||
        (filters.price === "free" && course.price === 0) ||
        (filters.price === "paid" && course.price > 0)) &&
      (filters.rating === "" || course.rating >= Number(filters.rating))
    );
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt || b.posted) - new Date(a.createdAt || a.posted);
      case "top-rated":
        return (b.rating || 0) - (a.rating || 0);
      case "lowest-price":
        return (a.price || 0) - (b.price || 0);
      case "highest-price":
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

  const hasActiveFilters = filters.category || filters.certificate || filters.price || filters.rating;

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          {/* Breadcrumb
          <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span className="hover:text-[var(--color-primary)] cursor-pointer transition-colors">Home</span>
            <span className="text-[var(--color-border)]">/</span>
            <span className="hover:text-[var(--color-primary)] cursor-pointer transition-colors">Courses</span>
            <span className="text-[var(--color-border)]">/</span>
            <span className="text-[var(--color-primary)] font-medium">Search Results</span>
          </nav> */}

          {/* Main Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
                Discover Courses
              </h1>
              <p className="text-lg text-[var(--text-secondary)]">
                Find the perfect course to advance your skills
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <FiltersSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-[var(--color-card)] rounded-2xl p-6 mb-6 border border-[var(--color-border)] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                      {sortedCourses.length} Course{sortedCourses.length !== 1 ? 's' : ''} Found
                    </h2>
                    {hasActiveFilters && (
                      <span className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-medium rounded-full border border-[var(--color-primary)]/20">
                        Filtered
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {sortedCourses.length === data.length 
                      ? "Showing all available courses" 
                      : "Based on your selected filters"
                    }
                  </p>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">
                    Sort by:
                  </label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-[var(--text-primary)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                  >
                    <option value="newest">Newest First</option>
                    <option value="top-rated">Top Rated</option>
                    <option value="lowest-price">Lowest Price</option>
                    <option value="highest-price">Highest Price</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg text-[var(--text-secondary)] font-medium">Loading courses...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h3 className="text-red-800 font-semibold text-lg mb-2">Something went wrong</h3>
                <p className="text-red-600">{error.message || "Failed to load courses"}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && sortedCourses.length === 0 && (
              <div className="bg-[var(--color-card)] rounded-2xl p-12 text-center border border-[var(--color-border)]">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {data.length === 0 ? "No Courses Available" : "No Courses Match Your Filters"}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                  {data.length === 0 
                    ? "There are no approved courses available at the moment. Please check back later."
                    : "Try adjusting your filters to see more results."
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={() => setFilters({ category: "", certificate: "", price: "", rating: "" })}
                    className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Courses Grid */}
            {!isLoading && !error && sortedCourses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCourses.map((course) => (
                  <CourseCard
                    onClick={() => navigate(`/CourseDetails/${course.id}`)}
                    key={course.id}
                    course={{
                      id: course.id,
                      title: course.title,
                      description: course.description,
                      category: course.category || "General",
                      author: course.author || "Unknown Instructor",
                      views: course.views || "0 views",
                      posted: course.posted || "Recently",
                      rating: course.rating || 0,
                      price: course.price || 0,
                      tag: course.tag,
                      image: course.image || "/default-course.jpg",
                      certificateIncluded: course.certificateIncluded,
                      duration: course.duration || "N/A",
                      studentsEnrolled: course.studentsEnrolled || 0,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Load More (Optional) */}
            {!isLoading && sortedCourses.length > 0 && sortedCourses.length >= 9 && (
              <div className="flex justify-center mt-12">
                <button className="bg-[var(--color-surface)] text-[var(--text-primary)] font-semibold px-8 py-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-200">
                  Load More Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}