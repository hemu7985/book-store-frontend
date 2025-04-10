import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favorites from "./components/profile/Favorites";
import UserOrderHistory from "./components/profile/UserOrderHistory";
import Setting from "./components/profile/Setting";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("role") &&
      localStorage.getItem("token")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />

        {/* Profile Route */}
        <Route path="/profile" element={<Profile />}>
          {/* Conditional rendering for user */}
          {role === "user" && (
            <>
              <Route index element={<Favorites />} />
              <Route path="orderHistory" element={<UserOrderHistory />} />
              <Route path="settings" element={<Setting />} />
            </>
          )}

          {/* Conditional rendering for admin */}
          {role === "admin" && (
            <>
              <Route path="orders" element={<AllOrders />} />
              <Route path="add-book" element={<AddBook />} />
            </>
          )}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;