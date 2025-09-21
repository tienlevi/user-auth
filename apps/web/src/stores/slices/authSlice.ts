import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSlice: (state, action) => {
      state.user = action.payload;
    },
    logoutSlice: (state) => {
      state.user = null;
      localStorage.removeItem("AccessToken");
    },
  },
});

export const { loginSlice, logoutSlice } = authSlice.actions;

export default authSlice.reducer;
