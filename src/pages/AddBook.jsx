import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    
    try {
      if (Object.values(data).some((field) => field === "")) {
        alert("Please fill in all fields");
        return;
      }

      const response = await axios.post(
        "https://book-store-backend-3l9h.onrender.com/api/v1/add-book",
        data,
        { headers }
      );
      console.log(response);

      if (response.status === 200) {
        alert("Book added successfully!");
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add the book. Please try again later.");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        
          <div>
            <label className="text-zinc-400">Image</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 p-2 outline-none"
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
              className="w-full mt-2 bg-zinc-900 p-2 outline-none"
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
              className="w-full mt-2 bg-zinc-900 p-2 outline-none"
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
                className="w-full bg-zinc-900 text-zinc-100 mt-2 p-2 outline-none"
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
                className="w-full bg-zinc-900 text-zinc-100 mt-2 p-2 outline-none"
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
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Description of book"
              name="desc"
              value={data.desc}
              onChange={change}
            />
          </div>
        
        
           <button
           type="submit"
           className="w-full mt-4 px-3 bg-blue-500 hover:bg-blue-600 text-zinc-100 p-2 rounded"
           onClick={() => submit()}
         >
           Add Book
         </button>
         
        
      
      </div>
    </div>
  );
};

export default AddBook;
