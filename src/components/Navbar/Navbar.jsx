import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const role = useSelector((state) => state.auth.role);

  // Define navigation links
  let links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    
  ];

  if (isLoggedin) {
    if (role === "admin") {
      links.push(
        
        { title: "Admin Profile", link: "/profile" },
      
      );
    } else {
      links.push(
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" }
      );
    }
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="relative w-full flex bg-zinc-800 text-white px-8 py-4 items-center justify-between z-50">
        <Link to="/" className="flex items-center space-x-3">
          <img
            className="h-10 bg-white rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/000/626/702/original/education-book-logo-template-vector-illustration.jpg"
            alt="book_logo"
          />
          <h2 className="text-2xl font-semibold">BookHeaven</h2>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className={`transition-all duration-300 px-4 py-2 ${
                item.title.includes("Profile")
                  ? "border border-blue-500 rounded-md text-white hover:text-blue-500 hover:bg-transparent"
                  : "hover:text-blue-500"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Desktop Login & Signup */}
        <div className="hidden md:flex gap-4">
          {!isLoggedin && (
            <>
              <Link
                to="/login"
                className="px-6 py-2 text-lg border border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-blue-500 text-white px-6 py-2 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-zinc-800 flex flex-col items-center justify-center z-40 transition-transform duration-300 ${
          mobileNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            onClick={() => setMobileNav(false)}
            className={`text-white text-3xl mb-4 transition-all duration-300 ${
              item.title.includes("Profile")
                ? "border border-blue-500 px-6 py-2 rounded-md hover:text-blue-500 hover:bg-transparent"
                : "hover:text-blue-500"
            }`}
          >
            {item.title}
          </Link>
        ))}

        {/* Mobile Login & Signup */}
        {!isLoggedin && (
          <>
            <Link
              to="/login"
              className="px-8 py-2 mb-4 text-2xl border border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-8 py-2 text-2xl border border-blue-500 text-white rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav(false)}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
