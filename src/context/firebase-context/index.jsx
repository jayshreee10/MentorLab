import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase";
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
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  // Provide Firebase context to children
  const value = {
    app,
    auth,
    googleProvider,
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}

export default FirebaseProvider;
