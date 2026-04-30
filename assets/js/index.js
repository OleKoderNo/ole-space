import { renderNavbar } from "./navbar.js";
import { loadPublicFeed } from "./feed.js";
import { setupPostSearch } from "./search.js";
import { isLoggedIn } from "./auth.js";

const feedContainer = document.querySelector("#feed");
const searchSection = document.querySelector("#search-section");

renderNavbar();
loadPublicFeed(feedContainer);

if (isLoggedIn()) {
	setupPostSearch(feedContainer);
} else {
	if (searchSection) {
		searchSection.remove();
	}
}
