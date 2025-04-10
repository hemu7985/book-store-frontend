import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines, FaTimes } from "react-icons/fa";

const Wow = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <nav className="w-full z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            className="h-10 bg-white rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/000/626/702/original/education-book-logo-template-vector-illustration.jpg"
            alt="book_logo"
          />
          <h2 className="text-2xl font-semibold">BookHeaven</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="hover:text-blue-500 transition duration-300"
            >
              {item.title}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-4 py-1 rounded border border-blue-500 hover:bg-white hover:text-zinc-800 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1 bg-blue-500 rounded text-zinc-800 hover:bg-white hover:text-zinc-800 transition duration-300"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          {isMobileNavOpen ? <FaTimes /> : <FaGripLines />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-zinc-900 flex flex-col items-center justify-center transition-transform duration-300 ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="text-white text-3xl mb-6 hover:text-blue-500 transition duration-300"
            onClick={() => setIsMobileNavOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        <Link
          to="/login"
          className="px-8 py-2 mb-4 text-2xl font-semibold border border-blue-500 text-white hover:bg-white hover:text-zinc-800 transition duration-300"
          onClick={() => setIsMobileNavOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-8 py-2 text-2xl font-semibold bg-blue-500 rounded text-zinc-800 hover:bg-white hover:text-zinc-800 transition duration-300"
          onClick={() => setIsMobileNavOpen(false)}
        >
          Signup
        </Link>
      </div>
    </>
  );
};

export default Wow;
