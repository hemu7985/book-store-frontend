import React from 'react';
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Background overlay */}
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 fixed z-40`}></div>

      {/* Main modal */}
      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center fixed z-50`}>
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] relative text-zinc-800">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button
              onClick={() => setuserDiv("hidden")}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-500 transition-all duration-300"
            >
              <RxCross1 />
            </button>
          </div>

          {/* User Information */}
          <div className="mt-2">
            <label>
              Username:{" "}
              <span className="font-semibold">{userDivData.username || "N/A"}</span>
            </label>
          </div>
          <div className="mt-4">
            <label>
              Email:{" "}
              <span className="font-semibold">{userDivData.email || "N/A"}</span>
            </label>
          </div>
          <div className="mt-2">
            <label>
              Address:{" "}
              <span className="font-semibold">{userDivData.address || "N/A"}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
