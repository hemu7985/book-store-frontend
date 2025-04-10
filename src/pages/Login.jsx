import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
const Login = () => {


  const [Values , setValues] = useState({
    username: '',
    email: '',
    password: '',

  })
  const navigate = useNavigate();
  const dispath = useDispatch();
const change = (e)=>{
  const {name , value} = e.target;
  setValues({
    ...Values,
    [name]: value
  })
}
const submit = async(e)=>{
  e.preventDefault();
 
  try {
    if(Values.username === ""  || Values.password === "" ){
      alert("Please fill all the fields");
    }
    else{
      const response = await axios.post('https://book-store-backend-3l9h.onrender.com/api/v1/signin', Values);
      dispath(authActions.login());
      dispath(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("token", response.data.token);
      alert("Login Successful");
      navigate('/profile');
    }

  } catch (error) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
    
  }
}


  return (
    <div className=" h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>
        
        <div className="mt-4">
          <div>
            <label htmlFor="email" className="text-zinc-400">
              Username
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600" onClick={submit}>
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">or</p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
