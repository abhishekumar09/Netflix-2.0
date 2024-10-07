import React, { useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import {options, Search_Movie_Collection } from "../utils/constant";
import axios from 'axios';
import { setMovieDetails } from '../redux/searchSlice';
import { useDispatch, useSelector } from 'react-redux';

const MovieMenu = ({sm}) => {
    const [genre, setGenre] = useState(false);
    const movies=useSelector(store=>store.movie)
    const dispatch=useDispatch()
    const toggleGenre = (genreStatus) => {
        setGenre(genreStatus);
      };
      const handleGenre=async(query)=>{
        dispatch(setMovieDetails({searchMovie:null,movies:null}))
        try{
          const res=await axios.get(`${Search_Movie_Collection}${query}`,options)
          if(res.status===200&&res.data.results){
            console.log(res.data)
            dispatch(setMovieDetails({searchMovie:query,movies:res.data.results}))
    
          }
        }catch(err){
          console.log(err)
        }finally{
          setGenre(false)
        }
      }
      const handleMenu=(searchMovie,movies)=>{
        dispatch(setMovieDetails({searchMovie:null,movies:null}))
        
        dispatch(setMovieDetails({searchMovie,movies}))
      }
      
  return (
    <>
         <ul className={` md:flex ${sm===true?"flex-col space-y-2 text-white bg-black":"hidden bg-slate-100"} flex-wrap gap-2  px-6 py-4 rounded-md  backdrop-blur-md backdrop-brightness-90`}>
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => {handleMenu("All Movies",[...movies.upCommingMovies,...movies.topRatedMovies,...movies.popularMovies,...movies.nowPlayingMovies])}}
            >
              All Movies
            </li>
            {!sm&&<span className="text-2xl">|</span>}
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Top Rated Movies",movies.topRatedMovies)}
            >
              Top Rated Movie
            </li>
            {!sm&&<span className="text-2xl">|</span>}
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Upcomming Movies",movies.upCommingMovies)}
            >
              Upcomming Movie
            </li>
            {!sm&&<span className="text-2xl">|</span>}
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Upcomming Movies",movies.upCommingMovies)}
            >
              Trending Movie
            </li>
            {!sm&&<span className="text-2xl">|</span>}
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Popular Movies",movies.popularMovies)}
            >
              Popular Movie
            </li>
            {!sm&&<span className="text-2xl">|</span>}
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl flex items-center relative"
              onMouseOver={() => toggleGenre(true)}
              onMouseLeave={() => toggleGenre(false)}
            >
              <span>Genre</span>
              <IoIosArrowDropdownCircle />
              {genre && (
                <ul
                  className="absolute z-50 top-8 left-0 p-4 rounded-lg  bg-black/80  backdrop-blur-sm text-white"
                  onMouseOver={() => toggleGenre(true)}
                >
                  <li
                    className="hover:underline hover:cursor-pointer  text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("action")}}
                  >
                    Action
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("crime")}}
                  >
                    Crime
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("documentary")}}
                  >
                    Documentary
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("drama")}}
                  >
                    Drama
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("family")}}
                  >
                    Family
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("fantasy")}}
                  >
                    Fantasy
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("history")}}
                  >
                    History
                  </li>
                  <li
                    className="hover:underline hover:cursor-pointer font-bold text-2xl hover:text-3xl"
                    onClick={() => {handleGenre("horror")}}
                  >
                    Horror
                  </li>
                </ul>
              )}
            </li>
          </ul>
    </>
  )
}

export default MovieMenu