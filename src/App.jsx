import { useState } from "react";
import Login from "./pages/Login/Login";
import KebappContext from "./contexts/KebappContext";
import AuthContext from "./contexts/AuthContext";

function App() {
  const [token, setToken] = useState("");
  return (
    <KebappContext token={token}>
      <AuthContext>
        <Login setToken={setToken} />
        {/* <BrowserRouter> */}
        {/*  <Routes> */}
        {/*    <Route path="/" element={<Home />} /> */}
        {/*  </Routes> */}
        {/* </BrowserRouter> */}
      </AuthContext>
    </KebappContext>
  );
}

export default App;
