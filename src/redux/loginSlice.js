import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to handle login request
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const patientsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
      );
      const doctorsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor"
      );

      const patients = patientsRes.data;
      const doctors = doctorsRes.data;

      const patient = patients.find((u) => u.email === email && u.password === password);
      const doctor = doctors.find((u) => u.email === email && u.password === password);

      const user = patient || doctor;

      if (user) {
        localStorage.setItem("user2", JSON.stringify(user.id));
        localStorage.setItem("userRole", patient ? "patient" : "doctor");
        return user;
      } else {
        return rejectWithValue("Invalid email or password.");
      }
    } catch (err) {
      return rejectWithValue("Error logging in. Please try again.");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    error: "",
    user: null,
    loading: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.error = "";
      state.user = null;
      state.loading = false;
      localStorage.removeItem("user2");
      localStorage.removeItem("userRole");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail, setPassword, clearError, logout } = loginSlice.actions;

export default loginSlice.reducer;