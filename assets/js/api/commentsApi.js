import { API_BASE, getJson, getJsonAuthHeaders, getAuthHeaders, requireAuth } from "./api.js";

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

export async function deleteComment(postId, commentId) {
	requireAuth("You must be logged in to delete comments.");

	const response = await fetch(`${API_BASE}/social/posts/${postId}/comment/${commentId}`, {
		method: "DELETE",
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		const result = await response.json();
		throw new Error(result.errors?.[0]?.message || "Could not delete comment");
	}
}
