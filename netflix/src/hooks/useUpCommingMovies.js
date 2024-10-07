import axios from "axios";
import {  setUpCommingMovies } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import {  options, Up_Comming_Movie_Url } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useUpCommingMovies = async () => {
    const user=useSelector(state=>state.owner.user)
    const dispatch=useDispatch()
    useEffect(()=>{
      const getUpComingMovie=async()=>{
        if(user){
          try {
            
            const res = await axios.get(Up_Comming_Movie_Url, options);
            dispatch(setUpCommingMovies(res.data.results));
            // toast.success('Movie fetched');
          } catch (err) {
            console.log(err);
            toast.error('Error while fetching now playing movies');
          }
        }
      }
      getUpComingMovie()
    },[])
    }
export default useUpCommingMovies;
  