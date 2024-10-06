import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Instructor from "./pages/Teacher";
import Student from "./pages/Student";
import Hero from "./pages/Hero";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </>
  );
}

export default App;
