import { API_CONFIG } from "@/constants";
import { LOCAL_STORAGE_KEY } from "@/constants/common";
import { apiClient } from "./apiClient";

export async function loginWithGithubHandler() {
  // Redirect to the Go backend for authentication
  window.location.href = `${API_CONFIG.BASE_URL}/auth/login`;
}

export function logoutHandler() {
  localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  // Clear cookie as well
  document.cookie = `${LOCAL_STORAGE_KEY.ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  window.location.href = "/";
}
