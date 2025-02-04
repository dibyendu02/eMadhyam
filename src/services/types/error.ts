// src/services/types/error.ts

export interface ApiErrorResponse {
  error: string;
  statusCode?: number;
}

export type ApiError = ApiErrorResponse; // This is what we'll use in the type parameter for isAxiosError
