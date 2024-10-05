import React from "react";
import { initializeApp } from "firebase/app";

function firebaseProvider() {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  return <div>index</div>;
}

export default firebaseProvider;
