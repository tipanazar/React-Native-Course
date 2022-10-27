import { createAction } from "@reduxjs/toolkit";

export const getCurrentUserAction = createAction("user/getCurrentUser");
export const resetErrorAction = createAction("user/resetError");
