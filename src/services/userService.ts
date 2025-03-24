import { API_BASE_URL } from "@/config";
import { UserService } from "@/models/serviceModels";
import getAccessToken from "@/utils/util";

export const userService: UserService = {
  async getUserInfo() {
    const url = API_BASE_URL + "/v1/user";
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + getAccessToken());
        const fetchConfig: RequestInit = {
          headers,
          method: "GET"
        };
        const res = await fetch(url, fetchConfig);
        if (!res.ok) {
          throw new Error("Login failed.");
        }
        const data = await res.json();
    
        return data;
  }
}