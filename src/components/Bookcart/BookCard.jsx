import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  
  const handleRemoveBook = async () => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: data._id,
    };

    try {
      // Log headers to the console
      console.log("Headers:", headers);

      const response = await axios.delete(
        "https://book-store-backend-3l9h.onrender.com/api/v1/remove-book-from-favorites", 
        { headers } // Only pass headers as second argument
      );

      // Display success or failure message
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing the book from favorites:", error.message); 
      alert("Failed to remove the book. Please try again!");
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 flex items-center justify-center rounded">
            <img alt={data.title} src={data.url} className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-300 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-400 text-xl">₹ {data.price}</p>
        </div>
      </Link>
      
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4 
                     hover:bg-yellow-500 hover:text-white transition"
          onClick={handleRemoveBook}
        >
          Remove From Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
