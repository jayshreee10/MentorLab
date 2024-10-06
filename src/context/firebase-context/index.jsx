import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"; // Correct modular imports
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext } from "react";
// Create Firebase Context
const FireBaseContext = createContext();

// Custom hook to use Firebase context
export const useFirebaseContext = () => {
  return useContext(FireBaseContext);
};

// Firebase Provider component
function FirebaseProvider({ children }) {
  const dbPaths = {
    users: "users",
    courses: "courses",
  };
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
  const database = getFirestore(app);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Sign up with Google
  const signUpWithGoogle = async (role) => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const user = credential.user;
      console.log("signed in successfully");
      await createUserData(user, "", role);
    } catch (error) {
      console.log(error);
      alert("Failed to sign up with Google, Please try again");
    }
  };
  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      await navigateToDashboard(credential.user);
    } catch (error) {
      console.log(error);
      alert("Failed to sign in with Google, Please try again");
    }
  };

  const signUpWithEmailPassword = async (email, password, name, role) => {
    try {
      console.log("signing up");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("signed up successfully");
      await createUserData(user, name, role);
    } catch (error) {
      console.log(error);
      alert("Failed to sign up with Email and Password, Please try again");
    }
  };

  const signInWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await navigateToDashboard(userCredential.user);
    } catch (error) {
      console.log(error);
      alert("Failed to sign in with Email and Password, Please try again");
    }
  };

  // Logout from Firebase
  const fireBaseLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      alert("Failed to logout, Please try again");
    }
  };

  function getUserPath(user) {
    const usersRef = collection(database, dbPaths.users);
    const userPoint = doc(usersRef, user.uid);
    return userPoint;
  }

  async function getUserDoc(user) {
    const userPoint = getUserPath(user);
    return await getDoc(userPoint);
  }

  async function createUserData(user, name, role) {
    const appUser = {
      email: user.email,
      name: name != "" ? name : user.displayName,
      profile_picture: user.photoURL,
      userId: user.uid,
      role: role,
    };

    const userDoc = await getUserDoc(user);
    if (userDoc.exists()) {
      alert("User already exists, Please Sign In");
    } else {
      console.log("user does not exist");
      await setDoc(getUserPath(user), appUser);
      // Set the persistence to 'local' or 'session'
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Existing and new sign-in will be persisted
        })
        .catch((error) => {
          // Handle errors
          alert("Failed to create user data, Please try again");
        });
    }
  }

  async function navigateToDashboard(user) {
    const userDoc = await getUserDoc(user);

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.role === "student") {
        //navigate to student dashboard
      }
      if (data.role === "teacher") {
        //navigate to teacher dashboard
      }
      // Set the persistence to 'local' or 'session'
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Existing and new sign-in will be persisted
        })
        .catch((error) => {
          // Handle errors
          alert("Failed to navigate to home, Please try again");
        });
    } else {
      alert("User does not Exist, Please Sign Up");
    }
  }

  // Provide Firebase context to children
  const value = {
    app,
    auth,
    googleProvider,
    signUpWithGoogle,
    fireBaseLogout,
    signInWithGoogle,
    signUpWithEmailPassword,
    signInWithEmailPassword,
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}

export default FirebaseProvider;
