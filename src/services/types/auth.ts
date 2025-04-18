import { IUser } from "@/commons/types/profile";

export interface LoginCredentials {
  identifier: string;
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

export interface updateProfileResponse {
  message: string;
  user: IUser;
}

export interface PasswordChangeResponse {
  message: string;
}
