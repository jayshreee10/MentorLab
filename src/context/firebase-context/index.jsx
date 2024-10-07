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
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
  const database = getFirestore(app);
  const storage = getStorage(app);
  const googleProvider = new GoogleAuthProvider();
  const dbPaths = {
    users: "users",
    courses: "courses",
  };

  //to upload files to firebase storage, input: file, output: url
  async function uploadFile(file) {
    try {
      const storageRef = ref(storage, file.name); //we are creating a reference/path to the file in the storage
      //uploading the file to the storage to given path, storageRef is the path and file is the file to be uploaded
      const response = await uploadBytes(storageRef, file);

      console.log("Uploaded a blob or file!");

      const url = await getDownloadURL(response.ref);

      return url;
    } catch (error) {
      console.error(error);
    }
  }

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

  // Function to get all courses
  async function getAllCourses() {
    try {
      const coursesCollection = collection(database, dbPaths.courses);
      const coursesSnapshot = await getDocs(coursesCollection);
      const result = coursesSnapshot.docs.map((doc) => doc.data());

      console.log("Courses fetched successfully");
      console.log(result);

      return result;
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to fetch courses, Please try again");
    }
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
    try {
      const courseDoc = await getCourseDoc(course);
      if (courseDoc.exists()) {
        alert("Course already exists, Please sign in.");
      } else {
        console.log("Course does not exist, creating new course...");
        await setDoc(getCoursePath(course), course);
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course, Please try again");
    }
  }

  //update course data in Firestore
  async function updateCourseData(course) {
    try {
      const courseDoc = await getCourseDoc(course);
      if (courseDoc.exists()) {
        console.log("Course exists, updating course...");
        await setDoc(getCoursePath(course), course);
      } else {
        alert("Course does not exist, Please sign in.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course, Please try again");
    }
  }

  // Function to delete course data in Firestore
  async function deleteCourseData(courseId) {
    try {
      const courseDoc = await getCourseDoc(courseId); // Fetch the course document snapshot
      console.log(courseDoc);
      if (courseDoc.exists()) {
        console.log("Course exists, deleting course...");
        await deleteDoc(courseDoc.ref); // Use the document reference (courseDoc.ref) for deletion
        console.log("Course deleted successfully");
      } else {
        alert("Course does not exist, Please sign in.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course, Please try again");
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
    uploadFile,
    createCourseData,
    getAllCourses,
    updateCourseData,
    deleteCourseData,
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}

export default FirebaseProvider;
