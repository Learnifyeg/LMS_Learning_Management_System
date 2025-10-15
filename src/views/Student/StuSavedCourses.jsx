// React
import React, { lazy, Suspense, useEffect, useState } from "react";

// Components
import api from "@/API/Config";

// Lazy load CourseCard
const CourseCard = lazy(() => import("../Student/CourseCard/CourseCard"));

// Endpoints and constants
const CoursesEndPoint = "SavedCourses";
const CartEndPoint = "Cart";

function StuSavedCourses() {
  const [courses, setCourses] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Get  All SavedCourses
    api
      .get(`${CoursesEndPoint}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
    // Get  All cart
    api
      .get(`${CartEndPoint}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(cart);
  // Remove Course
  const handleRemove = async (id) => {
    // delete the data
    await api
      .delete(`${CoursesEndPoint}/${id}`)
      .then((res) => console.log("Deleted", res.data))
      .catch((err) => console.log(err));
  };

  // Add to Cart
  const handleAddToCart = async (course) => {
    // add data
    if (!cart.find((c) => c.id === course.id)) {
      await api
        .post(`${CartEndPoint}`, course)
        .then((res) => console.log("add", res.data))
        .catch((err) => console.log(err));
    } else {
      alert("Course already in cart");
      return;
    }
  };

  return (
    <>
      <div className="p-6 flex flex-col items-center gap-4">
        <div className="w-full flex justify-start">
          <p className="text-2xl font-semibold">Saved Courses</p>
        </div>

        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p className="text-gray-500">No courses available.</p>
        )}
      </div>
    </>
  );
}

export default StuSavedCourses;
