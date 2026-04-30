import { deletePost, getPostById, updatePost } from "./api.js";
import { getProfile } from "./auth.js";

const postContainer = document.querySelector("#post-container");

function getPostIdFromUrl() {
	const params = new URLSearchParams(window.location.search);

	return params.get("id");
}

function isOwnPost(post) {
	const profile = getProfile();

	if (!profile) {
		return false;
	}

	return profile.name === post.author.name;
}

function createPostImage(post) {
	if (!post.media || !post.media.url) {
		return null;
	}

	const imageWrapper = document.createElement("div");
	imageWrapper.className = "flex justify-center w-full";

	const image = document.createElement("img");
	image.src = post.media.url;
	image.alt = post.media.alt || post.title || "Post image";
	image.className = "max-w-md w-full max-h-72 object-cover rounded-md";

	imageWrapper.appendChild(image);

	return imageWrapper;
}

function createEditForm(post) {
	const form = document.createElement("form");
	form.className = "flex flex-col gap-4";

	form.innerHTML = `
    <label for="edit-title">Title</label>
    <input id="edit-title" name="title" required value="${post.title}" />

    <label for="edit-body">Content</label>
    <textarea id="edit-body" name="body" rows="4">${post.body || ""}</textarea>

    <label for="edit-media">Image URL optional</label>
    <input id="edit-media" name="media" type="url" value="${post.media?.url || ""}" />

    <button type="submit">Save changes</button>
  `;

	return form;
}

async function loadSinglePost() {
	const postId = getPostIdFromUrl();

	if (!postId) {
		postContainer.textContent = "No post id found.";
		return;
	}

	postContainer.textContent = "Loading post...";

	try {
		const post = await getPostById(postId);

		postContainer.innerHTML = "";

		const article = document.createElement("article");
		article.className =
			"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto";

		const message = document.createElement("p");
		message.setAttribute("aria-live", "assertive");

		const backLink = document.createElement("a");
		backLink.href = "index.html";
		backLink.textContent = "Back to feed";
		backLink.className = "text-dusty-blue";

		const authorLink = document.createElement("a");
		authorLink.href = `profile.html?name=${post.author.name}`;
		authorLink.textContent = `@${post.author.name}`;
		authorLink.className = "text-small text-dusty-blue";

		const title = document.createElement("h1");
		title.className = "text-2xl font-bold";
		title.textContent = post.title;

		article.appendChild(backLink);
		article.appendChild(authorLink);
		article.appendChild(title);

		const image = createPostImage(post);

		if (image) {
			article.appendChild(image);
		}

		if (post.body) {
			const body = document.createElement("p");
			body.textContent = post.body;

			article.appendChild(body);
		}

		if (isOwnPost(post)) {
			const actions = document.createElement("div");
			actions.className = "flex gap-4";

			const editButton = document.createElement("button");
			editButton.type = "button";
			editButton.textContent = "Edit post";

			const deleteButton = document.createElement("button");
			deleteButton.type = "button";
			deleteButton.textContent = "Delete post";

			actions.appendChild(editButton);
			actions.appendChild(deleteButton);
			article.appendChild(actions);

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

						await loadSinglePost();
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
		}

		article.appendChild(message);
		postContainer.appendChild(article);
	} catch (error) {
		postContainer.textContent = error.message;
	}
}

loadSinglePost();
