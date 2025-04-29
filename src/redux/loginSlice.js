import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to handle login request
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Fetch both Patient & Doctor lists
      const patientsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
      );
      const doctorsRes = await axios.get(
        "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor"
      );

      const patients = patientsRes.data;
      const doctors = doctorsRes.data;

      // Find user in patients list
      const user =
        patients.find((u) => u.email === email && u.password === password) ||
        doctors.find((u) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem("user2", JSON.stringify(user?.id));
        return user;
      } else {
        return rejectWithValue("Invalid email or password.");
      }
    } catch (err) {
      return rejectWithValue("Error logging in. Please try again.");
    }
  }
);

// Slice to handle login-related state
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

// Export actions
export const { setEmail, setPassword, clearError,logout } = loginSlice.actions;

// Export reducer to be used in the store
export default loginSlice.reducer;
