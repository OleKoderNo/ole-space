const TOKEN_KEY = "accessToken";
const API_KEY_KEY = "apiKey";
const PROFILE_KEY = "profile";

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

export function getApiKey() {
	return localStorage.getItem(API_KEY_KEY);
}

export function setApiKey(apiKey) {
	localStorage.setItem(API_KEY_KEY, apiKey);
}

export function getProfile() {
	const profile = localStorage.getItem(PROFILE_KEY);

	if (!profile) {
		return null;
	}

	return JSON.parse(profile);
}

export function setProfile(profile) {
	localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function isLoggedIn() {
	return Boolean(getToken());
}

export function logout() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(API_KEY_KEY);
	localStorage.removeItem(PROFILE_KEY);
}
