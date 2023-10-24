// Axios
import axios from "axios";

// Request With Token
const Request = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export default Request;