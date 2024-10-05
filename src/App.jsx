import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Instructor from "./pages/Teacher";
import Student from "./pages/Student";

function App() {
  return (
    <>
      <Routes>
        {<Route path="/" element={<Auth />} />}
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </>
  );
}

export default App;
