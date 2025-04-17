import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import signupReducer from "../redux/signupSlice";
import appointmentReducer from "../redux/appointmentSlice";
import bookApointmentReducer from "../redux/bookApointmentSlice";
import loginReducer from "../redux/loginSlice";
import profileReducer from "../redux/profileSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    login: loginReducer,
    appointment: appointmentReducer,
    bookapointment: bookApointmentReducer,
    profile: profileReducer,
  },
});

export default store;