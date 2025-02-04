export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  TIMEOUT: 15000,
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
