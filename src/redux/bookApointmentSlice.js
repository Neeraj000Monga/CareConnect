import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDay: null,
  activeSlots: [],
  setCurrentDate: new Date().getDate(),
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  showAlert: false,
};

const bookApointmentSlice = createSlice({
  name: "bookapointment",
  initialState,
  reducers: {
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
    toggleActiveSlot: (state, action) => {
      const slot = action.payload;
      if (state.activeSlots.includes(slot)) {
        state.activeSlots = state.activeSlots.filter((s) => s !== slot);
      } else {
        state.activeSlots.push(slot);
      }
    },
    setMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
    setYear: (state, action) => {
      state.currentYear = action.payload;
    },
    toggleAlert: (state) => {
      state.showAlert = !state.showAlert;
    },
  },
});

export const {
  setActiveDay,
  toggleActiveSlot,
  setMonth,
  setYear,
  toggleAlert,
} = bookApointmentSlice.actions;

export default bookApointmentSlice.reducer;
