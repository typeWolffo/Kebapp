import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login/Login";
import KebappContext, { useAppState } from "./contexts/KebappContext";
import AuthContext from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./pages/Settings/Settings";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import api from "./services/api";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <KebappContext>
      <BrowserRouter>
        {isAuth ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/create-event" element={<CreateEvent />} />
            </Routes>
            <Navbar />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        )}
      </BrowserRouter>
    </KebappContext>
  );
}

export default App;
