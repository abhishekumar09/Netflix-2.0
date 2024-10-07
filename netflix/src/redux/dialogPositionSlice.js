import { createSlice } from "@reduxjs/toolkit";
const dialogSlice=createSlice({
    name:"dialogPosition",
    initialState:{
       x:0,
       y:0
    },
    reducers:{
        //action
        setDialogPosition:(state,action)=>{
            state.x=action.payload.x
            state.y=action.payload.y
        },
    }
})
export const {setDialogPosition}=dialogSlice.actions;
export default dialogSlice.reducer