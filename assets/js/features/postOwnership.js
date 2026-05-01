import { deletePost, updatePost } from "../api/api.js";
import { getProfile } from "../auth/auth.js";
import { createEditForm } from "./postHelpers.js";

export function isOwnPost(post) {
	const profile = getProfile();

	if (!profile) {
		return false;
	}

	return profile.name === post.author.name;
}

export function createOwnerActions(post, article, backLink, message, reloadPost) {
	if (!isOwnPost(post)) {
		return null;
	}

	const actions = document.createElement("div");
	actions.className = "flex gap-4";

	const editButton = document.createElement("button");
	editButton.type = "button";
	editButton.textContent = "Edit post";

	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.textContent = "Delete post";
	deleteButton.className = "text-white bg-alert px-6 py-2 rounded-md cursor-pointer";

	actions.appendChild(editButton);
	actions.appendChild(deleteButton);

	editButton.addEventListener("click", () => {
		article.innerHTML = "";

		const editForm = createEditForm(post);

		article.appendChild(backLink);
		article.appendChild(editForm);
		article.appendChild(message);

		editForm.addEventListener("submit", async (event) => {
			event.preventDefault();

			message.textContent = "";

			const formData = new FormData(editForm);

			const newTitle = formData.get("title");
			const newBody = formData.get("body");
			const newMedia = formData.get("media");

			try {
				await updatePost(post.id, newTitle, newBody, newMedia);

				await reloadPost();
			} catch (error) {
				message.textContent = error.message;
			}
		});
	});

	deleteButton.addEventListener("click", async () => {
		const confirmed = confirm("Are you sure you want to delete this post?");

		if (!confirmed) {
			return;
		}

		try {
			await deletePost(post.id);

			window.location.href = "index.html";
		} catch (error) {
			message.textContent = error.message;
		}
	});

	return actions;
}
