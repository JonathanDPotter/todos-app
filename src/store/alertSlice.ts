import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertSliceState {
  alertMessage: string | null;
}

const initialState = { alertMessage: null } as AlertSliceState;

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertMessage: (state, action: PayloadAction<string | null>) => {
      state.alertMessage = action.payload;
    },
  },
});

export const { setAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
