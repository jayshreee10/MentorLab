import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const FireBaseContext = createContext();

export const useFirebaseContext = () => {
  return useContext(FireBaseContext);
};

function FirebaseProvider({ children }) {
  const navigate = useNavigate();

  // Firebase configuration from .env
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const database = getFirestore(app);
  const dbPaths = {
    users: "users",
    courses: "courses",
  };

  // Sign up with Google
  const signUpWithGoogle = async (role) => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const user = credential.user;
      console.log("Signed up successfully with Google");
      await createUserData(user, "", role);
    } catch (error) {
      console.error(error);
      alert("Failed to sign up with Google, Please try again");
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      await navigateToDashboard(credential.user);
    } catch (error) {
      console.error(error);
      alert("Failed to sign in with Google, Please try again");
    }
  };

  // Sign up with EmailPassword
  const signUpWithEmailPassword = async (email, password, name, role) => {
    try {
      console.log("Signing up...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed up successfully with email and password");
      await createUserData(user, name, role);
    } catch (error) {
      console.error(error);
      alert("Failed to sign up with Email and Password, Please try again");
    }
  };

  // Sign in with EmailPassword
  const signInWithEmailPassword = async (email, password) => {
    try {
      console.log("Signing in...");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in successfully with email and password");
      await navigateToDashboard(userCredential.user);
    } catch (error) {
      console.error(error);
      alert("Failed to sign in with Email and Password, Please try again");
    }
  };

  // Logout from Firebase
  const fireBaseLogout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to log out, Please try again");
    }
  };

  // Helper function to get Firestore user path
  function getUserPath(user) {
    return doc(collection(database, dbPaths.users), user.uid);
  }

  // Helper function to get course path
  function getCoursePath(course) {
    return doc(collection(database, dbPaths.courses), course.id);
  }

  // Helper function to listen to user document in real-time
  async function getUserDoc(user, callback) {
    const userPoint = getUserPath(user);

    // Listen for real-time updates on the user document
    const unsubscribe = onSnapshot(userPoint, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data());
      } else {
        console.log("User does not exist");
      }
    });

    return unsubscribe;
  }

  // Helper function to listen to course document in real-time
  async function getCourseDoc(course, callback) {
    const coursePoint = getCoursePath(course);

    const unsubscribe = onSnapshot(coursePoint, (docSnapshot) => {
      if (docSnapshot.exists()) {
        callback(docSnapshot.data());
      } else {
        console.log("Course does not exist");
      }
    });

    return unsubscribe;
  }

  // Get all courses with real-time updates
  async function getAllCourses(callback) {
    const coursesCollection = collection(database, dbPaths.courses);

    const unsubscribe = onSnapshot(coursesCollection, (querySnapshot) => {
      const courses = querySnapshot.docs.map((doc) => doc.data());
      callback(courses);
    });

    return unsubscribe;
  }

  // Create user data in Firestore
  async function createUserData(user, name, role) {
    const appUser = {
      email: user.email,
      name: name || user.displayName,
      profile_picture: user.photoURL,
      userId: user.uid,
      role: role,
    };

    const unsubscribe = getUserDoc(user, (data) => {
      if (data) {
        alert("User already exists, Please sign in.");
      } else {
        console.log("User does not exist, creating new user...");
        setDoc(getUserPath(user), appUser);
        navigateToDashboard(user);
      }
    });

    return unsubscribe;
  }

  // Create course data in Firestore
  async function createCourseData(course) {
    const unsubscribe = getCourseDoc(course, (data) => {
      if (data) {
        alert("Course already exists, Please sign in.");
      } else {
        console.log("Course does not exist, creating new course...");
        setDoc(getCoursePath(course), course);
        navigateToDashboard(course);
      }
    });

    return unsubscribe;
  }

  // Update course data in Firestore
  async function updateCourseData(course) {
    const unsubscribe = getCourseDoc(course, (data) => {
      if (data) {
        console.log("Course exists, updating course...");
        setDoc(getCoursePath(course), course);
        navigateToDashboard(course);
      } else {
        alert("Course does not exist, Please sign in.");
      }
    });

    return unsubscribe;
  }

  // Delete course data in Firestore
  async function deleteCourseData(course) {
    const unsubscribe = getCourseDoc(course, (data) => {
      if (data) {
        console.log("Course exists, deleting course...");
        setDoc(getCoursePath(course), course);
        navigateToDashboard(course);
      } else {
        alert("Course does not exist, Please sign in.");
      }
    });

    return unsubscribe;
  }

  // Navigate to dashboard based on role
  async function navigateToDashboard(user) {
    const unsubscribe = getUserDoc(user, (data) => {
      if (data) {
        if (data.role === "student") {
          navigate("/student");
          console.log("Navigating to student dashboard...");
        } else if (data.role === "teacher") {
          navigate("/instructor");
          console.log("Navigating to teacher dashboard...");
        }
      } else {
        alert("User does not exist, please sign up.");
      }
    });

    return unsubscribe;
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
