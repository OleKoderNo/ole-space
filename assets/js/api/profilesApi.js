import { API_BASE, getAuthHeaders, getJson } from "./api.js";

export async function getProfileByName(name) {
	const response = await fetch(
		`${API_BASE}/social/profiles/${name}?_posts=true&_followers=true&_following=true`,
		{
			headers: getAuthHeaders(),
		},
	);

	return getJson(response, "Could not fetch profile");
}

export async function followProfile(name) {
	const response = await fetch(`${API_BASE}/social/profiles/${name}/follow`, {
		method: "PUT",
		headers: getAuthHeaders(),
	});

	return getJson(response, "Could not follow profile");
}

export async function unfollowProfile(name) {
	const response = await fetch(`${API_BASE}/social/profiles/${name}/unfollow`, {
		method: "PUT",
		headers: getAuthHeaders(),
	});

	return getJson(response, "Could not unfollow profile");
}
