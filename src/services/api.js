import axios from "axios";

class Api {
  instance;

  constructor(options) {
    this.instance = axios.create({
      baseURL: "https://kebapp.com.pl/api",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    this.instance.interceptors.response.use(this.handleSuccess);
  }

  // eslint-disable-next-line class-methods-use-this
  handleSuccess(response) {
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  redirectTo = (document, path) => {
    // eslint-disable-next-line no-param-reassign
    document.location = path;
  };

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, "/");
        break;
      case 404:
        this.redirectTo(document, "https://http.cat/404");
        break;
      default:
        this.redirectTo(document, "https://http.cat/500");
        break;
    }
    return Promise.reject(error);
  };

  loginUser(userCredentials) {
    return this.instance.post("/auth/login", userCredentials);
  }

  registerUser(userCredentials) {
    return this.instance.post("/auth/register", userCredentials);
  }

  createEvent(event) {
    return this.instance.post("/events", event);
  }

  get(path, callback) {
    return this.instance.get(path).then((response) => callback(response.status, response.data));
  }

  patch(path, payload, callback) {
    return this.instance
      .request({
        data: payload,
        method: "PATCH",
        responseType: "json",
        url: path,
      })
      .then((response) => callback(response.status, response.data));
  }

  post(path, payload) {
    return this.instance.request({
      data: payload,
      method: "POST",
      responseType: "json",
      url: path,
    });
  }
}

export default Api;
