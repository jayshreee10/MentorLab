import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageService } from "@/config/service";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const FireBaseContext = createContext();

export const useFirebaseContext = () => {
  return useContext(FireBaseContext);
};

function FirebaseProvider({ children }) {
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001";

  const endpoints = {
    signUp: `${BASE_URL}/api/auth/signup`,
    signIn: `${BASE_URL}/api/auth/signin`,
    courses: `${BASE_URL}/api/courses`,
  };

  // Firebase configuration from .env
  const firebaseConfig = {
    apiKey: "AIzaSyBNvT5L0u7Y7yB8Xh0vSQuV5li_OTGWhT0",
    authDomain: "mentorlab-9db1b.firebaseapp.com",
    projectId: "mentorlab-9db1b",
    storageBucket: "mentorlab-9db1b.appspot.com",
    messagingSenderId: "375961028209",
    appId: "1:375961028209:web:cb6e226eea62cd2c15bdd0",
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
      //sign in with google
      const { user } = await signInWithPopup(auth, googleProvider);
      //sign up from the mentor-lab server
      await signUp(user.displayName, user.email, user.uid, role, "google");
    } catch (error) {
      console.error(error);
      alert("Failed to sign up with Google, Please try again");
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      //sign in with google
      const { user } = await signInWithPopup(auth, googleProvider);
      //sign in from the mentor-lab server
      await signIn(user.email, user.uid);
    } catch (error) {
      console.error(error);
      alert("Failed to sign in with Google, Please try again");
    }
  };

  // Sign up with EmailPassword
  const signUpWithEmailPassword = async (email, password, name, role) => {
    try {
      await signUp(name, email, password, role, "email");
    } catch (error) {
      console.error(error);
      alert("Failed to sign up with Email and Password, Please try again");
    }
  };

  // Sign in with EmailPassword
  const signInWithEmailPassword = async (email, password) => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error(error);
      alert("Failed to sign in with Email and Password, Please try again");
    }
  };

  // Logout from Firebase
  const fireBaseLogout = async () => {
    //remove token from local storage
    LocalStorageService.removeToken();
    navigate("/");
  };

  //get course from id
  async function getCourseDocFromId(courseId) {
    const coursePoint = doc(database, dbPaths.courses, courseId);
    return await getDoc(coursePoint); //firebase func
  }

  async function signUp(userName, email, password, role, authType) {
    const appUser = {
      email: email,
      userName: userName,
      password: password,
      role: role,
      authType: authType,
    };
    try {
      const result = await axios.post(endpoints.signUp, appUser);
      console.log(result);

      if (result.status === 200) {
        const token = result.data.token;
        console.log(token);
        LocalStorageService.setToken(token);
        navigateToDashboard(appUser);
      } else {
        alert(
          result.data.message || "Unexpected error occurred during sign-up."
        );
      }
    } catch (error) {
      console.error("Axios error:", error.response);
      alert(
        error.response?.data?.message ||
          "Failed to create user, Please try again."
      );
    }
  }

  async function signIn(email, password) {
    let appUser = { email: email, password: password };

    try {
      const result = await axios.post(endpoints.signIn, appUser);
      if (result.status === 200) {
        const token = result.data.token;
        LocalStorageService.setToken(token);
        console.log(token);
        appUser = {
          email: result.data.email,
          name: result.data.name,
          role: result.data.role,
          authType: result.data.authType,
        };
        navigateToDashboard(appUser);
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to sign in, Please try again."
      );
    }
  }

  // Function to get all courses
  async function getAllCourses() {
    try {
      const token = LocalStorageService.getToken();
      const result = await axios.get(endpoints.courses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to fetch courses, Please try again");
    }
  }

  async function createCourseData(course) {
    try {
      const token = LocalStorageService.getToken();
      console.log(course);
      const result = await axios.post(endpoints.courses, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        console.log("Course created successfully");
        alert("Course created successfully");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course, Please try again");
    }
  }

  //update course data in Firestore
  async function updateCourseData(course) {
    try {
      const token = LocalStorageService.getToken();
      const result = await axios.put(
        `${endpoints.courses}/${course.courseId}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.status === 200) {
        console.log("Course updated successfully");
        alert("Course updated successfully");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course, Please try again");
    }
  }

  async function deleteCourseData(courseId) {
    try {
      const token = LocalStorageService.getToken();
      const result = await axios.delete(`${endpoints.courses}/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        console.log("Course deleted successfully");
        alert("Course deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course, Please try again");
    }
  }

  async function getCourseData(courseId) {
    try {
      const token = LocalStorageService.getToken();
      const result = await axios.get(`${endpoints.courses}/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Failed to fetch course, Please try again");
    }
  }

  // Navigate to dashboard based on role
  async function navigateToDashboard(user) {
    if (user.role === "student") navigate("/student");
    else if (user.role === "teacher") navigate("/instructor");
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
    getCourseData,
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
}

export default FirebaseProvider;
