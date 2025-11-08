import React from "react";

function CourseCard({ course, onRemove, onAddToCart }) {
  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{course.title}</h2>
      <p className="text-gray-600 text-sm">{course.description}</p>

      <div className="flex items-center justify-between mt-3 text-sm">
        <span>Rating: {course.rating}</span>
        <span>Price: ${course.price}</span>
      </div>

      <div className="flex gap-2 mt-3">
        {onRemove && (
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={onRemove}
          >
            Remove
          </button>
        )}

        {onAddToCart && (
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
