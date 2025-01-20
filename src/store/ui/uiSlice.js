import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isDateModalOpen = true;
    },
    closeModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
