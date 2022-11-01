import { createAction } from "@reduxjs/toolkit";

export const resetPostErrorAction = createAction("posts/resetPostError");
export const postsHandler = createAction("posts/postHandler");
