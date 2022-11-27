import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOrderPopupOpened: false,
};

const popupsSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {
    openOrderPopup(state) {
      state.isOrderPopupOpened = true;
    },
    closeOrderPopup(state) {
      state.isOrderPopupOpened = false;
    }
  }
})

export const { openOrderPopup, closeOrderPopup } = popupsSlice.actions;
export default popupsSlice.reducer;