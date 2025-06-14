import axios from "axios";

export const heroApi = axios.create({
  baseURL: "http://localhost:32307",
});
