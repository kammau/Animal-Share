import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import viewReducer from "./components/reducers/viewSlice";

export default configureStore({
    reducer: {
        view: viewReducer,
    }
})

