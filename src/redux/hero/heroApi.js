import axios from "axios";

export const heroApi = axios.create({
  baseURL: "https://superhero-back-zbf0.onrender.com",
});
