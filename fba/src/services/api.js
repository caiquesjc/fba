import axios from "axios";//axios para criar a api

const api = axios.create({
    baseURL: "http://192.168.100.6:4002"
}); 

export default api;