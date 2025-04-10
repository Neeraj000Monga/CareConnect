import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getApiUrl = (role) =>
  role === "patient"
    ? "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Patient"
    : "https://67d826719d5e3a10152d9ddf.mockapi.io/CareConnect/Doctor";

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ formData, role }, { rejectWithValue }) => {
    try {
      const apiUrl = getApiUrl(role);

      // Convert formData to a JSON object
      const formDataToSend = { ...formData };
      console.log("formDataToSend", formDataToSend);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      const responseData = await response.json();
      console.log("Response:", responseData); 

      if (!response.ok) {
        throw new Error(responseData?.message || "Signup failed");
      }

      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {}, // No reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;