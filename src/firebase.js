import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDXSk0y706ksTIfUPm5ZV7JVlXSKNA4R-o",
  authDomain: "netflix-clone-47066.firebaseapp.com",
  projectId: "netflix-clone-47066",
  storageBucket: "netflix-clone-47066.firebasestorage.app",
  messagingSenderId: "11713192969",
  appId: "1:11713192969:web:1c648da7193b99b7b804d8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user.uid; // Return the user ID after login
  } catch (error) {
    console.log(error);
    alert(error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user.uid; // Return the user ID after signup
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
};


const logout = () => {
   signOut(auth);
}

export { auth, db, login, signup, logout};

// 2:48min