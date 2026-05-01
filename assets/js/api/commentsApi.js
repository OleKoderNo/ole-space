import { API_BASE, getJson, getJsonAuthHeaders, requireAuth } from "./api.js";

export async function createComment(postId, body) {
	requireAuth("You must be logged in to comment.");

	const response = await fetch(`${API_BASE}/social/posts/${postId}/comment`, {
		method: "POST",
		headers: getJsonAuthHeaders(),
		body: JSON.stringify({
			body: body,
		}),
	});

	return getJson(response, "Could not create comment");
}
