import axios from "axios"; //axios para criar a api

const api = axios.create({
  baseURL: "http://192.168.100.6:4002",
  // baseURL: "https://api-fba.herokuapp.com"
});

export default api;
