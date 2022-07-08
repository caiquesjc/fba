import axios from "axios"; //axios para criar a api

const api = axios.create({
  baseURL: "https://api-fba.herokuapp.com",
});

export default api;
