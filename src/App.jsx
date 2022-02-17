import Login from "./pages/Login/Login";
import { useAppState } from "./contexts/KebappContext";
import AuthContext from "./contexts/AuthContext";
import Home from "./pages/Home/Home";

function App() {
  const { isAuth } = useAppState();

  return <AuthContext>{isAuth ? <Home /> : <Login />}</AuthContext>;
}

export default App;
