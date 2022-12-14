import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
    console.log(err.toString());
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
      const postsStorageRef = doc(firestoreApp, `posts`, randomId);
      await setDoc(postsStorageRef, {
        id: randomId,
        postTitle,
        postImage: photoURL,
        postLocation,
        likesArr: [],
        commentsArr: [],
        postAuthor: auth.currentUser.uid,
        creationDate: new Date().getTime(),
      });
      return;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/createPost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      // post delete
      const postsStorageRef = doc(firestoreApp, `posts`, postId);
      await deleteDoc(postsStorageRef);
      // image delete
      const postImageStorageRef = ref(storage, `posts/${postId}`);
      await deleteObject(postImageStorageRef);
      return;
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

export const addLike = async ({ postId }) => {
  try {
    const postRef = doc(firestoreApp, `posts/${postId}`);
    await updateDoc(postRef, {
      likesArr: arrayUnion(auth.currentUser.uid),
    });
  } catch (err) {
    console.log(err.toString());
  }
};

export const removeLike = async ({ postId }) => {
  try {
    const postRef = doc(firestoreApp, `posts/${postId}`);
    await updateDoc(postRef, {
      likesArr: arrayRemove(auth.currentUser.uid),
    });
  } catch (err) {
    console.log(err.toString());
  }
};

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ newCommentData }, { rejectWithValue }) => {
    try {
      const { text, postId } = newCommentData;
      const postRef = doc(firestoreApp, `posts/${postId}`);
      const newComment = {
        text,
        sender: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          avatarUrl: auth.currentUser.photoURL,
        },
        creationDate: new Date().getTime(),
      };
      await updateDoc(postRef, {
        commentsArr: arrayUnion(newComment),
      });
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/removeComment",
  async ({ data }, { rejectWithValue }) => {
    try {
      const { commentObj, postId } = data;
      const postRef = doc(firestoreApp, `posts/${postId}`);
      await updateDoc(postRef, {
        commentsArr: arrayRemove(commentObj),
      });
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  }
);
