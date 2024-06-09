import axios from "axios";
import { HOST_API } from "src/config-global";

const axiosInstance = axios.create({ baseURL: HOST_API });

export default axiosInstance;
