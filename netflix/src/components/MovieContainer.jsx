import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  const { nowPlayingMovies, popularMovies, topRatedMovies, upCommingMovies } =
    useSelector((store) => store.movie);
  console.log(nowPlayingMovies);
  return (
    <div className=" bg-black ">
      <div className="sm:-mt-6 md:-mt-32 lg:-mt-52 relative z-10 mx-2 sm:mx-10 space-y-16">
        <MoviesList  title={"NowPlaying Movie"} movies={nowPlayingMovies}/>
        <MoviesList  title={"Top Rated Movie"} movies={topRatedMovies}/>
        <MoviesList  title={"Upcomming Movie"} movies={upCommingMovies}/>
        <MoviesList  title={"Popular Movie"} movies={popularMovies}/>
      </div>
    </div>
  );
};

export default MovieContainer;
