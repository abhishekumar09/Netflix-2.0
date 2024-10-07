import axios from "axios";
import {  setTopRatedMovies } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import {  options, Top_Rated_Movie_Url } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useTopRatedMovies = async () => {
    const user=useSelector(state=>state.owner.user)
    const dispatch=useDispatch()
    useEffect(()=>{
      const getTopRatedMovie=async()=>{
        if(user){
          try {
            
            const res = await axios.get(Top_Rated_Movie_Url, options);
            dispatch(setTopRatedMovies(res.data.results));
            // toast.success('Movie fetched');
          } catch (err) {
            console.log(err);
            toast.error('Error while fetching now playing movies');
          }
        }
      }
      getTopRatedMovie();
    },[])
    }
export default useTopRatedMovies;
  