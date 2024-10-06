import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"; // Correct modular imports

// Create Firebase Context
const FireBaseContext = createContext();

// Custom hook to use Firebase context
export const useFirebaseContext = () => {
  return useContext(FireBaseContext);
};

// Firebase Provider component
function FirebaseProvider({ children }) {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBNvT5L0u7Y7yB8Xh0vSQuV5li_OTGWhT0",
    authDomain: "mentorlab-9db1b.firebaseapp.com",
    projectId: "mentorlab-9db1b",
    storageBucket: "mentorlab-9db1b.appspot.com",
    messagingSenderId: "375961028209",
    appId: "1:375961028209:web:cb6e226eea62cd2c15bdd0",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Auth and Google Auth Provider
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Sign in with Google
  const signinWithGoogle = async () => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);

      console.log("signed in successfully" + credential.user.email);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Logout from Firebase
  const fireBaseLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Provide Firebase context to children
  const value = {
    app,
    auth,
    googleProvider,
    signinWithGoogle,
    fireBaseLogout,
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}

export default FirebaseProvider;
