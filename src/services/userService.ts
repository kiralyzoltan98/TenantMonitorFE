import { API_BASE_URL } from "@/config";
import { ApiError } from "@/error/ApiError";
import { UserService } from "@/models/serviceModels";
import { getAccessToken } from "@/utils/util";

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
          let errorMessage = `getUserInfo failed with status ${res.status}`;
          try {
              const errorBody = await res.json();
              errorMessage = errorBody.message || errorMessage;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
              // Ignore if response body is not JSON or empty
          }
          throw new ApiError(errorMessage, res.status, res);
        }
        const data = await res.json();
    
        return data;
  }
}