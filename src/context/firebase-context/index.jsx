import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageService } from "@/config/service";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const ApiContext = createContext();

export const useApiContext = () => {
  return useContext(ApiContext);
};

function ApiProvider({ children }) {
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3001";

  const endpoints = {
    signUp: `${BASE_URL}/api/auth/signup`,
    signIn: `${BASE_URL}/api/auth/signin`,
    courses: `${BASE_URL}/api/courses`,
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

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const googleProvider = new GoogleAuthProvider();

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
  async function signUp(userName, email, password, role, authType) {
    const appUser = {
      email: email,
      userName: userName,
      password: password,
      role: role,
      authType: authType,
    };
    try {
      const response = await axios.post(endpoints.signUp, appUser);
      if (response.status === 200) {
        //get token from response
        const token = response.data.token;
        //set token in local storage
        LocalStorageService.setToken(token);
        //navigate to dashboard
        navigateToDashboard(appUser);
      } else {
        alert(
          response.data.message || "Unexpected error occurred during sign-up."
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
      const response = await axios.post(endpoints.signIn, appUser);

      if (response.status === 200) {
        const token = response.data.token;
        LocalStorageService.setToken(token);
        appUser = {
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          authType: response.data.authType,
        };
        navigateToDashboard(appUser);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to sign in, Please try again."
      );
    }
  }
  // Navigate to dashboard based on role
  async function navigateToDashboard(user) {
    if (user.role === "student") navigate("/student");
    else if (user.role === "teacher") navigate("/instructor");
  }

  // Logout from
  const Logout = async () => {
    //remove token from local storage
    LocalStorageService.removeToken();
    navigate("/");
  };

  // Function to get all courses
  async function getAllCourses() {
    // return all courses -> [ {}, {}, {} ]
    try {
      const token = LocalStorageService.getToken();
      const response = await axios.get(endpoints.courses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("Failed to fetch courses, Please try again");
    }
  }
  async function getCourseData(courseId) {
    try {
      const token = LocalStorageService.getToken();
      const response = await axios.get(`${endpoints.courses}/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Failed to fetch course, Please try again");
    }
  }

  async function createCourseData(course) {
    try {
      const token = LocalStorageService.getToken();
      console.log(course);

      //fot post request, we need to end-point-url, data/body, and headers
      const response = await axios.post(endpoints.courses, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Course created successfully");
        alert("Course created successfully");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course, Please try again");
    }
  }

  async function updateCourseData(course) {
    try {
      const token = LocalStorageService.getToken();
      const response = await axios.put(
        `${endpoints.courses}/${course.courseId}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
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
      const response = await axios.delete(`${endpoints.courses}/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Course deleted successfully");
        alert("Course deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course, Please try again");
    }
  }

  const value = {
    app,
    auth,
    googleProvider,
    signUpWithGoogle,
    Logout,
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

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export default ApiProvider;
