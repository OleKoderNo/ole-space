import { createPost } from "./api.js";
import { isLoggedIn, logout } from "./auth.js";
import { loadPublicFeed } from "./posts.js";

const loginLink = document.querySelector("#login-link");
const registerLink = document.querySelector("#register-link");
const profileLink = document.querySelector("#profile-link");
const logoutButton = document.querySelector("#logout-btn");
const createPostSection = document.querySelector("#create-post-section");
const createPostForm = document.querySelector("#create-post-form");
const createPostMessage = document.querySelector("#create-post-message");
const feedContainer = document.querySelector("#feed");

function updateNavigation() {
	if (isLoggedIn()) {
		loginLink.classList.add("hidden");
		registerLink.classList.add("hidden");

		profileLink.classList.remove("hidden");
		logoutButton.classList.remove("hidden");
		createPostSection.classList.remove("hidden");

		return;
	}

	loginLink.classList.remove("hidden");
	registerLink.classList.remove("hidden");

	profileLink.classList.add("hidden");
	logoutButton.classList.add("hidden");
	createPostSection.classList.add("hidden");
}

logoutButton.addEventListener("click", () => {
	logout();
	window.location.href = "index.html";
});

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

updateNavigation();
loadPublicFeed(feedContainer);
