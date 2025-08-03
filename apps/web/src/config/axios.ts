import { baseURL } from "@/constants";
import axios from "axios";

const instance = axios.create({ baseURL: baseURL, withCredentials: true });

export default instance;
