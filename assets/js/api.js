import { getApiKey, getToken } from "./auth.js";

export const API_BASE = "https://v2.api.noroff.dev";

export const PUBLIC_API_KEY = "";

export async function getPublicPosts() {
	const headers = {};

	const token = getToken();
	const apiKey = getApiKey();

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (apiKey) {
		headers["X-Noroff-API-Key"] = apiKey;
	}

	const response = await fetch(`${API_BASE}/social/posts`, {
		headers: headers,
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.errors?.[0]?.message || "Could not fetch posts");
	}

	return result.data;
}

export async function createPost(title, body, media) {
	const token = getToken();
	const apiKey = getApiKey();

	if (!token || !apiKey) {
		throw new Error("You must be logged in to create a post.");
	}

	const postData = {
		title: title,
		body: body || "",
	};

	if (media) {
		postData.media = {
			url: media,
			alt: title,
		};
	}

	const response = await fetch(`${API_BASE}/social/posts`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"X-Noroff-API-Key": apiKey,
		},
		body: JSON.stringify(postData),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.errors?.[0]?.message || "Could not create post");
	}

	return result.data;
}

export async function registerUser(name, email, password) {
	const response = await fetch(`${API_BASE}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			email: email,
			password: password,
		}),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.errors?.[0]?.message || "Register failed");
	}

	return result.data;
}

export async function loginUser(email, password) {
	const response = await fetch(`${API_BASE}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.errors?.[0]?.message || "Login failed");
	}

	return result.data;
}

export async function createApiKey(accessToken) {
	const response = await fetch(`${API_BASE}/auth/create-api-key`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: "OleSpace",
		}),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.errors?.[0]?.message || "Could not create API key");
	}

	return result.data.key;
}
