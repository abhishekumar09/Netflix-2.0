
import Header from "./Header";
import { useSelector } from "react-redux";

import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpCommingMovies from "../hooks/useUpCommingMovies";
import SearchMovieContainer from "./SearchMovieContainer";
import Footer from "./Footer";

const Browse = () => {
  const isToggle = useSelector((state) => state.owner.isToggle);
 
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpCommingMovies();

  

  return (
    <div>
      <Header />
      <div>
        {isToggle ? (
          <SearchMovieContainer />
        ) : (
          <>
            <MainContainer />
            <MovieContainer />
            <Footer/>
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
