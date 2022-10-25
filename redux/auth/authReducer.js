import { createSlice } from "@reduxjs/toolkit";

import { registerUser, loginUser } from "./authOperations";

const initialState = {
  error: null,
  isLoading: false,
  user: {
    userId: null,
    username: null,
    stateChange: false,
  },
};

// console.log(initialState.error);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = {
        userId: payload.userId,
        username: payload.username || null,
      };
      console.log(state.user)
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      payload === "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ? (state.error = "Email already in use!")
        : (state.error = payload);
      state.isLoading = false;
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("Пришло: ", payload);
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("Ошибка: ", payload);
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
