import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Teacher from "./pages/Teacher";

function App() {
  return (
    <>
      <Routes>
        {<Route path="/" element={<Auth />} />}
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </>
  );
}

export default App;
