import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyA5rf_e-RoaWEfT_ykFq26Lwct5lEMC-Mo",
  authDomain: "react-native-goit-e2d9f.firebaseapp.com",
  projectId: "react-native-goit-e2d9f",
  storageBucket: "react-native-goit-e2d9f.appspot.com",
  messagingSenderId: "155569825387",
  appId: "1:155569825387:web:3df117c801d60dcf20332e",
});

export const auth = getAuth(firebaseApp);
export const storage = getStorage(
  firebaseApp,
  "gs://react-native-goit-e2d9f.appspot.com"
);
export const firestoreApp = getFirestore(firebaseApp);
// export const postsCollection = collection(storage, "posts");
