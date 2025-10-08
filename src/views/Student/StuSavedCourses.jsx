// React
import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";

// Lazy load CourseCard
const CourseCard = lazy(() => import("../Student/CourseCard/CourseCard"));
function StuSavedCourses() {
  const [courses, setCourses] = useState({});
  const [cart, setCart] = useState([]);
  const URL = "http://localhost:3001";
  const CoursesEndPoint = "SavedCourses";
  const CartEndPoint = "Cart";
  useEffect(() => {
    // Get  All SavedCourses
    axios
      .get(`${URL}/${CoursesEndPoint}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
    // Get  All cart
    axios
      .get(`${URL}/${CartEndPoint}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(cart);
  // Remove Course
  const handleRemove = async (id) => {
    // delete the data
    await axios
      .delete(`${URL}/${CoursesEndPoint}/${id}`)
      .then((res) => console.log("Deleted", res.data))
      .catch((err) => console.log(err));
  };

  // Add to Cart
  const handleAddToCart = async (course) => {
    // add data
    if (!cart.find((c) => c.id === course.id)) {
      await axios
        .post(`${URL}/${CartEndPoint}`, course)
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
