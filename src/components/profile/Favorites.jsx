import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Bookcart/BookCard";

const Favorites = () => {
  const [favoritesBooks, setFavoritesBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("https://book-store-backend-3l9h.onrender.com/api/v1/get-favorites-books", {
          headers,
        });
        setFavoritesBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
        setFavoritesBooks([]); // Fallback to empty array in case of error
      }
    };

    fetchFavorites();
  }, []); // Run only once when component mounts

  return (
    <div className="w-full p-4">
      {favoritesBooks.length === 0 ? (
        <h2 className="text-4xl font-semibold text-zinc-500 flex items-center justify-center h-[50vh]">
          No Favorites Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoritesBooks.map((item, i) => (
            <BookCard key={i} data={item} favourite={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
