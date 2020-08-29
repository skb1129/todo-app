import Axios from "axios";

const api = Axios.create({
  baseURL: "/api",
});

export default api;
