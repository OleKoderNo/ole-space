import { isLoggedIn, logout } from "../auth/auth.js";

function createNavLink(href, text, colorClass) {
	const link = document.createElement("a");

	link.href = href;
	link.textContent = text;

	link.className = `no-underline text-white px-6 py-2 rounded-md inline-block ${colorClass}`;

	link.style.whiteSpace = "nowrap";

	return link;
}

export function renderNavbar() {
	const navbarContainer = document.querySelector("#navbar");
	if (!navbarContainer) return;

	const header = document.createElement("header");

	header.className = "bg-white border-b p-4 flex justify-between items-center relative";

	const logo = document.createElement("a");

	logo.href = "index.html";
	logo.textContent = "OleSpace";
	logo.className = "no-underline text-charcoal text-2xl font-bold";

	const menuToggle = document.createElement("span");

	menuToggle.textContent = "≡";
	menuToggle.style.fontSize = "1.75rem";
	menuToggle.style.cursor = "pointer";
	menuToggle.style.userSelect = "none";
	menuToggle.style.display = "none";

	const nav = document.createElement("nav");

	nav.style.display = "flex";
	nav.style.gap = "1rem";
	nav.style.alignItems = "center";

	let logoutButton = null;

	if (isLoggedIn()) {
		const createLink = createNavLink("create.html", "Create post", "bg-dusty-blue");

		const profileLink = createNavLink("profile.html", "Profile", "bg-olive");

		logoutButton = document.createElement("button");

		logoutButton.type = "button";
		logoutButton.textContent = "Logout";
		logoutButton.className = "text-white bg-charcoal px-6 py-2 rounded-md cursor-pointer";
		logoutButton.style.whiteSpace = "nowrap";

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

	function applyResponsiveNavbar() {
		const isMobile = window.innerWidth < 768;

		if (isMobile) {
			menuToggle.style.display = "block";

			nav.style.position = "absolute";
			nav.style.top = "100%";
			nav.style.left = "0";
			nav.style.right = "0";
			nav.style.background = "#ffffff";
			nav.style.borderBottom = "1px solid #bfc5c9";
			nav.style.padding = "1rem";
			nav.style.flexDirection = "column";
			nav.style.display = menuOpen ? "flex" : "none";

			if (logoutButton) {
				logoutButton.style.width = "fit-content";
				logoutButton.style.alignSelf = "center";
			}
		} else {
			menuToggle.style.display = "none";

			nav.style.position = "";
			nav.style.top = "";
			nav.style.left = "";
			nav.style.right = "";
			nav.style.background = "";
			nav.style.borderBottom = "";
			nav.style.padding = "";
			nav.style.display = "flex";
			nav.style.flexDirection = "row";

			if (logoutButton) {
				logoutButton.style.width = "";
				logoutButton.style.alignSelf = "";
			}
		}
	}

	let menuOpen = false;

	menuToggle.addEventListener("click", () => {
		menuOpen = !menuOpen;

		menuToggle.textContent = menuOpen ? "×" : "≡";

		applyResponsiveNavbar();
	});

	window.addEventListener("resize", applyResponsiveNavbar);

	header.appendChild(logo);
	header.appendChild(menuToggle);
	header.appendChild(nav);

	navbarContainer.innerHTML = "";
	navbarContainer.appendChild(header);

	applyResponsiveNavbar();
}
