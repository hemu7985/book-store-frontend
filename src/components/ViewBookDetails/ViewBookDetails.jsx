import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { MdLanguage } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const role = useSelector((state) => state.auth.role);
  
  console.log("User Role:", role);
  console.log("Is Logged In:", isLoggedin);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://book-store-backend-3l9h.onrender.com/api/v1/get-book-by-id/${id}`);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      console.log("ViewBookDetails Headers:", headers);
      const response = await axios.put(
        "https://book-store-backend-3l9h.onrender.com/api/v1/add-book-to-favorites",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "Book is already in favorites!");
      } else {
        alert("Something went wrong! Please try again.");
      }
      console.error("Error adding book to favorites:", error);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "https://book-store-backend-3l9h.onrender.com/api/v1/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "Item already in the cart!");
      } else {
        alert("Something went wrong! Please try again.");
      }
      console.error("Error adding item to cart:", error);
    }
  };

  const deletebtn = async () => {
    try {
      console.log("Delete button clicked!");
      const response = await axios.delete(
        `https://book-store-backend-3l9h.onrender.com/api/v1/delete-book`,
        { headers }
      );
      console.log(response.data.message);
      alert("Book deleted successfully!");
      navigate('/all-books');
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book. Please try again later.");
    }
  };

  return (
    <>
      {data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row items-start gap-8'>
          <div className='w-full lg:w-3/6'>
            <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12'>
              <img src={data.url}
                alt={data.title} 
                className='h-[50vh] md:h-[60vh] rounded lg:h-[70vh]' />
              
              {isLoggedin && role === 'user' && (
                <div className="flex flex-wrap lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 gap-4">
                  {/* Favourites Button */}
                  <button
                    className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center hover:scale-110 transition-transform"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ml-4 block lg:hidden text-sm">Favourites</span>
                  </button>
                  
                  {/* Add to Cart Button */}
                  <button
                    className="bg-blue-500 rounded-full text-3xl p-3 text-white flex items-center justify-center hover:scale-110 transition-transform"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ml-4 block lg:hidden text-sm">Add to Cart</span>
                  </button>
                </div>
              )}

              {isLoggedin && role === 'admin' && (
                <div className="flex flex-wrap lg:flex-col items-center justify-center lg:justify-start gap-4 mt-4 lg:mt-0">
                  {/* Edit Button */}
                  <Link to = {`/updateBook/${id}`}
                    className="bg-white rounded-full text-3xl p-3 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <FaRegEdit />  {/* ✅ Correct icon for Edit */}
                    <span className="ml-4 block lg:hidden text-sm">Edit</span>
                  </Link>

                  {/* Delete Book Button */}
                  <button
                    onClick={deletebtn}
                    className="bg-white rounded-full text-3xl p-3 text-red-500 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <MdOutlineDelete />  {/* ✅ Correct icon for Delete */}
                    <span className="ml-4 block lg:hidden text-sm">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='p-4 w-full lg:w-3/6'>
            {data ? (
              <>
                <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
                <p className='text-md text-zinc-400 mt-1'>by {data.author}</p>
                <p className='text-lg text-red-300 mt-1'>Price: ₹{data.price}</p>
                <p className='text-xl text-zinc-500 mt-4'>{data.desc}</p>
                <p className='flex mt-4 justify-start items-center text-zinc-400'>
                  <MdLanguage className='me-3 mr-1' />
                  {data.language}
                </p>
              </>
            ) : (
              <p className='h-screen bg-zinc-900 flex items-center justify-center'><Loader/></p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
