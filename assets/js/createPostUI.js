import { createPost } from "./api.js";
import { isLoggedIn } from "./auth.js";
import { loadPublicFeed } from "./feed.js";

export function setupCreatePostForm(feedContainer) {
	if (!isLoggedIn()) {
		return;
	}

	const createPostForm = document.querySelector("#create-post-form");
	const createPostMessage = document.querySelector("#create-post-message");

	createPostForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		createPostMessage.textContent = "";

		const formData = new FormData(createPostForm);

		const title = formData.get("title");
		const body = formData.get("body");
		const media = formData.get("media");

		try {
			await createPost(title, body, media);

			createPostForm.reset();
			createPostMessage.textContent = "Post created.";

			await loadPublicFeed(feedContainer);
		} catch (error) {
			createPostMessage.textContent = error.message;
		}
	});
}
