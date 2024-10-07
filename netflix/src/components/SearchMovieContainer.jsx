import axios from "axios";
import React, { useState } from "react";
import {  options,  Search_Movie_Url } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setMovieDetails } from "../redux/searchSlice";
import MoviesList from "./MoviesList";

import { FaGripHorizontal } from "react-icons/fa";
import MovieMenu from "./MovieMenu";


const SearchMovieContainer = () => {
  const dispatch = useDispatch();
  
  const [searchMovie, setSearchMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const movies=useSelector(store=>store.movie)
  const { movieName, searchedMovie } = useSelector((store) => store.search);
  const [sm,setSm]=useState(false)
  useState(()=>{
    dispatch(setMovieDetails({searchMovie:"Now Playing Movies",movies:movies.nowPlayingMovies}))
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      dispatch(setMovieDetails({movies:[],searchMovie:null}))
      const res = await axios.get(`${Search_Movie_Url}${searchMovie}`, options);
      if (res.status === 200 && res.data.results) {
        const movies = res.data.results;
        dispatch(setMovieDetails({ movies, searchMovie }));
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    setSearchMovie("");
  };

  
  return (
    <div className="w-screen h-screen bg-slate-200 relative z-40 mt-28">
      <div className="pt-10 pl-8   relative z-50" >
      <FaGripHorizontal  className="md:hidden text-3xl hover:cursor-pointer" 
      onClick={()=>{
        console.log("hello")
        setSm(true)}} />
      </div>
      <div className="w-[100%]  p-5 flex flex-col  gap-4 items-center justify-end  relative z-50">
        <div className="">
          
          {/* <ul className=" hidden md:flex flex-wrap gap-2  px-6 py-4 rounded-md bg-slate-100 backdrop-blur-md backdrop-brightness-90">
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => {handleMenu("All Movies",[...movies.upCommingMovies,...movies.topRatedMovies,...movies.popularMovies,...movies.nowPlayingMovies])}}
            >
              All Movies
            </li>
            <span className="text-2xl">|</span>
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Top Rated Movies",movies.topRatedMovies)}
            >
              Top Rated Movie
            </li>
            <span className="text-2xl">|</span>
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Upcomming Movies",movies.upCommingMovies)}
            >
              Upcomming Movie
            </li>
            <span className="text-2xl">|</span>
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Upcomming Movies",movies.upCommingMovies)}
            >
              Trending Movie
            </li>
            <span className="text-2xl">|</span>
            <li
              className="hover:underline hover:cursor-pointer font-bold text-2xl"
              onClick={() => handleMenu("Popular Movies",movies.popularMovies)}
            >
              Popular Movie
            </li>
            <span className="text-2xl">|</span>
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
          </ul> */}
          <MovieMenu sm={sm}/>

        </div>
        <form action="" onSubmit={handleSubmit} className="w-[100%] sm:w-[50%]">
          <div className="w-full flex items-center  rounded-md border-2 p-1 sm:p-2 border-gray-50 shadow-md justify-between">
            <input
              type="text"
              value={searchMovie}
              onChange={(e) => {
                setSearchMovie(e.target.value);
              }}
              placeholder="search movie"
              className="w-full text-lg border-none outline-none bg-transparent "
            />
            <button className="bg-red-600 text-white h-full rounded-md py-1 px-4 sm:py-2">
              {isLoading ? "Searching" : "Search"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-5 px-10 w-[100vw] relative z-30 ">
        {searchedMovie?.length > 0 ? (
          <MoviesList title={movieName} movies={searchedMovie} search={true} />
        ) : (
          <div>
            <h1 className="text-3xl font-bold">{movieName}</h1>
            {movieName && <h1 className="mt-8 text-lg">Movies Not Found !</h1>}
          </div>
        )}
      </div>
      <div>
       
      </div>
      <div className="w-[100%] h-[100%] absolute bg-gradient-to-tr to-pink-200 from-blue-300 blur-[150px] top-0 left-0 opacity-50 z-10"></div>
    </div>
  );
};

export default SearchMovieContainer;
