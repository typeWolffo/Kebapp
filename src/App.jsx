import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useAppState } from "./contexts/KebappContext";
import AuthContext from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { isAuth } = useAppState();
  console.log(isAuth);
  return (
    <AuthContext>
      <BrowserRouter>
        {isAuth ? (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
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
    </AuthContext>
  );
}

export default App;
