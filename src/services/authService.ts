import { AuthService } from "@/models/serviceModels";
import { API_BASE_URL } from "../config";

export const authService: AuthService = {
  async login(config) {
    const url = API_BASE_URL + "/v1/login";
    const payload = {
      //email: config.email,
      userName: config.userName,
      password: config.password,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const fetchConfig: RequestInit = {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, fetchConfig);
    if (!res.ok) {
      throw new Error("Login failed.");
    }
    const data = await res.json();
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;
    if (!accessToken || !refreshToken) {
      throw new Error("missing token");
    }

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    return true;
  },
  async register(config) {
    const url = API_BASE_URL + "/v1/register";
    const payload = {
      email: config.email,
      userName: config.userName,
      password: config.password,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const fetchConfig: RequestInit = {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, fetchConfig);
    if (!res.ok) {
      throw new Error("Register failed.");
    }
  },
  async forgotPassword(config) {
    const url = API_BASE_URL + "/v1/forgot-password";
    const payload = {
      email: config.email,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const fetchConfig: RequestInit = {
      headers,
      method: "POST",
      body: JSON.stringify(payload),
    };
    const res = await fetch(url, fetchConfig);
    if (!res.ok) {
      throw new Error("Forgot password failed.");
    }
  }
}