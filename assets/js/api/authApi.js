import { API_BASE, getJson } from "./api.js";

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

	return getJson(response, "Register failed");
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

	return getJson(response, "Login failed");
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

	const result = await getJson(response, "Could not create API key");

	return result.key;
}
