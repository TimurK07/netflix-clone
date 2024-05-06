import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAVibIzbv-7rioOUvvMmHosPhpF8zD2Gxw",
  authDomain: "netflix-clone-eef3f.firebaseapp.com",
  projectId: "netflix-clone-eef3f",
  storageBucket: "netflix-clone-eef3f.appspot.com",
  messagingSenderId: "860484879952",
  appId: "1:860484879952:web:a5629ef75827f93beff355",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvideer: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
