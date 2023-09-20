import React, { useState } from "react";
// import image from '../assets/unnamed.jpg';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authenticate, isAuth } from "../helpers/auth";
import { Link, Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    mobile: "",
  });

  const { name, email, password, password2, mobile } = formData;
  const handleChange = (text) => (e) => {
    console.log(name, email, password, password2, mobile);
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      if (password === password2) {
        setFormData({ ...formData, textChange: "Submitting" });
        axios
          .post("http://localhost:5000/users/register", {
            name,
            email,
            password: password,
            password2: password2,
            mobile,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password: "",
              password2: "",
              mobile: "",
            });
            console.log("After Success from Backend");
            history.push("/verify");
            // return <Redirect to='/verify' />
            console.log(res.msg);
            toast.success(res.data.message);
          })
          .catch((err) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password: "",
              password2: "",
              mobile: "",
            });
            console.log(err.response);
            // toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        {/* {isAuth() ? <Redirect to='/' /> : null} */}
        <ToastContainer />
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">
                Sign Up for Edumania
              </h1>

              <form
                className="w-full flex-1 mt-8 text-indigo-500"
                onSubmit={handleSubmit}
              >
                <div className="mx-auto max-w-xs relative ">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={name}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password")}
                    value={password}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange("password2")}
                    value={password2}
                  />

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="tel"
                    placeholder="mobile"
                    onChange={handleChange("mobile")}
                    value={mobile}
                  />
                  <button
                    type="submit"
                    // onClick = {onClick}
                    // {<Redirect to='/verify' />}
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <i className="fas fa-user-plus fa 1x w-6  -ml-2" />
                  </button>
                </div>
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign with email or social login
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                    href="/login"
                    target="_self"
                  >
                    <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" />
                    <span className="ml-4">Sign In</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1 bg-black-100 text-center hidden lg:flex">
            {/* <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-cover '
            style={{ backgroundImage: `url(${image})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat' }}
          ></div> */}
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default Register;
