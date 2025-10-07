// React
import React, {lazy, Suspense ,  useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// Lazy load CourseCard
const CourseCard = lazy(() => import("../Student/CourseCard/CourseCard"));
const OrderSummary = lazy(() => import("../Student/CourseCard/OrderSummary"));

function StuShoppingCart() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const URL = "http://localhost:3001";
  const CartEndPoint = "Cart";
  useEffect(() => {
    // Get  All Cart
    axios
      .get(`${URL}/${CartEndPoint}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Remove Course
  const handleRemove = async (id) => {
    // delete the data
    await axios
      .delete(`${URL}/${CartEndPoint}/${id}`)
      .then((res) => console.log("Deleted", res.data))
      .catch((err) => console.log(err));
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
      <div className="flex flex-col gap-4 pt-24 px-24 max-xl:px-4 max-lg:px-6 max-md:px-4 items-center">
        <div className="w-full flex justify-start">
          <p className="text-2xl font-semibold">Shopping Cart</p>
        </div>
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
