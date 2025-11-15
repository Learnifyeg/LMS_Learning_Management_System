export default function CourseCard({ course , onClick }) {
  return (
    <div
      className="card card-hover flex flex-col overflow-hidden animate-fade-in-up shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg bg-[var(--surface)]
    "
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <img
          src={
            course.image || "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={course.title}
          className="w-full h-full object-cover rounded-t-lg"
        />
        {/* Tag */}
        <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          {course.tag || "Featured"}
        </div>
        {/* Duration */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md">
          {course.duration} hrs
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-lg mb-1 text-[var(--text-primary)] line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
            {course.description || "No description available."}
          </p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            By {course.author}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
            ⭐ {course.rating?.toFixed(1) ?? "-"}
          </div>
          <span className="text-[var(--primary)] font-semibold text-sm">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </div>

        {/* Views & Posted */}
        <div className="mt-2 flex justify-between text-xs text-[var(--text-secondary)]">
          <span>{course.views} views</span>
          <span>{course.posted}</span>
        </div>

        {/* Certificate Badge */}
        {course.certificateIncluded && (
          <div className="mt-3 text-xs bg-primary text-white px-2 py-1 rounded-md w-fit font-semibold shadow-sm">
            Certificate Included
          </div>
        )}
      </div>
    </div>
  );
}
