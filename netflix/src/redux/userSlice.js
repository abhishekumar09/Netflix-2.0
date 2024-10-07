import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoading:false,
        isToggle:false,
        isAuthenticated:false
    },
    reducers:{
        //action
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setIsLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setToggle:(state)=>{
            state.isToggle=!state.isToggle;
        },
        setAuthenticated:(state,action)=>{
            state.isAuthenticated=action.payload
        }
    }
})
export const {setUser,setIsLoading,setToggle,setAuthenticated}=userSlice.actions;
export default userSlice.reducer