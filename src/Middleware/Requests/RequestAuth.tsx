// Axios
import axios from "axios";

// Request With Token
const RequestAuth = axios.create({
    baseURL: process.env.REACT_APP_AUTH
})

export default RequestAuth;