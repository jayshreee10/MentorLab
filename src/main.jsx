import AuthProvider from "@/context/auth-context";
import InstructorProvider from "./context/instructor-context/index.jsx";
import FirebaseProvider from "./context/firebase-context/index.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FirebaseProvider>
      <AuthProvider>
        <InstructorProvider>
          <App />
        </InstructorProvider>
      </AuthProvider>
    </FirebaseProvider>
  </BrowserRouter>
);
