import { API_BASE, getAuthHeaders, getJson, getJsonAuthHeaders, requireAuth } from "./api.js";

export async function getPublicPosts() {
	const response = await fetch(`${API_BASE}/social/posts?_author=true`, {
		headers: getAuthHeaders(),
	});

	return getJson(response, "Could not fetch posts");
}

export async function getPostById(id) {
	const response = await fetch(`${API_BASE}/social/posts/${id}?_author=true&_comments=true`, {
		headers: getAuthHeaders(),
	});

	return getJson(response, "Could not fetch post");
}

export async function createPost(title, body, media) {
	requireAuth("You must be logged in to create a post.");

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
		headers: getJsonAuthHeaders(),
		body: JSON.stringify(postData),
	});

	return getJson(response, "Could not create post");
}

export async function updatePost(id, title, body, media) {
	requireAuth("You must be logged in to edit a post.");

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

	const response = await fetch(`${API_BASE}/social/posts/${id}`, {
		method: "PUT",
		headers: getJsonAuthHeaders(),
		body: JSON.stringify(postData),
	});

	return getJson(response, "Could not update post");
}

export async function deletePost(id) {
	requireAuth("You must be logged in to delete a post.");

	const response = await fetch(`${API_BASE}/social/posts/${id}`, {
		method: "DELETE",
		headers: getAuthHeaders(),
	});

	if (!response.ok) {
		const result = await response.json();
		throw new Error(result.errors?.[0]?.message || "Could not delete post");
	}
}
