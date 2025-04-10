import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import hemImage from "../../assets/hem.jpg";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-3l9h.onrender.com/api/v1/get-order-history",
          { headers }
        );
        console.log("API Response Data:", response.data);  // Log the response to check the structure
        // Ensure response data contains a 'data' field with an array of orders
        if (response.data.status === "success") {
          setOrderHistory(response.data.data); // Set state properly
        } else {
          setError("Failed to fetch order history. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError("Failed to fetch order history. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) return <Loader />;

  // Display error message if there is an error
  if (error) {
    return (
      <div className="flex items-center justify-center h-[100%] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  // Check if orderHistory is null or an empty array
  if (orderHistory.length === 0) {
    return (
      <div className="h-[80vh] p-4 text-zinc-100">
        <div className="h-[100%] flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            No Order History
          </h1>
          <img
            src={hemImage}
            alt="No Orders"
            className="h-[20vh] mb-8"
          />
          <Link
            to="/shop"
            className="text-blue-500 hover:underline text-xl"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Your Order History
      </h1>
      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
        <div className="w-[3%]">
          <h1 className="text-center">Sr.</h1>
        </div>
        <div className="w-[22%]">
          <h1>Books</h1>
        </div>
        <div className="w-[45%]">
          <h1>Descriptions</h1>
        </div>
        <div className="w-[9%]">
          <h1>Price</h1>
        </div>
        <div className="w-[16%]">
          <h1>Status</h1>
        </div>
        <div className="w-none md:w-[5%] hidden md:block">
          <h1>Model</h1>
        </div>
      </div>

      {orderHistory.map((item, i) => {
        const { book, status } = item;
        const bookTitle = book?.title || "Loading.."; // Default value if book.title is missing
        const bookDesc = book?.desc?.slice(0, 50) + "..." || "Description unavailable"; // Default value if book.desc is missing
        const bookPrice = book?.price ? `₹ ${book.price}` : "Price unavailable"; // Default value if book.price is missing
        const bookLink = book?._id ? `/view-book-details/${book._id}` : "#"; // Fallback if book._id is missing

        return (
          <div
            key={item._id || i}  // Use _id for the key if available
            className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
          >
            <div className="w-[3%]">
              <h1 className="text-center">{i + 1}</h1>
            </div>
            <div className="w-[22%]">
              <Link
                to={bookLink}  // Navigate to book details
                className="hover:text-blue-300"
              >
                {bookTitle}  {/* Display book title */}
              </Link>
            </div>
            <div className="w-[45%]">
              <h1>{bookDesc}</h1>  {/* Truncate description */}
            </div>
            <div className="w-[9%]">
              <h1>{bookPrice}</h1>  {/* Display book price */}
            </div>
            <div className="w-[16%]">
              <h1 className="font-semibold text-yellow-500">
                {status === "Order placed" ? (
                  <div className="text-green-500">{status}</div>
                ) : status === "Canceled" ? (
                  <div className="text-red-500">{status}</div>
                ) : (
                  status
                )}
              </h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="text-sm text-zinc-400">COD</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrderHistory;
