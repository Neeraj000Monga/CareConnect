import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../redux/createSlice"; // Example reducer

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your reducers here
  },
});

export default store;
