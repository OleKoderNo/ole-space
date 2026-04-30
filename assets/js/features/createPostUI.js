import { createPost } from "../api/api.js";
import { isLoggedIn } from "../auth/auth.js";

export function setupCreatePostForm() {
	if (!isLoggedIn()) {
		window.location.href = "login.html";
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
			window.location.href = "index.html";
		} catch (error) {
			createPostMessage.textContent = error.message;
		}
	});
}
