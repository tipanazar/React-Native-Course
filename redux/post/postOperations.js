import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, storage, firestoreApp } from "../../firebase";
import { postsHandler } from "./postActions";

export const getPosts = () => (dispatch) => {
  try {
    const postsStorageRef = collection(firestoreApp, `posts`);
    onSnapshot(postsStorageRef, (data) => {
      if (data.docs.length) {
        const parcedArr = data.docs.map((post) => post.data());
        dispatch(postsHandler(parcedArr));
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ postData }, { rejectWithValue }) => {
    try {
      const { postTitle, postImage, postLocation } = postData;
      const randomId = nanoid();
      // image upload
      const postImageStorageRef = ref(storage, `posts/${randomId}`);
      const photoBlob = await (await fetch(postImage)).blob();
      await uploadBytes(postImageStorageRef, photoBlob);
      const photoURL = await getDownloadURL(postImageStorageRef);
      // post upload
      const postsStorageRef = collection(firestoreApp, `posts`);
      await addDoc(postsStorageRef, {
        id: randomId,
        postTitle,
        postImage: photoURL,
        postLocation,
        likes: 0,
        comments: [],
        postOwner: auth.currentUser.uid,
        creationDate: new Date().getTime(),
      });
      return;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);
