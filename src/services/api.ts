import axios from "axios";

type Options = {
  token: string
}

class Api {
  instance;

  constructor(options: Options) {
    console.log(options);
    this.instance = axios.create({
      baseURL: "https://kebapp.com.pl/api",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${options?.token}`,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    this.instance.interceptors.response.use(this.handleSuccess);
  }

  // eslint-disable-next-line class-methods-use-this
  handleSuccess(response: any) {
    return response;
  }

  getCurrentUser() {
    return this.instance.post("/auth/me");
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
