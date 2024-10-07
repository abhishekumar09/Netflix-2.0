import axios from "axios";
import { setPopularMovies } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import {  options, Popular_Movie_Url } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const usePopularMovies = async () => {
    const user=useSelector(state=>state.owner.user)
    const dispatch=useDispatch()
    useEffect(()=>{
      const getPopularMovie=async()=>{
        if(user){
          try {
            
            const res = await axios.get(Popular_Movie_Url, options);
            dispatch(setPopularMovies(res.data.results));
            // toast.success('Movie fetched');
          } catch (err) {
            console.log(err);
            toast.error('Error while fetching now playing movies');
          }
        }
      }
      getPopularMovie();
    },[])
    }
export default usePopularMovies;
  