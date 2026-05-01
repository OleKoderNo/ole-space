import { getUrlParam } from "../utils/urlParams.js";

export function getPostIdFromUrl() {
	return getUrlParam("id");
}

export function createPostImage(post) {
	if (!post.media || !post.media.url) {
		return null;
	}

	const imageWrapper = document.createElement("div");
	imageWrapper.className = "flex justify-center w-full";
	imageWrapper.style.boxSizing = "border-box";

	const image = document.createElement("img");

	image.src = post.media.url;
	image.alt = post.media.alt || post.title || "Post image";
	image.className = "w-full max-w-md max-h-72 object-cover rounded-md";
	image.style.boxSizing = "border-box";

	imageWrapper.appendChild(image);

	return imageWrapper;
}

export function createEditForm(post) {
	const form = document.createElement("form");
	form.className = "flex flex-col gap-4";
	form.style.boxSizing = "border-box";

	const mediaUrl = post.media && post.media.url ? post.media.url : "";
	const bodyText = post.body ? post.body : "";

	form.innerHTML = `
		<label for="edit-title">Title</label>
		<input id="edit-title" name="title" required value="${post.title}" />

		<label for="edit-body">Content</label>
		<textarea id="edit-body" name="body" rows="4">${bodyText}</textarea>

		<label for="edit-media">Image URL optional</label>
		<input id="edit-media" name="media" type="url" value="${mediaUrl}" />

		<button type="submit">Save changes</button>
	`;

	return form;
}
