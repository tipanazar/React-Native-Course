import { createSlice } from "@reduxjs/toolkit";

import { registerUser, loginUser, getCurrentUser } from "./userOperations";

const initialState = {
  error: null,
  isLoading: false,
  user: {
    userId: null,
    username: null,
    userEmail: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers:{getCurrentUser:},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.user = {
        userId: payload.userId,
        username: payload.username || null,
        userEmail: payload.userEmail,
      };
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      payload === "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ? (state.error = "Email is already in use!")
        : (state.error = payload);
      state.isLoading = false;
    },

    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = {
        userId: payload.userId,
        username: payload.username || null,
        userEmail: payload.userEmail,
      };
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      payload === "FirebaseError: Firebase: Error (auth/wrong-password)."
        ? (state.error = "Wrong password!")
        : (state.error = payload);
      state.isLoading = false;
    },

    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.user = {
        userId: payload.userId,
        username: payload.username || null,
        userEmail: payload.userEmail,
      };
    },
  },
});

export default userSlice.reducer;
