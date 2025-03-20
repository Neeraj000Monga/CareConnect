import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  name: "",
  email: "",
  gender: "",
  age: "",
  role: "patient", // Default role
  password: "",
  confirmPassword: "",
  selectedImage: "",
  // Patient-specific fields
  weight: "",
  height: "",
  allergies: "",
  bloodGroup: "",
  // Doctor-specific fields
  degree: "",
  specialization: "",
  hospitalName: "",
  experience: "",
  licenseNo: "",
  consultationFees: "",
};

export const createUser = createAsyncThunk("auth/createUser", async ({ role, userData }) => {
  const apiUrl = role === "patient" 
    ? "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
    : "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor";
  
  const response = await axios.post(apiUrl, userData);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = authSlice.reducer;
export default authSlice.reducer;