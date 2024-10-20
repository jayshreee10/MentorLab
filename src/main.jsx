import AuthProvider from "@/context/auth-context";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ApiProvider from "./context/firebase-context/index.jsx";
import InstructorProvider from "./context/instructor-context/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApiProvider>
      <AuthProvider>
        <InstructorProvider>
          <App />
        </InstructorProvider>
      </AuthProvider>
    </ApiProvider>
  </BrowserRouter>
);
