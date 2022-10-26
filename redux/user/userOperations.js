import { createAsyncThunk } from "@reduxjs/toolkit";

import { auth } from "../../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      if (!email || !password || !username) {
        return rejectWithValue("All fields are required!");
      }
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: username });
      const result = {
        userId: newUser.user.uid,
        username: newUser.user.displayName,
      };
      // console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.toString());
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      if (!email || !password) {
        return rejectWithValue("All fields are required!");
      }
      const response = await signInWithEmailAndPassword(auth, email, password);
      const result = {
        userId: response.user.uid,
        username: response.user.displayName,
      };
      return result;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

const RESPONSE = {
  _tokenResponse: {
    email: "test@mail.com1",
    expiresIn: "3600",
    idToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmNjcyNDYxOTk4YjJiMzMyYWQ4MTY0ZTFiM2JlN2VkYTY4NDZiMzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtbmF0aXZlLWdvaXQtZTJkOWYiLCJhdWQiOiJyZWFjdC1uYXRpdmUtZ29pdC1lMmQ5ZiIsImF1dGhfdGltZSI6MTY2NjcyODAyOCwidXNlcl9pZCI6Iko4M2tpQTRjd1ZkNGpSQWwzYm1XbTd3eGJyQTIiLCJzdWIiOiJKODNraUE0Y3dWZDRqUkFsM2JtV203d3hickEyIiwiaWF0IjoxNjY2NzI4MDI4LCJleHAiOjE2NjY3MzE2MjgsImVtYWlsIjoidGVzdEBtYWlsLmNvbTEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBtYWlsLmNvbTEiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kgfIfCfvs6CRpKn-zzygf8SE659z11FPKF49bRER-QbOVWgxtB3MMEo6ErUK5gv655fedVYCygvGjiAeBVvlieLfrA4gUWgitHTktcBwN3HctqqHYnonoaJm3t0IGe5-7r9FBBNCT2evXiWuPpGYtXuSdun8oqRm-4iIwYBt-6vQodjGA3Mg541y3oQufqC6W9lIEOZRQqPT4GK0ginAAInP4XGewmVOggvb00x2F4B_cmxWFOOrNJXmucO5pkF8bjD9pnLXstMBj0KmJEbCtxjkr8UiSpe3hegFK6PM1fbjturwLaRWnaIqbUqNGc4RHuNL5ekeC_CWsG80mZDw0g",
    kind: "identitytoolkit#SignupNewUserResponse",
    localId: "J83kiA4cwVd4jRAl3bmWm7wxbrA2",
    refreshToken:
      "AOEOulYkR966YB5GDFqjY-eNQ95iZYi5S9ORx0uesfcs_5vZC2t6AHJMowMz2on0258agyhR-2YNQ3qAVnZ94qW6SpuDozSPEIRC0ReMh_Z0Jslhi33vnjoMWo2ukPbhJLqU1ZdYahFS0hvJokNpiSWxMFSue5lHjU8XLDy83mVy2c2WnUG7UiNs5iVNsHO9lTWB3HgAaxaMs3vfZn4jnBHJjpvKheP7t0t5_K_bkNm-bL0IyCDAlmk",
  },
  operationType: "signIn",
  providerId: null,
  user: {
    _redirectEventId: undefined,
    apiKey: "AIzaSyA5rf_e-RoaWEfT_ykFq26Lwct5lEMC-Mo",
    appName: "[DEFAULT]",
    createdAt: "1666728028722",
    displayName: undefined,
    email: "test@mail.com1",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "1666728028722",
    phoneNumber: undefined,
    photoURL: undefined,
    providerData: [Array],
    stsTokenManager: [Object],
    tenantId: undefined,
    uid: "J83kiA4cwVd4jRAl3bmWm7wxbrA2",
  },
};
