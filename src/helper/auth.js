import { API_CONFIG } from "@/constants";
import { apiClient } from "./apiClient";

export async function loginWithGithubHandler() {
  // Redirect to the Go backend for authentication
  window.location.href = `${API_CONFIG.BASE_URL}/auth/login`;
}

export function logoutHandler() {
  localStorage.removeItem("github_token");
  window.location.href = "/";
}
