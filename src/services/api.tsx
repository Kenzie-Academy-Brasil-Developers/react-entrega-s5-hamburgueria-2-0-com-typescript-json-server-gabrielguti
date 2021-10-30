import axios from "axios";

const api = axios.create({
  baseURL: "https://kenzieburger.herokuapp.com/",
});

export default api;
