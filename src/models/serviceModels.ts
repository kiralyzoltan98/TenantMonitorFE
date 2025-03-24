import { User } from "./dataModels";

export interface AuthService {
  login(config: {
    email?: string;
    userName?: string;
    password: string;
  }): Promise<boolean>;
  register(config: {
    email: string;
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<void>;
  forgotPassword(config: { email: string }): Promise<void>;
}

export interface UserService {
  getUserInfo(): Promise<User>
}