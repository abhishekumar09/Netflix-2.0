import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"search",
    initialState:{
        movieName:null,
        searchedMovie:null,
    },
    reducers:{
        setMovieDetails:(state,action)=>{
            const {movies,searchMovie}=action.payload;
            state.movieName=searchMovie;
            state.searchedMovie=movies
        }
    }
})
export const {setMovieName,setSearchedMovie,setMovieDetails}=searchSlice.actions
export default searchSlice.reducer