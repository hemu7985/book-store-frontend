import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch , useSelector} from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = data?.role || localStorage.getItem("role"); // Fetch role safely

  return (
    <div className="bg-zinc-800 p-4 rounded flex-col items-center h-auto lg:h-full flex justify-between lg:hidden">
      {/* User information */}
      {/* <div className="flex items-center justify-center flex-col">
        <img
          className="h-[10vh] w-[10vh] rounded-full object-cover"
          src={data?.avatar || "/default-avatar.png"} // Provide a default avatar
          alt="User Avatar"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">{data?.username || "Guest"}</p>
        <p className="text-sm mt-1 text-zinc-300">{data?.email || "No Email"}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div> */}

      {/* Navigation links (For users) */}
              {role === "user" && (
                <div className="w-full flex-col items-center justify-center hidden lg:flex">
                  <Link
                    to="/profile"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
                  >
                    Favorites
                  </Link>
                  <Link
                    to="/profile/orderHistory"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
                  >
                    Order History
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
                  >
                    Settings
                  </Link>
                </div>
              )}
      
              {/* Navigation links (For Admin) */}
              {role === "admin" && (
               <div className="w-full flex flex-col items-center justify-between lg:flex-row ">

                  <Link
                    to="/profile/orders"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
                  >
                    All Orders 
                  </Link>
                  <Link
                    to="/profile/add-book"
                    className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
                  >
                    Add Books
                  </Link>
                </div>
              )}
      
      {/* Logout button
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 gap-2 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/");
        }}
      >
        Logout
        <FiLogOut />
      </button> */}
    </div>
  );
};

export default Sidebar;
