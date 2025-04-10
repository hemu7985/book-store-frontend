import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Setting = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);

  // Headers को useEffect के अंदर set करेंगे ताकि बार-बार re-render न हो
  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-3l9h.onrender.com/api/v1/get-user-informations",
          { headers }
        );
        if (response.data) {
          setProfileData(response.data);
          setValue({ address: response.data.address || "" });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ताकि यह सिर्फ एक बार चले

  const change = (e) => {
    const { name, value } = e.target;
    console.log("Updating:", name, value); // Debugging के लिए
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.put(
        "https://book-store-backend-3l9h.onrender.com/api/v1/update-address",
        value,
        { headers }
      );
      console.log(response);
      if (response.status === 200) {
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <>
      {!profileData ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label>Username</label>
              <p className="p-2 rounded bg-gray-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div>
              <label>Email</label>
              <p className="p-2 rounded bg-gray-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label>Address</label>
            <textarea
              className="p-2 rounded bg-gray-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
