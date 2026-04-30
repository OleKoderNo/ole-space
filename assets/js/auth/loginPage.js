import { createApiKey, loginUser } from "../api/api.js";
import { isLoggedIn, setApiKey, setProfile, setToken } from "./auth.js";

export function setupLoginPage() {
	if (isLoggedIn()) {
		window.location.href = "index.html";
		return;
	}

	const loginForm = document.querySelector("#login-form");
	const loginError = document.querySelector("#login-error");

	loginForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		loginError.textContent = "";

		const formData = new FormData(loginForm);

		const email = formData.get("email");
		const password = formData.get("password");

		try {
			const profile = await loginUser(email, password);
			const apiKey = await createApiKey(profile.accessToken);

			setToken(profile.accessToken);
			setApiKey(apiKey);
			setProfile(profile);

			window.location.href = "index.html";
		} catch (error) {
			loginError.textContent = error.message;
		}
	});
}
