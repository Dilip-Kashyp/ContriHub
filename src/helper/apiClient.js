import { API_CONFIG } from "@/constants";
import { LOCAL_STORAGE_KEY } from "@/constants/common";

export async function apiClient({
  url,
  method = "GET",
  body = null,
  headers = {},
}) {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) : null;
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const { BASE_URL } = API_CONFIG;
    const isAbsoluteUrl = url.startsWith("http://") || url.startsWith("https://");
    const fetchUrl = isAbsoluteUrl ? url : `${BASE_URL}${url}`;

    const response = await fetch(fetchUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      throw new Error(data?.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Client Error:", error.message);
    throw error;
  }
}
