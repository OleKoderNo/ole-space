import { isLoggedIn, logout } from "./auth.js";

function createNavLink(href, text, colorClass) {
	const link = document.createElement("a");

	link.href = href;
	link.textContent = text;

	link.className = `
		no-underline
		text-white
		px-6
		py-2
		rounded-md
		inline-block
	`;

	link.style.whiteSpace = "nowrap";
	link.style.minWidth = "fit-content";

	link.classList.add(colorClass);

	return link;
}

export function renderNavbar() {
	const navbarContainer = document.querySelector("#navbar");

	if (!navbarContainer) return;

	const header = document.createElement("header");

	header.className = "bg-white border-b p-4 flex justify-between items-center";

	const logo = document.createElement("a");

	logo.href = "index.html";
	logo.textContent = "OleSpace";

	logo.className = "no-underline text-charcoal text-2xl font-bold";

	const nav = document.createElement("nav");

	nav.style.display = "flex";
	nav.style.gap = "12px";
	nav.style.flexWrap = "nowrap";
	nav.style.alignItems = "center";

	if (isLoggedIn()) {
		const createLink = createNavLink("create.html", "Create post", "bg-dusty-blue");

		const profileLink = createNavLink("profile.html", "Profile", "bg-olive");

		const logoutButton = document.createElement("button");

		logoutButton.type = "button";
		logoutButton.textContent = "Logout";

		logoutButton.className = "text-white bg-charcoal px-6 py-2 rounded-md cursor-pointer";

		logoutButton.style.whiteSpace = "nowrap";
		logoutButton.style.minWidth = "fit-content";

		logoutButton.addEventListener("click", () => {
			logout();
			window.location.href = "index.html";
		});

		nav.appendChild(createLink);
		nav.appendChild(profileLink);
		nav.appendChild(logoutButton);
	} else {
		const loginLink = createNavLink("login.html", "Login", "bg-dusty-blue");

		const registerLink = createNavLink("register.html", "Register", "bg-olive");

		nav.appendChild(loginLink);
		nav.appendChild(registerLink);
	}

	header.appendChild(logo);
	header.appendChild(nav);

	navbarContainer.innerHTML = "";
	navbarContainer.appendChild(header);
}
