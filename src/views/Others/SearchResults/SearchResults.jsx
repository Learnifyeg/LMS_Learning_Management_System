import FiltersSidebar from "@/views/Others/SearchResults/FiltersSidebar";
import CourseCard from "@/views/Others/SearchResults/CourseCard";
import useCourse from "@/hooks/useCourse";

export default function SearchResults() {
  const { approvedCourses } = useCourse();
  const { data, isLoading, error } = approvedCourses;
  console.log(error)
  return (
    <div className="custom-container py-10 flex flex-col gap-6">
      {/* <div className="text-gray-500 text-sm">
        Home / Courses / Search Results
      </div> */}
      <h1 className="text-3xl font-semibold text-text-primary">
        Search Results
      </h1>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0">
          <FiltersSidebar />
        </div>

        {/* Courses Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <span className="text-text-secondary">
              {data?.length} Results found
            </span>
            <select className="border border-input rounded-md px-3 py-2 text-sm bg-surface">
              <option>Sort by</option>
              <option>Newest</option>
              <option>Top Rated</option>
              <option>Lowest Price</option>
            </select>
          </div>

          {isLoading && <p>Loading courses...</p>}
          {error && (
            <p className="text-red-500">
              {error.message || "Something went wrong"}
            </p>
          )}
          {!isLoading && !error && data?.length === 0 && (
            <p className="text-gray-400">No approved courses found.</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading &&
              data?.map((course) => (
                <CourseCard
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
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
