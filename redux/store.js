import { configureStore } from "@reduxjs/toolkit";

import { postsReducer } from "./post/postReducer";
import { userReducer } from "./user/userReducer";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    postsState: postsReducer,
  },
});
