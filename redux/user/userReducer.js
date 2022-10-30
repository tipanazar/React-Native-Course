import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  logoutUser,
  uploadUserAvatar,
} from "./userOperations";

const initialState = {
  error: null,
  isLoading: false,
  user: {
    userId: null,
    username: null,
    userEmail: null,
    avatarUrl: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUser: (state, { payload }) => {
      state.user = {
        userId: payload.userId,
        username: payload.username || null,
        userEmail: payload.userEmail,
        avatarUrl: payload.avatarUrl || null,
      };
    },
    resetError: (state) => {
      state.error = null;
    },
  },
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
        avatarUrl: payload.avatarUrl || null,
      };
      console.log(payload.avatarUrl)
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      payload === "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ? (state.error = "Email is already in use!")
        : (state.error = payload);
      console.log("registration error");
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
        avatarUrl: payload.avatarUrl || null,
      };
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, { payload }) => {
      payload === "FirebaseError: Firebase: Error (auth/wrong-password)."
        ? (state.error = "Wrong Password!")
        : payload === "FirebaseError: Firebase: Error (auth/user-not-found)."
        ? (state.error = "Wrong Email!")
        : (state.error = payload);
      state.isLoading = false;
    },

    [uploadUserAvatar.pending]: (state) => {
      state.error = null;
    },
    [uploadUserAvatar.fulfilled]: (state, { payload }) => {
      state.user.avatarUrl = payload;
    },
    [uploadUserAvatar.error]: (state, { payload }) => {
      state.error = payload;
    },

    [logoutUser.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [logoutUser.fulfilled]: (state) => {
      state.user = {
        userId: null,
        username: null,
        userEmail: null,
      };
      state.isLoading = false;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
