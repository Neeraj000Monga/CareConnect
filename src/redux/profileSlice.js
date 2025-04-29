// src/redux/slices/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch profile data
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async () => {
    const userRole = localStorage.getItem("userRole");
    const storedUser = JSON.parse(localStorage.getItem("user2"));
    const url =
      userRole === "patient"
        ? `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient/${storedUser}`
        : `https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor/${storedUser}`;

    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
