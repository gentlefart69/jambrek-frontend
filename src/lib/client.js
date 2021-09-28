import axios from "axios";
import { BASE_URL } from "../constants/apiConstants";

class APIClient {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });
  }

  async belts() {
    const response = await this.instance.get("/api/belts");
    return response.data;
  }

  async createBelt(data) {
    return await this.instance.post("/api/belts/new", data);
  }

  async login({ email, password }) {
    await this.instance.get("/sanctum/csrf-cookie");
    await this.instance.post("/api/login", { email, password });
  }

  async register({ email, password, name }) {
    await this.instance.get("/sanctum/csrf-cookie");
    await this.instance.post("/api/register", { email, password, name });
  }

  async logout() {
    await this.instance.delete("/api/logout");
  }
}

const client = new APIClient();
export default client;
