import { registerUser } from "./api.js";
import { isLoggedIn } from "./auth.js";

export function setupRegisterPage() {
	if (isLoggedIn()) {
		window.location.href = "index.html";
		return;
	}

	const registerForm = document.querySelector("#register-form");
	const registerError = document.querySelector("#register-error");

	registerForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		registerError.textContent = "";

		const formData = new FormData(registerForm);

		const name = formData.get("name");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirm-password");

		if (password !== confirmPassword) {
			registerError.textContent = "Passwords do not match.";
			return;
		}

		try {
			await registerUser(name, email, password);

			window.location.href = "login.html";
		} catch (error) {
			registerError.textContent = error.message;
		}
	});
}
