import { renderNavbar } from "../components/navbar.js";
import { loadPublicFeed } from "../features/feed.js";
import { setupPostSearch } from "../features/search.js";
import { isLoggedIn } from "../auth/auth.js";

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
