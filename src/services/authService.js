import axios from "axios";

class AuthService {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: "https://kebapp.com.pl/api/auth",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  }

  loginUser(userCredentials) {
    return this.instance.post("/login", userCredentials).then((response) => {
      if (response.data.access_token) localStorage.setItem("token", response.data.access_token);
      return response.data;
    });
  }

  registerUser(userCredentials) {
    return this.instance.post("/register", userCredentials);
  }
}

export default AuthService;
