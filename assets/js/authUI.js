import { isLoggedIn, logout } from "./auth.js";

export function updateAuthUI() {
	const loginLink = document.querySelector("#login-link");
	const registerLink = document.querySelector("#register-link");
	const profileLink = document.querySelector("#profile-link");
	const logoutButton = document.querySelector("#logout-btn");
	const createPostLink = document.querySelector("#create-post-link");

	if (isLoggedIn()) {
		if (loginLink) loginLink.classList.add("hidden");
		if (registerLink) registerLink.classList.add("hidden");

		if (profileLink) profileLink.classList.remove("hidden");
		if (logoutButton) logoutButton.classList.remove("hidden");
		if (createPostLink) createPostLink.classList.remove("hidden");

		if (logoutButton) {
			logoutButton.addEventListener("click", () => {
				logout();
				window.location.href = "index.html";
			});
		}

		return;
	}

	if (loginLink) loginLink.classList.remove("hidden");
	if (registerLink) registerLink.classList.remove("hidden");

	if (profileLink) profileLink.classList.add("hidden");
	if (logoutButton) logoutButton.classList.add("hidden");
	if (createPostLink) createPostLink.classList.add("hidden");
}
