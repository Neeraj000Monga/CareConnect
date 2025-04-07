import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor";

// Async thunk to fetch doctors
export const fetchDoctors = createAsyncThunk(
  "appointment/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    doctors: [],
    selectedDoctorId: null, // track of selected doctor
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDoctorId: (state, action) => {
      state.selectedDoctorId = action.payload; // Update selected doctor ID
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedDoctorId } = appointmentSlice.actions; //  Export action
export default appointmentSlice.reducer;

