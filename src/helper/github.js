import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "@/constants";

export async function getUserProfileHandler() {
  return await apiClient({
    url: API_ENDPOINTS.GITHUB.USER_PROFILE,
    method: "GET",
  });
}

export async function getUserReposHandler() {
  return await apiClient({
    url: `${API_ENDPOINTS.GITHUB.USER_REPOS}?sort=updated&per_page=10`,
    method: "GET",
  });
}

export async function searchRepositoriesHandler({ query, sort = "stars", order = "desc", page = 1 }) {
  const q = encodeURIComponent(query);
  return await apiClient({
    url: `${API_ENDPOINTS.GITHUB.SEARCH_REPOS}?q=${q}&sort=${sort}&order=${order}&page=${page}&per_page=10`,
    method: "GET",
  });
}
