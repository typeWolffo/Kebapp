import axios from "axios";

class Api {
  constructor() {
    const api = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    api.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = api;
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

  get(path, callback) {
    return this.service
      .get(path)
      .then((response) => callback(response.status, response.data));
  }

  patch(path, payload, callback) {
    return this.service
      .request({
        data: payload,
        method: "PATCH",
        responseType: "json",
        url: path,
      })
      .then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback) {
    return this.service
      .request({
        data: payload,
        method: "POST",
        responseType: "json",
        url: path,
      })
      .then((response) => callback(response.status, response.data));
  }
}

export default new Api();
