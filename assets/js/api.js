export const API_BASE = "https://v2.api.noroff.dev";

export const PUBLIC_API_KEY = "";

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
