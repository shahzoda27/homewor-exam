import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "../featurs/users/UsersSlice";
const store = configureStore({
    reducer:{
        users:UsersReducer
    }
})
export default store