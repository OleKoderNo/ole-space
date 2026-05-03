import { API_BASE, getAuthHeaders, getJson } from "./api.js";

/**
 * Get profile username, post, follower and following count
 *
 * @param {*} name profile username
 * @returns {Promise<object>} profile data
 */
export async function getProfileByName(name) {
	const response = await fetch(
		`${API_BASE}/social/profiles/${name}?_posts=true&_followers=true&_following=true`,
		{
			headers: getAuthHeaders(),
		},
	);

	return getJson(response, "Could not fetch profile");
}

/**
 * Follows another user
 *
 * @param {*} name username of profile to follow
 * @returns {Promise<object>} updated profile data
 */
export async function followProfile(name) {
	const response = await fetch(`${API_BASE}/social/profiles/${name}/follow`, {
		method: "PUT",
		headers: getAuthHeaders(),
	});

	return getJson(response, "Could not follow profile");
}

/**
 * Unfollow another users profile
 *
 * @param {*} name username of profile to unfollow
 * @returns {Promise<object>} update profile data
 */
export async function unfollowProfile(name) {
	const response = await fetch(`${API_BASE}/social/profiles/${name}/unfollow`, {
		method: "PUT",
		headers: getAuthHeaders(),
	});

	return getJson(response, "Could not unfollow profile");
}
