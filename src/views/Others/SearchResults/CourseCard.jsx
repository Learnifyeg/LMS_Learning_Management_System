export default function CourseCard({ course }) {
  return (
    <div className="card card-hover flex flex-col overflow-hidden animate-fade-in-up">
      <div className="relative h-48 w-full">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover rounded-t-md"
        />
        <div className="absolute top-2 right-2 bg-secondary text-white text-xs px-2 py-1 rounded">
          {course.tag || "Featured"}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {course.duration} hrs
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-semibold text-lg mb-1 text-text-primary line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {course.description || "No description available."}
          </p>
          <p className="text-sm text-text-secondary mt-1">By {course.author}</p>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
            ⭐ {course.rating.toFixed(1)}
          </div>
          <span className="text-primary font-semibold text-sm">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>{course.views}</span>
          <span>{course.posted}</span>
        </div>

        {course.certificateIncluded && (
          <div className="mt-3 text-xs bg-primary text-white px-2 py-1 rounded w-fit">
            Certificate Included
          </div>
        )}
      </div>
    </div>
  );
}
