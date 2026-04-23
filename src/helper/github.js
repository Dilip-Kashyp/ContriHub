import { apiClient } from "./apiClient";

export async function getUserProfileHandler() {
  return await apiClient({
    url: "/github/user", // Proxied to our Next.js API
    method: "GET",
  });
}

export async function getUserReposHandler() {
  return await apiClient({
    url: "/github/user/repos?sort=updated&per_page=10",
    method: "GET",
  });
}

export async function searchRepositoriesHandler({ query, sort = "stars", order = "desc", page = 1 }) {
  const q = encodeURIComponent(query);
  return await apiClient({
    url: `/github/search/repositories?q=${q}&sort=${sort}&order=${order}&page=${page}&per_page=10`,
    method: "GET",
  });
}
