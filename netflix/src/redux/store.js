import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import movieReducer from './movieSlice.js';
import searchReducer from './searchSlice.js';
import dialogReducer from './dialogPositionSlice.js'
const store=configureStore({
    reducer:{
        owner:userReducer,
        movie:movieReducer,
        search:searchReducer,
        dialog:dialogReducer
    }
})
export default store;