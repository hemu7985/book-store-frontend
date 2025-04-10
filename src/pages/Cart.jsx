import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import emptyCartImage from "../assets/empty.png";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          'https://book-store-backend-3l9h.onrender.com/api/v1/get-user-cart',
          { headers } // Fixed syntax here
        );
        setCart(res.data.data);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetch();
  }, [Cart]);
  const deleteItem = async (bookid) => {
  
      const response = await axios.put(
        `https://book-store-backend-3l9h.onrender.com/api/v1/remove-from-cart/${bookid}`, // ✅ Corrected string interpolation
        {}, 
        { headers }
      );
      
      alert(response.data.message); 
     
    
      // ✅ Update state to remove the deleted item
      setCart((prevCart) => prevCart.filter(item => item._id !== bookid));
  
 
  };
  
  useEffect(() => {
    
    if(Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;}
  }, [Cart]);

  const PlaceOrder = async () =>{
    try {
      const response = await axios.post(
        'https://book-store-backend-3l9h.onrender.com/api/v1/place-order',
        {order : Cart},
        { headers } // Fixed syntax here
      );
      alert(response.data.message);
      navigate("/profile/orderHistory")
     
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  }

  

  return (
    <div className='bg-zinc-900 px-12 h-screen py-8'>
  {!Cart && (
  <div className="w-full h-screen flex items-center justify-center">
    <Loader /> { " "}
  </div>
)}

      {Cart && Cart.length === 0 && (
  <div className='h-screen flex items-center justify-center px-4'>
    <div className='flex flex-col h-[100%] items-center justify-center'>
      <h1 className='text-5xl   lg:text-6xl font-semibold text-zinc-400'>
        Empty Cart
      </h1>
      <img
        src={emptyCartImage}
        alt="Empty Cart"
        className='w-3/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-6'
      />
    </div>
  </div>
)}

      {Cart && Cart.length > 0 && (
        <>
         <h1 className='text-3xl md:text-xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>

          {Cart.map((items, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800  justify-between items-center'
              key={i}
            >
              <img
                src={items.url}
                alt='/'
                className='md:[10vh] lg:h-[10vh] object-cover'
              />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {items.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {items.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {items.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ₹ {items.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>

          <div className='p-4 bg-zinc-800 rounded'>
            <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
              <h2>{Cart.length} books</h2> <h2> ₹{Total}</h2>
            </div>
<div className='w-[100%] mt-3'>
  <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-400' onClick={PlaceOrder}>
    Place your order
  </button>
</div>

          </div>



        </div>
      )}
    </div>
  );
};

export default Cart;