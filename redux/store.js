import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userReducer";

export const store = configureStore({
  reducer: {
    userState: userSlice,
  },
});
