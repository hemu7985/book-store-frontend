import React, { useEffect, useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState(null); // ✅ Default null to avoid issues

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-3l9h.onrender.com/api/v1/get-user-informations",
          { headers }
        );
        setProfile(response.data); // ✅ Now setting the profile
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  text-white py-8 gap-4">
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={profile} />
            { <MobileNav /> }
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
