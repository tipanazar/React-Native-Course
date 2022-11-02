import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../firebase";

import { getCurrentUserAction } from "./userActions";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ formData, userAvatar }, { rejectWithValue }) => {
    try {
      const { email, password, username } = formData;
      if (!email || !password || !username) {
        return rejectWithValue("All fields are required!");
      }
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userAvatar) {
        const usersAvatarStorageRef = ref(
          storage,
          `/userAvatars/${auth.currentUser.uid}`
        );
        const photo = await (await fetch(userAvatar)).blob();
        await uploadBytes(usersAvatarStorageRef, photo);
        const photoUrl = await getDownloadURL(usersAvatarStorageRef);
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: photoUrl,
        });
        return {
          userId: newUser.user.uid,
          username: newUser.user.displayName,
          userEmail: newUser.user.email,
          avatarUrl: photoUrl,
        };
      } else if (!userAvatar) {
        await updateProfile(auth.currentUser, { displayName: username });
        return {
          userId: newUser.user.uid,
          username: newUser.user.displayName,
          userEmail: newUser.user.email,
        };
      }
    } catch (err) {
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
        userEmail: response.user.email,
        avatarUrl: response.user.photoURL,
      };
      return result;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

export const uploadUserAvatar = createAsyncThunk(
  "user/uploadUserAvatar",
  async ({ photo }, { rejectWithValue }) => {
    try {
      const usersAvatarStorageRef = ref(
        storage,
        `/userAvatars/${auth.currentUser.uid}`
      );
      const photoBlob = await (await fetch(photo.uri)).blob();
      await uploadBytes(usersAvatarStorageRef, photoBlob);
      const photoURL = await getDownloadURL(usersAvatarStorageRef);
      await updateProfile(auth.currentUser, { photoURL });
      return photoURL;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

export const getCurrentUser = () => (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          userId: user.uid,
          username: user.displayName,
          userEmail: user.email,
          avatarUrl: user.photoURL,
        };
        dispatch(getCurrentUserAction(userData));
      }
    });
  } catch (err) {
    console.log(err.toString());
  }
};
