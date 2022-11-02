import { createSlice } from "@reduxjs/toolkit";

import { addComment, createPost } from "./postOperations";

const initialState = {
  postsArr: [],
  error: null,
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostError: (state) => {
      state.error = null;
    },

    postHandler: (state, { payload }) => {
      state.postsArr = payload;
    },
  },
  extraReducers: {
    [createPost.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [addComment.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [addComment.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [addComment.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;
