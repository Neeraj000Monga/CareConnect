import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import signupReducer from "../redux/signupSlice"; // FIXED IMPORT

const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer, // Ensure it's 'signup' and not something else
  },
});

export default store;
