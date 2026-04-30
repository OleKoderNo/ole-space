import { isLoggedIn, logout } from "./auth.js";

export function updateAuthUI() {
	const loginLink = document.querySelector("#login-link");
	const registerLink = document.querySelector("#register-link");
	const profileLink = document.querySelector("#profile-link");
	const logoutButton = document.querySelector("#logout-btn");
	const createPostSection = document.querySelector("#create-post-section");

	if (isLoggedIn()) {
		loginLink.classList.add("hidden");
		registerLink.classList.add("hidden");

		profileLink.classList.remove("hidden");
		logoutButton.classList.remove("hidden");
		createPostSection.classList.remove("hidden");

		logoutButton.addEventListener("click", () => {
			logout();
			window.location.href = "index.html";
		});

		return;
	}

	loginLink.classList.remove("hidden");
	registerLink.classList.remove("hidden");

	profileLink.classList.add("hidden");
	logoutButton.classList.add("hidden");
	createPostSection.classList.add("hidden");
}
