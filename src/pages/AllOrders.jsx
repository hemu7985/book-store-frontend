import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });

  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-3l9h.onrender.com/api/v1/get-all-books",
          { headers }
        );
        setAllOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []); // ✅ No dependency on AllOrders here

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitchange = async (i) => {
    const id = AllOrders[i]._id;
    try {
      const response = await axios.put(
        `https://book-store-backend-3l9h.onrender.com/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      alert(response.data.status);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredOrders = AllOrders.slice(0, -1); // ✅ non-mutating

  return (
    <>
      {!AllOrders.length ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%] text-center">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block text-center">Description</div>
            <div className="w-[17%] md:w-[9%] text-center">Price</div>
            <div className="w-[30%] md:w-[16%] text-center">status</div>
            <div className="w-[10%] md:w-[5%] text-center">
              <FaUserLarge />
            </div>
          </div>

          {filteredOrders.map((items, i) => (
            <div
              key={items?._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300 mt-4"
            >
              <div className="w-[3%] text-center">{i + 1}</div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items?.book?._id || "#"}`}
                  className="hover:text-blue-300"
                >
                  {items?.title || "Unknown"}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                {items?.desc ? items.desc.slice(0, 50) + "..." : "No description"}
              </div>
              <div className="w-[17%] md:w-[9%]">
                {items?.price || "N/A"} <span className="text-sm">Rs</span>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <button
                  className="hover:scale-105 transition-all duration-300 font-semibold"
                  onClick={() => setOptions(i)}
                >
                  {items.status === "Order placed" ? (
                    <div className="text-yellow-500">{items?.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items?.status}</div>
                  ) : (
                    <div className="text-green-500">{items?.status}</div>
                  )}
                </button>

                {Options === i && (
                  <div className="flex mt-1 items-center">
                    <select
                      name="status"
                      value={Values.status}
                      onChange={change}
                      className="bg-gray-800 px-2 py-1 rounded text-white"
                    >
                      {["Order placed", "Out of Delivery", "Delivered", "Canceled"].map(
                        (status, idx) => (
                          <option key={idx} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        submitchange(i);
                        setOptions(-1);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-[10%] md:w-[5%] text-center">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          setUserDiv={setUserDiv}
          userDivData={userDivData}
        />
      )}
    </>
  );
};

export default AllOrders;
