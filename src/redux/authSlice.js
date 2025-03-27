import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Fetch patients and doctors data
      const patientsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
      );
      const doctorsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor"
      );

      const patients = patientsRes.data;
      const doctors = doctorsRes.data;

      console.log("Doctors List:", doctors); // Debugging

      // Find user in either list
      let user =
        patients.find((u) => u.email === email && u.password === password) ||
        doctors.find((u) => u.email === email && u.password === password);

      if (user) {
        // Save role in localStorage
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("user", JSON.stringify(user));

        return user; // Return user data for Redux store
      } else {
        return rejectWithValue("Invalid email or password.");
      }
    } catch (error) {
      return rejectWithValue("Error logging in. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
