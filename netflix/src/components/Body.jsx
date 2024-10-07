import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import { setAuthenticated, setUser } from "../redux/userSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((store) => store.owner.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated === true ? children : <Navigate to="/" />;
};
const AuthRoute = ({ children }) => {
  const isAuthenticated = useSelector((store) => store.owner.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated === true ? <Navigate to="/browse" /> : children;
};

const Body = () => {
  
  console.log("body trying to fetch user")
  const dispatch = useDispatch();
  const user = useSelector((store) => store.owner.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        console.log("getting cookies")
        const res = await axios.get(`${API_END_POINT}/auth`, {
          withCredentials: true,
        });
        console.log(res)
        if (res.status === 200 && res.data) {
          dispatch(setUser(res.data));
          console.log("user=",user)
          dispatch(setAuthenticated(true));
          setIsLoading(false);
        } 
      } catch (err) {
        console.log(err);
        dispatch(setUser(null));
        dispatch(setAuthenticated(false));
        toast.error(err.response?.data?.message);
      } finally {
         console.log("loading false")
        setIsLoading(false);
      }
    };
    if (!user) {
      getUserInfo();
    } else {
      setIsLoading(false);
    }
  }, [user,dispatch,isLoading]);

   


   const appRouter = createBrowserRouter([
      {
        path: "/",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "/browse",
        element: (
          <PrivateRoute>
            <Browse />
          </PrivateRoute>
        ),
      },
    ]);
    if(isLoading===true) return <h1>Loading...</h1>

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
