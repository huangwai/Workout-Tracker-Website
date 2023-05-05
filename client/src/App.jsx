import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/user-auth/login";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        {/* Navbar here */}
        <Routes>
          {/* Paths to components here */}
          <Route exact path="/" element={<Login />} />
          {/* User authenication */}
        </Routes>
        {/* Footer here */}
      </Router>
    </div>
  );
}
export default App;
