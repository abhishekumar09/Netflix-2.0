import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { setAuthenticated, setToggle, setUser } from "../redux/userSlice";

const Header = () => {
  const user = useSelector((store) => store.owner.user);
  
  const isToggle=useSelector(store=>store.owner.isToggle)
  const dispatch=useDispatch();
  const [isLogoutLoading,setLogOutLoading]=useState(false)
  const navigate=useNavigate()
  const logOutHandler=async(e)=>{
    e.preventDefault();
    setLogOutLoading(true)
    try{
      const res=await axios.get(`${API_END_POINT}/logout`,{withCredentials:true})
      if(res.status===200&&res.data.success){
        toast.success(res.data.message)
        dispatch(setUser(null))
        dispatch(setAuthenticated(false))
        navigate('/',{replace:true});
      }
    }catch(err){
      console.log(err)
      toast.error(err.res.data.message)
    }finally{
      setLogOutLoading(false)
    }
  }


  const handleToggle=(e)=>{
    e.preventDefault()
    dispatch(setToggle());
  }


  return (
    <div className="w-[100vw] bg-gradient-to-b from-black flex items-center justify-between px-2 sm:px-6 py-4 z-50 absolute top-0 left-0 text-white">
      <img
        className="w-24 sm:w-56"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="netflix-log"
      />
     {
      user&&(
        <div className="flex items-center">
        <IoIosArrowDropdown size="24px" className="text-white ml-4 hidden sm:block" />
        <h1 className="text-lg font-medium mr-2 hidden sm:block">{user.fullName}</h1>

        <div className="flex gap-2 items-center">
          {isToggle?<IoHomeOutline size="24px" className="sm:hidden   box-content hover:text-blue-700 hover:text-3xl cursor-pointer" onClick={handleToggle}/>
          :<IoSearch size="24px" className="sm:hidden   box-content hover:text-blue-700 hover:text-3xl cursor-pointer " onClick={handleToggle} />}
          <button className="bg-red-800 py-2 text-white px-4 rounded-sm ml-2 hidden sm:block " onClick={handleToggle}>
            {isToggle?"Home":"search movie"}
          </button>
          <button className="bg-red-800 py-1 sm:py-2  text-white px-4 rounded-sm" onClick={logOutHandler}>
            {isLogoutLoading?"....":"Logout"}
          </button>
        </div>
      </div>
      )
     }
    </div>
  );
};

export default Header;
