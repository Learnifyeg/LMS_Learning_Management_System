import React, { useState } from "react";
import CourseCard from "../Student/CourseCard/CourseCard";
import coursesData from "../../CourseData/courseData.json";
import OrderSummary from "../Student/CourseCard/OrderSummary";
import { useNavigate } from "react-router";
function StuShoppingCart() {
  const [courses, setCourses] = useState(coursesData);
  const navigate = useNavigate();

  // Remove Course
  const handleRemove = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  const handleCheckout = () => {
    navigate("/StudentLayout/StuCheckout");
  };

  return (
    <>
      <div className="flex flex-col gap-4 pt-24 px-24 max-lg:px-6 max-md:px-4">
        <p className="text-2xl font-semibold">Shopping Cart</p>
        <div className="flex flex-col lg:flex-row gap-6 items-start ">
          <div className="space-y-4">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <p className="text-gray-500">No courses available.</p>
            )}
          </div>
          <div className="flex justify-center p-6">
            <OrderSummary
              originalPrice={15}
              discount={couponApplied ? 5 : 0}
              couponApplied={couponApplied}
              onApplyCoupon={handleApplyCoupon}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default StuShoppingCart;
