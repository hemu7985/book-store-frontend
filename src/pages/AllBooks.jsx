import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/Bookcart/BookCard";
import axios from "axios";

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://book-store-backend-3l9h.onrender.com/api/v1/get-all-books");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All Books</h4>

      {Data.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
          {Data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
