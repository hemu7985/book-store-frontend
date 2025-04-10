import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });



  const { id } = useParams(); // Destructuring useParams() to get the id
const navigate = useNavigate();
const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid: id,
};
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Object.values(data).some((field) => field === "" || data.price <= 0)) {
        alert("Please fill in all fields correctly. Ensure price is positive.");
        return;
      }

      const response = await axios.put(
        "https://book-store-backend-3l9h.onrender.com/api/v1/update-book",
        data,
        { headers }
      );
      console.log(response);

      if (response.status === 200) {
       // alert("Book updated successfully!");
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
       alert(response.data.message);
       navigate(`/view-book-details/${id}`)
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add the book. Please try again later.");
    
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://book-store-backend-3l9h.onrender.com/api/v1/get-book-by-id/${id}`
        );
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, [id]); // Including `id` as a dependency in useEffect

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label className="text-zinc-400">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 p-2 text-zinc-400 outline-none"
            placeholder="URL of image"
            name="url"
            value={data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Title</label>
          <input
            type="text"
            className="w-full mt-2 text-zinc-400 bg-zinc-900 p-2 outline-none"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Author</label>
          <input
            type="text"
            className="w-full mt-2 text-zinc-400 bg-zinc-900 p-2 outline-none"
            placeholder="Author"
            name="author"
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full bg-zinc-900 text-zinc-400 mt-2 p-2 outline-none"
              placeholder="Language of book"
              name="language"
              value={data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              className="w-full bg-zinc-900 text-zinc-400 mt-2 p-2 outline-none"
              placeholder="Price of book"
              name="price"
              value={data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-zinc-400">Description</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-400 p-2 outline-none"
            placeholder="Description of book"
            name="desc"
            value={data.desc}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-3 bg-green-500 hover:bg-green-600 text-zinc-100 p-2 rounded"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;