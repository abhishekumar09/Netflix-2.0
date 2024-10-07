import { createSlice } from "@reduxjs/toolkit";
const movieSlice=createSlice({
    name:"movie",
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies:null,
        upCommingMovies:null,
        currSelectedMovie:{title:"Nature is Beautiful",overview:" Dolby Vision Demo 4K HDR, 8K & 12K video ULTRA HD 240 FPS NATURE FILM,  60FPS, 120FPS high fps Resolution with Dolby Atmos music",key:"coUY1kd8xFk"},
        open:false
    },
    reducers:{
        setNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload
        },
        setPopularMovies:(state,action)=>{
            state.popularMovies=action.payload
        },
        setUpCommingMovies:(state,action)=>{
            state.upCommingMovies=action.payload
        },
        setTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload
        },
        setCurrentSelectedMovie:(state,action)=>{
            state.currSelectedMovie=action.payload
        },
        setOpen:(state,action)=>{
            state.open=action.payload
        },
        
    }
});
export const {setNowPlayingMovies,setPopularMovies,setUpCommingMovies,setTopRatedMovies,setCurrentSelectedMovie,setOpen}=movieSlice.actions;
export default movieSlice.reducer