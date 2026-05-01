import { getApiKey, getToken } from "../auth/auth.js";

export const API_BASE = "https://v2.api.noroff.dev";

export function getAuthHeaders() {
	const headers = {};

	const token = getToken();
	const apiKey = getApiKey();

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (apiKey) {
		headers["X-Noroff-API-Key"] = apiKey;
	}

	return headers;
}

export function getJsonAuthHeaders() {
	const headers = getAuthHeaders();

	headers["Content-Type"] = "application/json";

	return headers;
}

export async function getJson(response, fallbackMessage) {
	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.errors?.[0]?.message || fallbackMessage);
	}

	return result.data;
}

export function requireAuth(message) {
	const token = getToken();
	const apiKey = getApiKey();

	if (!token || !apiKey) {
		throw new Error(message);
	}
}

export { registerUser, loginUser, createApiKey } from "./authApi.js";

export { getPublicPosts, getPostById, createPost, updatePost, deletePost } from "./postsApi.js";

export { getProfileByName, followProfile, unfollowProfile } from "./profilesApi.js";

export { createComment } from "./commentsApi.js";
