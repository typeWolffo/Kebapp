import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useAppState } from "./contexts/KebappContext";
import Home from "./pages/Home/Home";

function App() {
  const { isAuthenticated } = useAppState();
  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return <Login />;
}

export default App;
