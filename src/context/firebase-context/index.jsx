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
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create Firebase Context
const FireBaseContext = createContext();

// Custom hook to use Firebase context
export const useFirebaseContext = () => {
  return useContext(FireBaseContext);
};

// Firebase Provider component
function FirebaseProvider({ children }) {
  const navigate = useNavigate();
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

  //course path
  function getCoursePath(course) {
    return doc(collection(database, dbPaths.courses), course.id);
  }

  // Helper function to get user document
  async function getUserDoc(user) {
    const userPoint = getUserPath(user);
    return await getDoc(userPoint);
  }

  // Helper function to get course document
  async function getCourseDoc(course) {
    const coursePoint = getCoursePath(course);
    return await getDoc(coursePoint);
  }

  // get all courses
  async function getAllCourses() {
    const coursesCollection = collection(database, dbPaths.courses);
    const coursesSnapshot = await coursesCollection.get();
    return coursesSnapshot.docs.map((doc) => doc.data());
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

    const userDoc = await getUserDoc(user);
    if (userDoc.exists()) {
      alert("User already exists, Please sign in.");
    } else {
      console.log("User does not exist, creating new user...");
      await setDoc(getUserPath(user), appUser);
      navigateToDashboard(user);
    }
  }

  // Create course data in Firestore
  async function createCourseData(course) {
    const courseDoc = await getCourseDoc(course);
    if (courseDoc.exists()) {
      alert("Course already exists, Please sign in.");
    } else {
      console.log("Course does not exist, creating new course...");
      await setDoc(getCoursePath(course), course);
      navigateToDashboard(course);
    }
  }

  //update course data in Firestore
  async function updateCourseData(course) {
    const courseDoc = await getCourseDoc(course);
    if (courseDoc.exists()) {
      console.log("Course exists, updating course...");
      await setDoc(getCoursePath(course), course);
      navigateToDashboard(course);
    } else {
      alert("Course does not exist, Please sign in.");
    }
  }

  //delete course data in Firestore
  async function deleteCourseData(course) {
    const courseDoc = await getCourseDoc(course);
    if (courseDoc.exists()) {
      console.log("Course exists, deleting course...");
      await setDoc(getCoursePath(course), course);
      navigateToDashboard(course);
    } else {
      alert("Course does not exist, Please sign in.");
    }
  }

  // Navigate to dashboard based on role
  async function navigateToDashboard(user) {
    const userDoc = await getUserDoc(user);
    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.role === "student") {
        // Navigate to student dashboard
        navigate("/student");
        console.log("Navigating to student dashboard...");
      } else if (data.role === "teacher") {
        //instructor
        navigate("/instructor");
        // Navigate to teacher dashboard
        console.log("Navigating to teacher dashboard...");
      }
    } else {
      alert("User does not exist, please sign up.");
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
