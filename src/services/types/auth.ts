import { IUser } from "@/commons/types/profile";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  file: File;
}

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface AuthError {
  error: string;
}