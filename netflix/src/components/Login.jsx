import React, {  useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setIsLoading, setUser } from "../redux/userSlice";

const Login = () => {
  
 
  const isLoading = useSelector((state) => state.owner.isLoading);
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    if (isLogin) {
      try {
        const response = await axios.post(
          `${API_END_POINT}/login`,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.success) {
          toast.success(response.data.message);
          dispatch(setUser(response.data.user));
          dispatch(setAuthenticated(true))
          navigate("/browse", { replace: true });
        }
       
      } catch (err) {
        console.log(err);
        dispatch(setIsLoading(false));
        const msg=err.response?.data?.message||"something went error !"
        toast.error(msg);
      }
    } else {
      try {
        const response = await axios.post(`${API_END_POINT}/register`, {
          fullName,
          email,
          password,
        });
        if (response.status === 201 && response.data.success) {
          toast.success(response.data.message);
        }
        setIsLogin(true);
      } catch (err) {
        console.log(err);
        dispatch(setIsLoading(false));
        if (err.response?.data?.message) toast.error(err.response.data.message);
        else toast.error("something went error !");
      }
    }
    dispatch(setIsLoading(false));
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="banner"
        />
      </div>
      <form
        onSubmit={getInputData}
        className="flex flex-col w-full p-6 m-4 md:w-max  md:p-12  items-center justify-center  rounded-md bg-black opacity-90 relative z-[100]"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <div className="flex flex-col w-full">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Fullname"
              className=" w-full outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
          >{`${
            isLoading ? "Loading..." : isLogin ? "Login" : "Signup"
          }`}</button>
          <p className="text-white mt-2">
            {isLogin ? "New to Netflix?" : "Already have an account?"}
            <span
              onClick={loginHandler}
              className="ml-1 text-blue-900 font-medium cursor-pointer"
            >
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
